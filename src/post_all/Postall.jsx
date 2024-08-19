import { useEffect, useState } from "react";
import { Box, Link, Text, Image} from "@yamada-ui/react";
import Post from "../post/post";
import "./css/post_all.css";

const PostAll = () => {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!postData.length) {
    return <p>No data available</p>;
  }

  return (
    <>
      <h1 className="postalltitle">
        モヤモヤ投稿一覧
      </h1>
      <Box className="post_all">
        <Box>
          <ul className="post">
            {postData.map((post) => (
              <li className="postlist">
                {userData[post.user_id] ? (
                  <Box>
                    <Box m="20px 0 0 20px" display={"flex"}>
                      <Link
                        key={post.user_id}
                        href={`/user_prof/${post.user_id}`}
                        // display={"inline-block"}
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
                        <Text marginLeft={10}>
                          {userData[post.user_id].name}
                        </Text>
                      </Link>
                    </Box>
                    <Text mt={-50} ml={730}>{post.created_at.split('-').join('/')}</Text>
                    <Link
                      key={post.id}
                      href={`/post_detail/${post.id}`}
                      textDecoration="none"
                      color={"black"}
                      display={"inline-block"}
                      mt={50}
                    >
                      <Text textAlign={"center"}>{post.post}</Text>
                    </Link>
                  </Box>
                ) : (
                  <p>Loading user data...</p>
                )}
              </li>
            ))}
          </ul>
        </Box>
      </Box>
      <Box className="post_circle">
        <Post />
      </Box>
    </>
  );
};

export default PostAll;
