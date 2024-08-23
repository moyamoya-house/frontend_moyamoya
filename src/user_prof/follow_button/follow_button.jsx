import { useState } from "react";
import '../css/follow_button.css'
const Followbutton = ({ userId }) => {
  const [isFollower, setFollower] = useState(false);

  const handleFollow = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://127.0.0.1:5000/follow/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFollower(true);
      } else {
        console.error("Failed to follow the user");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
      <button onClick={handleFollow} disabled={isFollower} className="follow_button">
        {isFollower ? "フォロー中" : "フォローする"}
      </button>
  );
};

export default Followbutton;
