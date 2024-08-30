'use client';
import { useEffect, useState } from "react";
import { Box, Link, Text, Image, Center, Tabs, TabPanels, Tab, TabPanel, VStack } from "@yamada-ui/react";
import Post from "../post/post";
import Sidebar from "./component/sidebar";
import LikeButton from "../nice/nice";
import Bookmark from "../bookmark/bookmark";
import "./css/post_all.css";

const PostAll = () => {
  const [postData, setPostData] = useState([]);
  const [followPost, setFollowPost] = useState([]);
  const [userData, setUserData] = useState({});
  const [followUserData, setFollowUserData] = useState({});
  const [loading, setLoading] = useState(true);

  // 全体の投稿を取得
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/moyamoya", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setPostData(data);
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
    fetchPostData();
  }, []);

  // 投稿に対するユーザー情報を取得
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const userIds = [...new Set(postData.map((post) => post.user_id))];
        const userDataPromises = userIds.map((id) =>
          fetch(`http://127.0.0.1:5000/users/${id}`).then((response) =>
            response.json()
          )
        );
        const users = await Promise.all(userDataPromises);
        const userMap = {};
        users.forEach((user) => {
          userMap[user.id] = user;
        });
        setUserData(userMap);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    if (postData.length > 0) {
      fetchUsersData();
    }
  }, [postData]);

  // フォロー中のユーザーの投稿を取得
  useEffect(() => {
    const fetchFollowPost = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://127.0.0.1:5000/moyamoya_follow', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFollowPost(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch follow posts");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching follow posts:", error);
        setLoading(false);
      }
    };
    fetchFollowPost();
  }, []);

  // フォロー中のユーザー情報を取得
  useEffect(() => {
    const fetchUsersFollowData = async () => {
      try {
        const userIds = [...new Set(followPost.map((post) => post.user_id))];
        const userDataPromises = userIds.map((id) =>
          fetch(`http://127.0.0.1:5000/users/${id}`).then((response) =>
            response.json()
          )
        );
        const users = await Promise.all(userDataPromises);
        const userMap = {};
        users.forEach((user) => {
          userMap[user.id] = user;
        });
        setFollowUserData(userMap);
      } catch (error) {
        console.error("Error fetching follow users:", error);
      }
    };
    if (followPost.length > 0) {
      fetchUsersFollowData();
    }
  }, [followPost]);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="postalltitle">モヤモヤ投稿一覧</h1>
      <VStack>
      <Tabs variant="line">
          <Tab
          width={300}
          margin='0 auto 0 auto'
          >
            全体
          </Tab>
          <Tab
          w={300}
          m={'0 auto 0 -110px'}
          >
            フォロー中
          </Tab>

        <TabPanels>
          <TabPanel>
            <Box className="post_all">
              <Box>
                <ul className="post">
                  {postData.map((post) => (
                    <li className="postlist" key={post.id}>
                      {userData[post.user_id] ? (
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
                                  userData[post.user_id].prof_image
                                    ? `http://127.0.0.1:5000/prof_image/${userData[post.user_id].prof_image}`
                                    : "not_profileicon.jpg"
                                }
                                alt="prof image"
                              />
                              <Text mt={10} marginLeft={10}>
                                {userData[post.user_id].name}
                              </Text>
                            </Link>
                          </Box>
                          <Text mt={-50} ml={620}>
                            {post.created_at.split("-").join("/")}
                          </Text>
                          <Link
                            href={`/post_detail/${post.id}`}
                            textDecoration="none"
                            color={"black"}
                            display={"inline-block"}
                            mt={30}
                            ml={350}
                          >
                            <Center><Text>{post.post}</Text></Center>
                          </Link>
                          <Box display={"flex"} ml={700}>
                            <LikeButton postId={post.id}></LikeButton>
                            <Bookmark postId={post.id}></Bookmark>
                          </Box>
                        </Box>
                      ) : (
                        <p>Loading user data...</p>
                      )}
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel>
            <Box className="post_all">
              <Box>
                <ul className="post">
                  {followPost.map((post) => (
                    <li className="postlist" key={post.id}>
                      {followUserData[post.user_id] ? (
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
                                  followUserData[post.user_id].prof_image
                                    ? `http://127.0.0.1:5000/prof_image/${followUserData[post.user_id].prof_image}`
                                    : "not_profileicon.jpg"
                                }
                                alt="prof image"
                              />
                              <Text mt={10} marginLeft={10}>
                                {followUserData[post.user_id].name}
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
                            <Center><Text>{post.post}</Text></Center>
                          </Link>
                          <Box display={"flex"} ml={700}>
                            <LikeButton postId={post.id}></LikeButton>
                            <Bookmark postId={post.id}></Bookmark>
                          </Box>
                        </Box>
                      ) : (
                        <p>Loading user data...</p>
                      )}
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs></VStack>

      <Box className="post_circle">
        <Post />
      </Box>
      <Sidebar />
    </>
  );
};

export default PostAll;
