import { Button } from "@yamada-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./css/logoutbtn.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/logout"); // ログアウト処理ページへ移動
  };

  return <Button onClick={handleLogout} className="logout-btn">ログアウト</Button>;
};

export default LogoutButton;
