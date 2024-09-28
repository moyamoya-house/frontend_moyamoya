import { useEffect, useState } from "react";

const Bookmark = ({ postId }) => {
  const [bookmark, setBookmark] = useState(false);

  // bookmark取得
  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://127.0.0.1:5000/bookmarks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBookmark(data.bookmarks.includes(postId));
        } else {
          console.error("Failed fetch bookmark");
        }
      } catch (error) {
        console.error("Error fetching bookmark", error);
      }
    };
    fetchBookmarkStatus();
  }, [postId]);

  // bookmark作成
  const fetchBookmarkCreate = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://127.0.0.1:5000/bookmark/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setBookmark(!bookmark);
      } else {
        console.error("Failed to bookmark");
      }
    } catch (error) {
      console.error("Error to bookmark", error);
    }
  };
  return (
    <button
    onClick={fetchBookmarkCreate}
    style={{ color: bookmark ? 'blue' : 'gray', fontSize:"x-large", marginLeft:'20px', border:'none', display:'block', cursor:'pointer', marginTop:'5px', backgroundColor:'white'}}
    >
      <i className="fas fa-regular fa-bookmark"></i>
    </button>
  );
};
export default Bookmark;
