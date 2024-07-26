import { useNavigate } from "react-router-dom";

const Post = () => {
    const navigate = useNavigate();

    const handleCreateMoyamoya = async (postContent) => {

        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:5000/moyamoya', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ post: postContent })
        });
        if (response.ok) {
            const data = await response.json();
            console.log('MoyaMoya Created',data);
            navigate('/post_all');
        } else {
            const error = await response.json();
            console.error(error);
        }
    };


}
export default Post;