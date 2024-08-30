import { useEffect, useState } from "react";
import { Box, Link, Text, Center, Image } from "@yamada-ui/react";
import LikeButton from "../../nice/nice";
import Bookmark from "../../bookmark/bookmark";
import "./css/user_post.css";

const UserPost = () => {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState({});

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
    <Box w={1500} maxWidth='80%' margin='0 auto'>
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
                        userData.prof_image
                          ? `http://127.0.0.1:5000/prof_image/${userData.prof_image}`
                          : "not_profileicon.jpg"
                      }
                      alt="prof image"
                    />
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

export default UserPost;
