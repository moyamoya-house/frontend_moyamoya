import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text } from "@yamada-ui/react";
import './css/post_detail.css';

const PostDetail = () => {
    const { id } = useParams();
    const [postData, setPostData] = useState(null);
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

    if (loading) {
        return <p>loading...</p>;
    }

    if (!postData) {
        return <p>not postData</p>;
    }

    return (
        <>
            <Box mt={100}>
                <h1>モヤモヤ詳細</h1>
                <Text>{postData.post}</Text>
            </Box>
        </>
    );
}
export default PostDetail;