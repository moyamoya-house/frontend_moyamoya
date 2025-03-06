import { Box, Link } from "@yamada-ui/react";
import React, { useEffect, useState } from "react";
import "./css/sidebar.css";
import { User } from "../../mypage/component/user_post";

interface Tag {
  tag: string;
  count: number;
}

const Sidebar = () => {
  const [trend, setTrend] = useState<Tag[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/hashtag_trend")
      .then((response) => response.json())
      .then((data) => setTrend(data));
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:5000/recommend_user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.recommend);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Box className="sidebar-container">
      <Box className="trend-box">
        <h5>トレンド一覧</h5>
        <ul>
          {trend.map((tag) => (
            <li key={tag.tag}>
              <Link
                href={`/hashtags/${tag.tag}`}
                textDecoration={"none"}
                textColor="#555"
              >
                {tag.tag} ({tag.count})
              </Link>
            </li>
          ))}
        </ul>
      </Box>
      <Box className="trend-box">
        <h5>おすすめユーザー</h5>
        <ul>
          {users.map((user) => (
            <li key={user.user_id}>
              <Link href={`/users/${user.user_id}`} textDecoration={"none"} textColor="#555">
                <Box display={"flex"} alignItems={"center"}>
                  <Box
                    as={"img"}
                    src={`http://127.0.0.1:5000/prof_image/${user.prof_image}`}
                    alt="prof image" 
                    width={40}
                    height={40}
                    borderRadius={50}
                  />
                {user.name}
                </Box>
              </Link>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default Sidebar;
