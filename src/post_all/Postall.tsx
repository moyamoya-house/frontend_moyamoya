"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Link,
  Text,
  Image,
  Tabs,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Drawer,
  DrawerOverlay,
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
} from "@yamada-ui/react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Post from "../post/post.tsx";
import Sidebar from "./component/sidebar.tsx";
import LikeButton from "../nice/nice.tsx";
import {
  fetchPosts,
  fetchFollowPosts,
  fetchUsers,
} from "../hooks/useMoyamoya.ts";
import Bookmark from "../bookmark/bookmark.tsx";
import "./css/post_all.css";

export interface Moyamoya {
  id: number;
  post: string;
  user_id: number;
  created_at: string;
  count: number;
}

const PostAll = () => {
  const [postData, setPostData] = useState<Moyamoya[]>([]);
  const [followPost, setFollowPost] = useState<Moyamoya[]>([]);
  const [userData, setUserData] = useState({});
  const [followUserData, setFollowUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [bgColor, setBgColor] = useState(0);
  const [query, setQuery] = useState("");
  const [filterpost, setFilterPost] = useState<Moyamoya[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // ボタンクリック時に背景色を変更する関数
  const handleTabClick = (index:number) => {
    setBgColor(index);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // 全体の投稿を取得
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const data = await fetchPosts();
        setPostData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };
    fetchPostData();
  }, []);

  useEffect(() => {
    const fetchFollowPostData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const data = await fetchFollowPosts(token);
        setFollowPost(data);
      } catch (error) {
        console.error("Error fetching follow posts:", error);
      }
    };
    fetchFollowPostData();
  }, []);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const userIds = [...new Set(postData.map((post) => post.user_id))];
        const users = await fetchUsers(userIds);
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

  useEffect(() => {
    const fetchFollowUsersData = async () => {
      try {
        const userIds = [...new Set(followPost.map((post) => post.user_id))];
        const users = await fetchUsers(userIds);
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
      fetchFollowUsersData();
    }
  }, [followPost]);

  useEffect(() => {
    if (query) {
      const filtered = postData.filter((post) =>
        post.post.toLowerCase().includes(query.toLowerCase())
      );
      setFilterPost(filtered);
    } else {
      setFilterPost(postData);
    }
  }, [query, postData]);

  const HashTag = (text: string) => {
    const hashTagRegex = /#[\w]+/g;
    return text.split(hashTagRegex).map((part, index) => {
      const match = text.match(hashTagRegex);
      if (match && match[index - 1]) {
        const hashtag = match[index - 1];
        console.log(hashtag.slice(1));
        return (
          <>
            {part}
            <Link href={`/hashtags/${hashtag.slice(1)}`} color="blue">
              {hashtag}
            </Link>
          </>
        );
      }
      return part;
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="postalltitle">モヤモヤ投稿一覧</h1>
      {/* トグルボタン */}
      <Box position="fixed" top="110px" left="10px" zIndex="10">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button
          onClick={toggleSidebar}
          bg="blue.500"
          color="white"
          _hover={{ bg: "blue.600" }}
          p="3"
          rounded="full"
          shadow="lg"
        >
          <Menu size={24} />
        </Button>
      </motion.div>
    </Box>

      {/* ドロワー (サイドバー) */}
      <Drawer isOpen={isOpen} onClose={toggleSidebar} placement="left" w={300} bg={"#fff"} size={"xs"} backgroundColor={"white"}>
        <DrawerOverlay bg="rgba(0,0,0,0.6)"/>
          <DrawerCloseButton />
          <DrawerHeader mt={100}></DrawerHeader>
            <DrawerBody>
              <Box display={"flex"}>
            <Input
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              ml={30}
            />
            <Button
              ml={5}
              colorScheme="blue"
              onClick={() => {
              const filtered = postData.filter((post) =>
                post.post.toLowerCase().includes(query.toLowerCase())
              );
              setFilterPost(filtered);
              toggleSidebar();
              }}
            >
              検索
            </Button></Box>
            <Sidebar />
            </DrawerBody>
      </Drawer>
      <Box>
        <VStack ml={-170}>
          <Tabs variant="line" ml={150}>
            <Tab
              width={150}
              margin="0 -40px 0 auto"
              border={"none"}
              cursor={"pointer"}
              onClick={() => handleTabClick(0)}
              backgroundColor={bgColor === 0 ? "lightblue" : "white"}
              color={bgColor === 0 ? "white" : "black"}
            >
              全体
            </Tab>
            <Tab
              width={150}
              m={"0 auto 0 60px"}
              cursor={"pointer"}
              border={"none"}
              onClick={() => handleTabClick(1)}
              backgroundColor={bgColor === 1 ? "lightblue" : "white"}
              color={bgColor === 1 ? "white" : "black"}
            >
              フォロー中
            </Tab>

            <TabPanels>
              <TabPanel>
                <Box className="post_all">
                  <Box>
                    <Box className="post">
                      {filterpost.map((post) => (
                        <Card className="postlist" key={post.id}>
                          {userData[post.user_id] ? (
                            <Box>
                              <CardHeader
                              w="100%"
                              m="10px 0 0 10px"
                              display={"flex"}
                              justifyContent={"space-between"}
                              >
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
                                  ? `http://127.0.0.1:5000/prof_image/${
                                    userData[post.user_id].prof_image
                                    }`
                                  : "not_profileicon.jpg"
                                }
                                alt="prof image"
                                />
                                <Text mt={10} marginLeft={10}>
                                {userData[post.user_id].name}
                                </Text>
                              </Link>
                              <Text mt={10} marginRight={10}>
                                {post.created_at.split("-").join("/")}
                              </Text>
                              </CardHeader>
                              <CardBody>
                                <Link
                                  href={`/post_detail/${post.id}`}
                                  textDecoration="none"
                                  color={"black"}
                                  display={"inline-block"}
                                  mt={30}
                                >
                                  <Text>{HashTag(post.post)}</Text>
                                </Link>
                              </CardBody>
                              <CardFooter>
                                <Box
                                  display={"flex"}
                                  justifyContent={"flex-end"} /* 右端に配置 */
                                  width={
                                    "100%"
                                  } /* フレックス内で幅を全体に広げる */
                                >
                                  <LikeButton postId={post.id}></LikeButton>
                                  <Text ml={2}>{post.count}</Text>{" "}
                                  {/* ボタンとテキストの間隔を適切に設定 */}
                                  <Bookmark postId={post.id}></Bookmark>
                                </Box>
                              </CardFooter>
                            </Box>
                          ) : (
                            <p>Loading user data...</p>
                          )}
                        </Card>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </TabPanel>

              <TabPanel>
                <Box className="post_all">
                  <Box>
                    <Box className="post">
                      {followPost.map((post) => (
                        <Card className="postlist" key={post.id}>
                          {followUserData[post.user_id] ? (
                            <Box>
                              <CardHeader
                              w="100%"
                              m="10px 0 0 10px"
                              display={"flex"}
                              justifyContent={"space-between"}
                              >
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
                                        ? `http://127.0.0.1:5000/prof_image/${
                                            followUserData[post.user_id]
                                              .prof_image
                                          }`
                                        : "not_profileicon.jpg"
                                    }
                                    alt="prof image"
                                  />
                                  <Text mt={10} marginLeft={10}>
                                    {followUserData[post.user_id].name}
                                  </Text>
                                </Link>
                                <Text mt={10} marginRight={10}>
                                  {post.created_at.split("-").join("/")}
                                </Text>
                              </CardHeader>
                              <CardBody>
                                <Link
                                  href={`/post_detail/${post.id}`}
                                  textDecoration="none"
                                  color={"black"}
                                  display={"inline-block"}
                                  mt={30}
                                >
                                  <Text>{HashTag(post.post)}</Text>
                                </Link>
                              </CardBody>
                              <CardFooter>
                                <Box 
                                  display={"flex"}
                                  justifyContent={"flex-end"} /* 右端に配置 */
                                  width={
                                    "100%"
                                  } 
                                  >
                                  <LikeButton postId={post.id}></LikeButton>
                                  <Text>{post.count}</Text>
                                  <Bookmark postId={post.id}></Bookmark>
                                </Box>
                              </CardFooter>
                            </Box>
                          ) : (
                            <p>Loading user data...</p>
                          )}
                        </Card>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Box>
      <Box className="post_circle">
        <Post />
      </Box>
    </>
  );
};

export default PostAll;
