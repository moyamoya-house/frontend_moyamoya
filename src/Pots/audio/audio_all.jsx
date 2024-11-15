"use client";
import { useEffect, useState } from "react";
import { Box, Card, Link, Image, CardHeader, CardBody,  Text } from "@yamada-ui/react";

const AudioAll = () => {
  const [audioData, setAudioData] = useState([]);
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
    <>
      <h1>PotCom一覧</h1>
      <Box>
        {audioData.map((audio) => (
            <Card key={audio.id}>
                {userData[audio.user_id] ? (
                    <Box>
                        <CardHeader>
                            <Link
                                href={`/user_prof/${audio.user_id}`}
                                display={"flex"}
                                textDecoration={"none"}
                                color={"black"}
                            >
                                <Image
                                  w={50}
                                  h={50}
                                  borderRadius={100}
                                    src={
                                        userData[audio.user_id].prof_image
                                        ? `http://127.0.0.1:5000/prof_image/${userData[audio.user_id].prof_image}`
                                    : "not_profileicon.jpg"}
                                />
                                <Text>
                                    {userData[audio.user_id].name}
                                </Text>
                            </Link>
                            <Text>{audio.created_at.split("-").join("/")}</Text>
                        </CardHeader>
                        <CardBody>
                            <audio controls src={`http://127.0.0.1:5000/audiofile/${audio.user_id}/${audio.audio}`} disabled={!audio.audio}></audio>
                            <h3>分析結果</h3>
                            <Box>
                                <p>音声テキスト: {audio.classification}</p>
                            </Box>
                            <Box>
                                <p>感情: {audio.stress_level}</p>
                            </Box>
                            <Box>
                                <p>精度: {audio.emotion_score}</p>
                            </Box>
                        </CardBody>
                    </Box>
                ): (
                    <p>Loading</p>
                )}
            </Card>
        ))}
      </Box>
    </>
  );
};

export default AudioAll;
