import { Button } from "@yamada-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/logout"); // ログアウト処理ページへ移動
  };

  return <Button onClick={handleLogout}>ログアウト</Button>;
};

export default LogoutButton;
