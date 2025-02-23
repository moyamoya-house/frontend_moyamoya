import React, { useEffect, useState } from "react";
import { Box, Link, Text, Image, Card, CardHeader, CardBody, CardFooter } from "@yamada-ui/react";
import LikeButton from "../../nice/nice.tsx";
import Bookmark from "../../bookmark/bookmark.tsx";
import "./css/user_post.css";
import { Moyamoya } from "../../post_all/Postall";
import { User } from "./user_post";

const BookmarkPost = () => {
  const [bookmarkData, setBookmark] = useState<Moyamoya[]>([]);
  const [userData, setUserData] = useState<Record<number, User>>({});

  useEffect(() => {
    const fetchBookmark = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:5000/moyamoya_bookmark", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBookmark(data);
      }
    };
    fetchBookmark();
  }, []);

  useEffect(() => {
    const fetchBookmarkUser = async () => {
      try {
        const userIds = [
          ...new Set(bookmarkData.map((bookmark) => bookmark.user_id)),
        ];
        const userDataPromises = userIds.map((id) =>
          fetch(`http://127.0.0.1:5000/users/${id}`).then((response) =>
            response.json()
          )
        );
        const users = await Promise.all(userDataPromises);
        const usermap: Record<number, User> = {};
        users.forEach((user) => {
          usermap[user.id] = user;
        });
        setUserData(usermap);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    if (bookmarkData.length > 0) {
      fetchBookmarkUser();
    }
  }, [bookmarkData,userData]);

  return (
    <Box className="user_post_all">
      <Box>
        <Box className="user_post">
          {bookmarkData.length > 0 ? (
            bookmarkData.map((post) => (
              <Card className="user_postlist" key={post.id}>
                <Box>
                  <CardHeader w="100%" m="10px 0 0 10px" display={"flex"} justifyContent={"space-between"}>
                    <Link href={`/user_prof/${post.user_id}`} display={"flex"} textDecoration={"none"} color={"black"}>
                      <Image
                        w={50}
                        h={50}
                        borderRadius={100}
                        src={
                          userData[post.user_id]?.prof_image
                            ? `http://127.0.0.1:5000/prof_image/${userData[post.user_id]?.prof_image}`
                            : "/not_profileicon.jpg"
                        }
                        alt="プロフィール画像"
                      />
                      <Text mt={10} marginLeft={10}>{userData[post.user_id]?.name}</Text>
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
export default BookmarkPost;
