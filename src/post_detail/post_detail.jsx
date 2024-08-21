import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Image } from "@yamada-ui/react";
import './css/post_detail.css';

const PostDetail = () => {
    const { id } = useParams();
    const [postData, setPostData] = useState(null);
    const [postUser, setPostUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try{
                const response = await fetch(`http://127.0.0.1:5000/moyamoya/${id}`,{
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();
                    setPostData(data);
                    setLoading(false);
                } else {
                    console.error('Failed to data');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error to falid post Data:',error);
                setLoading(false);
            }
        };
        fetchPostDetail();
    }, [id]);

    useEffect(() => {
        if (postData && postData.id) {
        const fetchPostUser = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/users/${postData.user_id}`,{
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();
                    setPostUser(data);
                    setLoading(false);
                } else {
                    console.error('Failed to data');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error to falid post Data:',error);
                setLoading(false);
            }
        };
        fetchPostUser();}
    }, [postData]);

    if (loading) {
        return <p>loading...</p>;
    }

    if (!postData) {
        return <p>not postData</p>;
    }

    return (
        <>
            <Box className="postdetail">
                <h1 className="detailTitle">モヤモヤ詳細</h1>
            {postUser ? (
                <Box display={"flex"}>
                    {postUser.prof_image ? (
                        <Image
                        src={`http://127.0.0.1:5000/prof_image/${postUser.prof_image}`}
                        alt="prof_image"
                        className="prof_image"
                        />
                    ) : (
                        <Image
                        src="/not_profileicon.jpg"
                        alt="not-proficon"
                        className="prof_image"
                        />
                    )}
                    <Text ml={20}>{postUser.name}</Text>
                </Box>
            ) : (
                <p>Loading user data...</p>
            )}
            <Text>{postData.post}</Text>
            </Box>
        </>
    );
}
export default PostDetail;