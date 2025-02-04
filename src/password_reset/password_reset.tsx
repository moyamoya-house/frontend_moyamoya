import React,{ useState } from "react";
import { Box, Input, Text } from "@yamada-ui/react";
import { useNavigate } from "react-router-dom";
import "./css/password_reset.css";

const PasswordReset = () => {
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confilm, setConfilm] = useState("");
  const redirect = useNavigate();

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/password_reset", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name, password, password_confilm }),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      redirect("/login");
    }
  };

  return (
    <>
      <Box className="container">
        <form
          onSubmit={handlePasswordReset}
        >
          <Text className="form-title">
            パスワードリセット
          </Text>
          <Box className="input-group">
            <Text className="input-label">ユーザー<br />ネーム</Text>
            <Input
              type="text"
              placeholder="ユーザーネームを入力"
              value={user_name}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              maxLength={20}
            />
          </Box>
          <Box display={"flex"} m={20}>
            <Text>新しい<br />パスワード</Text>
            <Input
              type="password"
              placeholder="パスワードを入力"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
              maxLength={20}
            />
          </Box>
          <Box display={"flex"} m={20}>
            <Text>パスワード<br />再入力</Text>
            <Input
              type="password"
              placeholder="パスワード再入力"
              value={password_confilm}
              onChange={(e) => setConfilm(e.target.value)}
              className="confirm-password-input"
              maxLength={20}
            />
          </Box>
          <button className="submit-button" type="submit"
          >
            再設定
          </button>
        </form>
      </Box>
    </>
  );
};

export default PasswordReset;
