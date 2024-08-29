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

  // 時間のフォーマット設定
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <Box>
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
                  {formatDate(post.created_at)}
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
