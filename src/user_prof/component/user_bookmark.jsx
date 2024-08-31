import { useEffect, useState } from "react";
import { Box, Text, Link, Image, Center } from "@yamada-ui/react";
import LikeButton from "../../nice/nice";
import Bookmark from "../../bookmark/bookmark";
import './css/user_bookmark.css';

const UserBookmark = ({userId}) => {
    const [bookmark, setBookmark] = useState([]);
    const [userData, setUseData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookmark = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/user_bookmark/${userId}`,{
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();
                    setBookmark(data);
                    setLoading(false);
                } else {
                    console.error('Failed to fetch posts');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Failed to fetch posts:',error);
                setLoading(false);
            }
        };
        fetchBookmark();
    },[userId]);

      //保存した投稿のユーザー取得
  useEffect(() => {
    const fetchBookmarkUser = async () => {
        try {
            const userIds = [...new Set(bookmark.map((bookmark) => bookmark.user_id))];
            const userDataPromises = userIds.map((id) =>
                fetch(`http://127.0.0.1:5000/users/${id}`).then((response) =>
                    response.json()
                )
            );
            const users = await Promise.all(userDataPromises);
            const usermap = {};
            users.forEach((user) => {
                usermap[user.id] = user;
            });
            setUseData(usermap);
        } catch (error) {
            console.error('Error fetching users:', error);
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
    <Box w={1500} maxWidth='80%' margin='0 auto'>
      {bookmark.length > 0 ? (
        <ul className="post">
          {bookmark.map((post) => (
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
}
export default UserBookmark;
