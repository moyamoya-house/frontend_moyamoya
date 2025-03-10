import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../post/post.tsx";
// import Sidebar from "../post_all/component/sidebar.tsx";
import LikeButton from "../nice/nice.tsx";
import Bookmark from "../bookmark/bookmark.tsx";
import "./css/hash_tag.css";
import {
  Box,
  Image,
  Text,
  Link,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  VStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@yamada-ui/react";
import React from "react";

interface Moyamoya {
  id: number;
  post: string;
  user_id: number;
  created_at: string;
  count: number;
}

const HashTagPost = () => {
  const { hashtag } = useParams<{ hashtag: string }>();
  const encodedHashtag = encodeURIComponent(`${hashtag}`); 
  console.log(encodedHashtag);
  const [post, setPost] = useState<Moyamoya[]>([]);
  const [followPost, setFollowPost] = useState<Moyamoya[]>([]);
  const [userData, setUserData] = useState({});
  const [followUserData, setFollowUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [bgColor, setBgColor] = useState(0);

  // ボタンクリック時に背景色を変更する関数
  const handleTabClick = (index) => {
    setBgColor(index);
  };
  useEffect(() => {
    if (hashtag) {
      // hashtag があるか確認
      const fetchHashtagPosts = async () => {
        try {
            const response = await fetch(
            `http://127.0.0.1:5000/hashtags/${encodedHashtag}`
            );
          if (response.ok) {
            const data = await response.json();
            setPost(data);
          } else {
            console.error("Failed to fetch posts");
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchHashtagPosts();
    }
  }, [encodedHashtag, hashtag]);

  // 投稿に対するユーザー情報を取得
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const userIds = [...new Set(post.map((post) => post.user_id))];
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
    if (post.length > 0) {
      fetchUsersData();
    }
  }, [post]);

  // フォロー中のユーザーの投稿を取得
  useEffect(() => {
    const fetchFollowPost = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://127.0.0.1:5000/moyamoya_follow", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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

  const HashTag = (text: string) => {
    const hashTagRegex = /#[\w]+/g;
    return text.split(hashTagRegex).map((part, index) => {
      const match = text.match(hashTagRegex);
      if (match && match[index - 1]) {
        const hashtag = match[index - 1];
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
    return <p>loading</p>;
  }

  return (
    <>
      <h1 className="postalltitle">ハッシュタグ投稿一覧</h1>
      {/* <Box w="15%" h={"auto"} position={"fixed"}>
        <Input
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Sidebar />
      </Box> */}
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
                      {post.map((post) => (
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
                                  : "/not_profileicon.jpg"
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
                                        : "/not_profileicon.jpg"
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

export default HashTagPost;
