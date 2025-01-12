import { Box } from "@yamada-ui/react";
import "../css/baloon.css";
import React from "react";

const BaloonTopLeft = () => {
  return (
    <>
      <div className="baloon-container">
        <Box className="baloon baloontopleft">
          ストレス発散できる何かないかな
        </Box>
      </div>
    </>
  );
};

export default BaloonTopLeft;
