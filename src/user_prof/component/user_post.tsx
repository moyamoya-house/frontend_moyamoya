import React, { useEffect, useState } from "react";
import { Box, Image, Text, Link, Card, CardBody, CardFooter, CardHeader } from "@yamada-ui/react";
import LikeButton from "../../nice/nice.tsx";
import Bookmark from "../../bookmark/bookmark.tsx";
import "./css/user_post.css";
import { Moyamoya } from "../../post_all/Postall";
import { User } from "../../prof_edit/ProfEditPage";

const UserMoyamoya = ({ userId }) => {
  const [moyamoyaData, setMoyamoya] = useState<Moyamoya[]>([]);
  const [userData, setUseData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoyaMoya = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/user_post/${userId}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMoyamoya(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch posts");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };
    fetchMoyaMoya();
  }, [userId]);

  useEffect(() => {
    const fectchUserProf = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/users/${userId}`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setUseData(data);
          setLoading(false);
        } else {
          console.error("Faild to user data");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error to failed user data:", error);
        setLoading(false);
      }
    };
    fectchUserProf();
  }, [userId]);

  if (loading) {
    return <p>Loading</p>;
  }

  if (!userData) {
    return <p>ユーザーデータがないです</p>;
  }

  return (
    <Box className="user_post_all">
      <Box>
        <Box className="user_post">
          {moyamoyaData.length > 0 ? (
            moyamoyaData.map((post) => (
              <Card className="user_postlist" key={post.id}>
                <Box>
                  <CardHeader w="100%" m="5px 0 0 10px" display={"flex"} justifyContent={"space-between"}>
                    <Link href={`/user_prof/${post.user_id}`} display={"flex"} textDecoration={"none"} color={"black"}>
                      <Image
                        w={50}
                        h={50}
                        borderRadius={100}
                        src={
                          userData.prof_image
                            ? `http://127.0.0.1:5000/prof_image/${userData.prof_image}`
                            : "/not_profileicon.jpg"
                        }
                        alt="プロフィール画像"
                      />
                      <Text mt={10} marginLeft={10}>{userData.name}</Text>
                    </Link>
                    <Text className="user_post_date">{post.created_at.split("-").join("/")}</Text>
                  </CardHeader>
                  <CardBody>
                    <Link href={`/post_detail/${post.id}`} textDecoration="none" color={"black"} display={"inline-block"} mt={30}>
                      <Text>{post.post}</Text>
                    </Link>
                  </CardBody>
                  <CardFooter>
                    <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
                      <LikeButton postId={post.id} />
                      <Text ml={2}>{post.count}</Text>
                      <Bookmark postId={post.id} />
                    </Box>
                  </CardFooter>
                </Box>
              </Card>
            ))
          ) : (
            <Text>投稿がありません。</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default UserMoyamoya;
