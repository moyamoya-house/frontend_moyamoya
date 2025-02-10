import { Box, Link } from "@yamada-ui/react";
import React, { useEffect, useState } from "react";
import "./css/sidebar.css";

interface Tag {
  tag: string;
  count: number;
}

const Sidebar = () => {
  const [trend, setTrend] = useState<Tag[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/hashtag_trend")
      .then((response) => response.json())
      .then((data) => setTrend(data));
  }, []);

  
  return (
    <Box className="sidebar-container">
      <Box className="trend-box">
        <h5>トレンド一覧</h5>
        <ul>
          {trend.map((tag) => (
            <li key={tag.tag}>
              <Link href={`/hashtags/${tag.tag}`} textDecoration={"none"} textColor="#555">{tag.tag} ({tag.count})</Link>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default Sidebar;
