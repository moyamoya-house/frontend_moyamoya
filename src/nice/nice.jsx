import { useState } from "react"
import './css/nice.css';

const LikeButton = ({ postId }) => {
    const [liked, setLiked] = useState(null);

    const like = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://127.0.0.1:5000/nice/${postId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ liked: !liked }),
            });
            if (response.ok) {
                // 状態反転
                setLiked(!liked);
            } else {
                console.error('Failed to like the post');
            }
        } catch (error) {
            console.error('Error liked the post',error);
        }
    };


    return (
    <button
    className="icon-button"
    bg={liked ? 'orange': 'gray'}
    onClick={like}
    >
        <i className="fas fa-solid fa-heart"></i>
    </button>
    )
}

export default LikeButton;