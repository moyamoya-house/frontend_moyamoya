import { useEffect, useState } from "react";
import { Box, Link, Text, Image } from "@yamada-ui/react";
import Post from "../post/post";
import './css/post_all.css';

const PostAll = () => {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/moyamoya', {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setPostData(data);
          setLoading(false);
        } else {
          console.error('Failed to fetch posts');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };
    fetchPostData();
  }, []);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const userIds = [...new Set(postData.map(post => post.user_id))];
        const userDataPromises = userIds.map(id =>
          fetch(`http://127.0.0.1:5000/users/${id}`).then(response => response.json())
        );
        const users = await Promise.all(userDataPromises);
        const userMap = {};
        users.forEach(user => {
          userMap[user.id] = user;
        });
        setUserData(userMap);
      } catch (error) {
        console.error('Error fetching users:', error);
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
      <Box w={1500} maxWidth="80%" m="0 auto" mt={100} overflow="auto" h="100vh">
        <Box m="0 auto">
          <h1
            style={{
              width: '100vw',
              borderBottom: '1px solid #000',
            }}
          >
            モヤモヤ投稿一覧
          </h1>
          <ul className="post">
            {postData.map((post) => (
              <Link key={post.id} href={`/post_detail/${post.id}`} textDecoration="none">
                <li className="postlist">
                  {userData[post.user_id] ? (
                    <Box>
                      <Image 
                        w={50} 
                        h={50} 
                        borderRadius={100} 
                        src={userData[post.user_id].prof_image 
                            ? `http://127.0.0.1:5000/prof_image/${userData[post.user_id].prof_image}` 
                            : 'not_profileicon.jpg'} 
                        alt="prof image" 
                      />
                      <Text>{userData[post.user_id].name}</Text>
                      <Text>{post.post}</Text>
                    </Box>
                  ) : (
                    <p>Loading user data...</p>
                  )}
                </li>
              </Link>
            ))}
          </ul>
        </Box>
      </Box>
      <Post />
    </>
  );
};

export default PostAll;
