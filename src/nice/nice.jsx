import { useState, useEffect } from "react"
import './css/nice.css';

const LikeButton = ({ postId }) => {
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false);



  useEffect(() => {
    const fetchLikedStatus = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/nice/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLiked(data.liked);
        } else {
          console.error('Failed to fetch like status');
        }
      } catch (error) {
        console.error('Error fetching like status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedStatus();
  }, [postId]);


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

  if (loading) {
    return <div>Loading...</div>;
  }
    return (
    <button
    className="icon-button"
    onClick={like}
    style={{ color: liked ? 'orange': 'gray' }}
    >
        <i className="fas fa-solid fa-heart"></i>
    </button>
    )
}

export default LikeButton;