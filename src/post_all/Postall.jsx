import { useEffect, useState } from "react";
import { Box, Link, Text } from "@yamada-ui/react";
import Post from "../post/post";

const PostAll  = () => {
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostData = async () => {
            const response = await fetch('http://127.0.0.1:5000/moyamoya', {
                method: 'GET'
            });
            if (response.ok) {
                const data = await response.json();
                setPostData(data);
                setLoading(false);
            }
        };
        fetchPostData();
    },[]);
    if (loading) {
        return<p>loading</p>;
    }
    return (
        <>
            <Box w={1500} maxWidth='80%' m='0 auto' mt={100} overflow={"hidden"} h='100vh'>
                <Box m='0 auto'>
                    <h1 style={{
                        width: '100vw',
                        border_bottom: '1px solid #000'
                    }}>モヤモヤ投稿一覧</h1>
                    <ul className="post">
                        {postData.map((post) => (
                            <Link href={`/post_detail/${post.id}`}>
                                <li key={post.id} className="postlist">
                                    <Text>{post.post}</Text>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </Box>
            </Box>
            <Post></Post>
        </>
    );
}
export default PostAll;