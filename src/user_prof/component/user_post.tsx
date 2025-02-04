import React, { useEffect, useState } from "react";
import { Box, Image, Text, Link, Center } from "@yamada-ui/react";
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
    <Box w={1500} maxWidth="80%" m={"10px 0 30px 50px"}>
      {moyamoyaData.length > 0 ? (
        <ul className="post">
          {moyamoyaData.map((post) => (
            <li className="postlist" key={post.id}>
              <Box>
                <Box m="20px 0 0 20px" display={"flex"}>
                  <Link
                    href={`/user_prof/${post.user_id}`}
                    display={"flex"}
                    textDecoration={"none"}
                    color={"black"}
                  >
                    {userData.prof_image ? (
                      <Image
                        w={50}
                        h={50}
                        borderRadius={100}
                        src={`http://127.0.0.1:5000/prof_image/${userData.prof_image}`}
                        alt="prof_image"
                      ></Image>
                    ) : (
                      <Image
                        w={50}
                        h={50}
                        borderRadius={100}
                        src="/not_profileicon.jpg"
                        alt="prof_image"
                      ></Image>
                    )}
                    <Text mt={10} marginLeft={10}>
                      {userData.name}
                    </Text>
                  </Link>
                </Box>
                <Text mt={-50} ml={620}>
                  {post.created_at}
                </Text>
                <Link
                  href={`/post_detail/${post.id}`}
                  textDecoration="none"
                  color={"black"}
                  display={"inline-block"}
                  mt={30}
                  ml={350}
                >
                  <Center>
                    <Text>{post.post}</Text>
                  </Center>
                </Link>
                <Box display={"flex"} ml={700}>
                  <LikeButton postId={post.id}></LikeButton>
                  <Text>{post.count}</Text>
                  <Bookmark postId={post.id}></Bookmark>
                </Box>
              </Box>
            </li>
          ))}
        </ul>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};
export default UserMoyamoya;
