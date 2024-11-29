import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Link,
  Image,
  Text,
} from "@yamada-ui/react";
import { fetchAudioId } from "../hooks/useAudioId.ts";

interface Audio {
  id: number;
  audio: string;
  stress_level: number;
  emotion_score: number;
  classification: string;
  pots_user_id: number;
  created_at: string;
}

interface User {
  user_id: number;
  user_name: string;
  prof_image: string;
}

const AudioDetails = () => {
  const { id } = useParams();
  const [audio, setAudio] = useState<Audio | null>(null);
  const [userId, setUserId] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        if (id) {
          const numericId = parseInt(id, 10); // 文字列から数値に変換
          const data = await fetchAudioId(numericId); // 型エラーが解消される
          setAudio(data);
        } else {
          console.error("Invalid id");
        }
      } catch (error) {
        console.error("Error fetching audio:", error);
      }
    };

    fetchAudio();
  }, [id]);

  console.log(audio);

  useEffect(() => {
    if (audio?.pots_user_id) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:5000/users/${audio.pots_user_id}`,
            {
              method: "GET",
            }
          );
          if (response.ok) {
            const data = await response.json();
            setUserId(data);
            setLoading(false);
          } else {
            console.error("Error fetching user data");
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [audio]);

  console.log(userId);
  

  if (loading) {
    return <p style={{marginTop: "200px"}}>loading</p>;
  }

  return (
    <>
      <Box mt={200}>
        <Card>
          <CardHeader>
            <Link>
              <Image
                src={`http://127.0.0.1:5000/prof_image/${userId?.prof_image}`}
              />
              <Text>{userId?.user_name}</Text>
            </Link>
            <Text>{audio?.created_at}</Text>
          </CardHeader>
          <CardBody>
            <Box>
              <audio
                controls
                src={`http://127.0.0.1:5000/audiofile/${audio?.pots_user_id}/${audio?.audio}`}
                style={{ margin: "10px 0 0 200px" }}
              ></audio>
              <Text>{audio?.classification}</Text>
              <Text>{audio?.stress_level}</Text>
              <Text>{audio?.emotion_score}</Text>
            </Box>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default AudioDetails;
