import { Box } from "@yamada-ui/react";
import React,{ useEffect, useState } from "react";

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
    <Box>
      <Box w={150} h={200} backgroundColor={"orange"} ml={10}>
        <h5>トレンド一覧</h5>
        <ul>
          {trend.map((tag) => (
            <li key={tag.tag} style={{"listStyle": "none"}}>
              {tag.tag} ({tag.count})
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default Sidebar;
