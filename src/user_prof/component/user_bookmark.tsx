import React, { useEffect, useState } from "react";
import { Box, Text, Link, Image, Card, CardBody, CardFooter, CardHeader } from "@yamada-ui/react";
import LikeButton from "../../nice/nice.tsx";
import Bookmark from "../../bookmark/bookmark.tsx";
import "./css/user_bookmark.css";
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

const UserBookmark = ({ userId }: { userId: number }) => {
  const [bookmark, setBookmark] = useState<Moyamoya[]>([]);
  const [userData, setUseData] = useState<{ [key: number]: User }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/user_bookmark/${userId}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBookmark(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch posts");
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setLoading(false);
      }
    };
    fetchBookmark();
  }, [userId]);

  useEffect(() => {
    const fetchBookmarkUser = async () => {
      try {
        const userIds = [
          ...new Set(bookmark.map((bookmark) => bookmark.user_id)),
        ];
        const userDataPromises = userIds.map((id) =>
          fetch(`http://127.0.0.1:5000/users/${id}`).then((response) =>
            response.json()
          )
        );
        const users = await Promise.all(userDataPromises);
        const usermap: { [key: number]: User } = {};
        users.forEach((user: User) => {
          usermap[user.user_id] = user;
        });
        setUseData(usermap);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    if (bookmark.length > 0) {
      fetchBookmarkUser();
    }
  }, [bookmark]);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <Box className="user_book_all">
      <Box>
        <Box className="user_bookpost">
          {bookmark.length > 0 ? (
            bookmark.map((post) => (
              <Card className="user_bookpostlist" key={post.id}>
                <Box>
                  <CardHeader w="100%" m="5px 0 0 10px" display={"flex"} justifyContent={"space-between"}>
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
                    <Text className="user_bookpost_date">{post.created_at.split("-").join("/")}</Text>
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
            <Box></Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserBookmark;
