"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Link,
  Image,
  CardHeader,
  CardBody,
  Text,
} from "@yamada-ui/react";
import "../audio/css/audio_all.css";

interface Audio {
  id: number;
  audio: number;
  stress_level: number;
  emotion_score: number;
  classification: string;
  user_id: number;
  created_at: string;
}

const AudioAll = () => {
  const [audioData, setAudioData] = useState<Audio[]>([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  // potsデータ取得
  useEffect(() => {
    const fetchAudioData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/pots", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setAudioData(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch pots");
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch pots:", error);
        setLoading(false);
      }
    };
    fetchAudioData();
  }, []);

  // potsに対するユーザー情報の取得
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const userIds = [...new Set(audioData.map((audio) => audio.user_id))];
        const userDataPromises = userIds.map((id) =>
          fetch(`http://127.0.0.1:5000/users/${id}`).then((response) =>
            response.json()
          )
        );
        const users = await Promise.all(userDataPromises);
        const userMap = {};
        users.forEach((user) => {
          userMap[user.id] = user;
        });
        setUserData(userMap);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    if (audioData.length > 0) {
      fetchUsersData();
    }
  }, [audioData]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Box>
      <h1>PotCom一覧</h1>
      <Box className="audio_all">
        {audioData.map((audio) => (
          <Card key={audio.id} className="audio-card">
            {userData[audio.user_id] ? (
              <Box>
                <CardHeader
                  w="100%"
                  m="5px 0 0 10px"
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Link
                    href={`/user_prof/${audio.user_id}`}
                    className="card-header-link"
                  >
                    <Image
                      className="card-header-img"
                      src={
                        userData[audio.user_id].prof_image
                          ? `http://127.0.0.1:5000/prof_image/${
                              userData[audio.user_id].prof_image
                            }`
                          : "not_profileicon.jpg"
                      }
                    />
                    <Text className="card-header-username">
                      {userData[audio.user_id].name}
                    </Text>
                  </Link>
                  <Text className="card-header-date">
                    {audio.created_at.split("-").join("/")}
                  </Text>
                </CardHeader>
                <CardBody>
                  <Link
                    href={`/audio_details/${audio.id}`}
                    className="card-body-link"
                  >
                    <Box className="card-body-box">
                      <audio
                        controls={!!audio.audio}
                        src={`http://127.0.0.1:5000/audiofile/${audio.user_id}/${audio.audio}`}
                        className="card-body-audio"
                      ></audio>
                    </Box>
                  </Link>
                </CardBody>
              </Box>
            ) : (
              <p>Loading</p>
            )}
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AudioAll;
