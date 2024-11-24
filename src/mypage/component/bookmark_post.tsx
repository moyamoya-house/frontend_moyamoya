import React,{ useEffect, useState } from "react";
import { Box, Link, Text, Image, Center } from "@yamada-ui/react";
import LikeButton from "../../nice/nice";
import Bookmark from "../../bookmark/bookmark";
import './css/user_post.css';
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
        const userIds = [...new Set(bookmarkData.map((bookmark) => bookmark.user_id))];
        const userDataPromises = userIds.map((id) =>
          fetch(`http://127.0.0.1:5000/users/${id}`).then((response) => response.json())
        );
        const users = await Promise.all(userDataPromises);
        const usermap: Record<number, User> = {};
        users.forEach((user) => {
          usermap[user.user_id] = user;
        });
        setUserData(usermap);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    if (bookmarkData.length > 0) {
      fetchBookmarkUser();
    }
  }, [bookmarkData]);

  return (
    <Box w={1500} maxWidth='80%' margin='0 auto'>
      {bookmarkData.length > 0 ? (
        <ul className="post">
          {bookmarkData.map((post) => (
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
                        userData[post.user_id]?.prof_image
                          ? `http://127.0.0.1:5000/prof_image/${userData[post.user_id]?.prof_image}`
                          : "not_profileicon.jpg"
                      }
                      alt="prof image"
                    />
                    <Text mt={10} marginLeft={10}>
                      {userData[post.user_id]?.name}
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
export default BookmarkPost;
