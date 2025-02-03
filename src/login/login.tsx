import React, { useState } from "react";
import { Box, Text, Input, Button, Link } from "@yamada-ui/react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";// CSSモジュールをインポート

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const redirect = useNavigate();

  const hadlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      localStorage.setItem("token", data.token);
      console.log(data.token);
      redirect("/top");
    }
  };

  return (
    <Box className="container">
      <form onSubmit={hadlelogin}>
        {/* title */}
        <Text className="logintitle">login</Text>

        {/* username */}
        <Box className="inputBox">
          <Input
            type="text"
            placeholder="Usernameを入力"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
        </Box>

        {/* password */}
        <Box className="inputBox">
          <Input
            type="password"
            placeholder="Passwordを入力"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </Box>

        {/* login button */}
        <Box className="buttonBox">
          <Button type="submit" className="loginbutton">
            ログイン
          </Button>
        </Box>

        {/* signup button */}
        <Box className="buttonBox">
          <Link href="/signup" className="buttonlink">
            新規登録へ
          </Link>
        </Box>

        {/* password reset */}
        <Box className="buttonBox">
          <Link href="/password_reset" className="buttonlink">
            パスワードを忘れた方へ
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
