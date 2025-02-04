import React, { useEffect, useState } from "react";
import { Box, Link, Text, Image } from "@yamada-ui/react";
import LikeButton from "../../nice/nice.tsx";
import Bookmark from "../../bookmark/bookmark.tsx";
import "./css/user_post.css";
import { Moyamoya } from "../../post_all/Postall";

export interface User {
  user_id: number;
  name: string;
  prof_image: string;
  second_image: string;
  prof_comment: string;
  password: string;
  email: string;
}

const UserPost = () => {
  const [postData, setPostData] = useState<Moyamoya[]>([]);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchMoyamoyaData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:5000/moyamoya_user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPostData(data);
      }
    };
    fetchMoyamoyaData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:5000/mypage", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Box w={1500} maxWidth="80%" m={"10px 0 30px 50px"}>
      {postData.length > 0 ? (
        <ul className="post">
          {postData.map((post) => (
            <li className="postlist" key={post.id}>
              <Box>
                <Box m="20px 0 0 20px" display={"flex"}>
                  <Link
                    href={`/user_prof/${post.user_id}`}
                    display={"flex"}
                    textDecoration={"none"}
                    color={"black"}
                  >
                    <Image
                      w={50}
                      h={50}
                      borderRadius={100}
                      src={
                        userData && userData.prof_image
                          ? `http://127.0.0.1:5000/prof_image/${userData.prof_image}`
                          : "not_profileicon.jpg"
                      }
                      alt="prof image"
                    />
                    <Text mt={10} marginLeft={10}>
                      {userData && userData.name}
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
                >
                    <Text>{post.post}</Text>
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

export default UserPost;
