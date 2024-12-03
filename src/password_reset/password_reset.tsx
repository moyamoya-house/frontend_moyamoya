import React,{ useState } from "react";
import { Box, Input, Text } from "@yamada-ui/react";
import { useNavigate } from "react-router-dom";

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
      <Box w={500} h={500} m="0px auto 20px" border='1px solid #000' mt={120} boxShadow='10px 10px 5px gray'>
        <form
          onSubmit={handlePasswordReset}
        >
          <Text textAlign={"center"} fontSize="1.5rem" fontWeight="bold">
            パスワードリセット
          </Text>
          <Box display={"flex"} m={40}>
            <Text mt={5}>username</Text>
            <Input
              type="text"
              placeholder="ユーザーネームを入力"
              value={user_name}
              onChange={(e) => setUsername(e.target.value)}
              w='80%'
              borderRadius={5}
              maxLength={20}
              h={10}
              mt={13}
            />
          </Box>
          <Box display={"flex"} m={40}>
            <Text mr={10}>新しいパスワード</Text>
            <Input
              type="password"
              placeholder="パスワードを入力"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              w='55%'
              borderRadius={5}
              maxLength={20}
              h={10}
              mt={13}
            />
          </Box>
          <Box display={"flex"} m={40}>
            <Text>パスワード再入力</Text>
            <Input
              type="password"
              placeholder="パスワード再入力"
              value={password_confilm}
              onChange={(e) => setConfilm(e.target.value)}
              w='60%'
              borderRadius={5}
              maxLength={20}
              h={10}
              mt={13}
            />
          </Box>
          <button
            style={{
              width: "85%",
              height: "50px",
              margin: "0 auto 0 35px",
              border: "none",
              backgroundColor: "lightskyblue",
              borderRadius: "10px"
            }}
          >
            再設定
          </button>
        </form>
      </Box>
    </>
  );
};

export default PasswordReset;
