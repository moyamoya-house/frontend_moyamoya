import React, { useEffect, useState } from "react";
import { Box, Link, Text, Image, Card, CardHeader, CardBody, CardFooter } from "@yamada-ui/react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        // 投稿データを取得
        const postResponse = await fetch("http://127.0.0.1:5000/moyamoya_user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!postResponse.ok) throw new Error("Failed to fetch post data");
        const postData = await postResponse.json();
        setPostData(postData);

        // ユーザーデータを取得
        const userResponse = await fetch("http://127.0.0.1:5000/mypage", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();
        setUserData(userData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>データを読み込んでいます...</Text>;
  }

  if (!userData) {
    return <Text>ユーザー情報を取得できませんでした。</Text>;
  }

  return (
    <Box className="user_post_all">
      <Box>
        <Box className="user_post">
          {postData.length > 0 ? (
            postData.map((post) => (
              <Card className="user_postlist" key={post.id}>
                <Box>
                  <CardHeader w="100%" m="10px 0 0 10px" display={"flex"} justifyContent={"space-between"}>
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
                    <Text mt={10} marginRight={10}>{post.created_at.split("-").join("/")}</Text>
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

export default UserPost;
