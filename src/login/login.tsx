import React, { useState } from "react";
import { Box, Text, Input, Button, Link } from "@yamada-ui/react";
import { useNavigate } from "react-router-dom";

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
    <>
      <Box
        w={500}
        h="auto"
        m="0px auto 20px auto"
        border="1px solid #000"
        mt={120}
        boxShadow="10px 10px 5px gray"
      >
        <form onSubmit={hadlelogin}>
          {/* title */}
          <Text textAlign="center" fontSize="1.5rem" fontWeight="bold">
            login
          </Text>
          {/* username */}
          <Box m="40px">
            <Input
              type="text"
              placeholder="Usernameを入力"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              w="90%"
              padding={10}
              borderRadius={5}
              maxLength={20}
              _focus={{color: "sky.100"}}
            />
          </Box>
          {/* パスワード */}
          <Box m={40}>
            <Input
              type="password"
              placeholder="Passwordを入力"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              w="90%"
              padding={10}
              borderRadius={5}
            />
          </Box>
          {/* loginbutton */}
          <Box m={40}>
            <Button
              type="submit"
              w="80%"
              h={50}
              m="20px auto"
              colorScheme="secondary"
              border="none"
              bg="lightskyblue"
              borderRadius={10}
              display={"block"}
              textAlign={"center"}
              textColor={"white"}
              cursor={"pointer"}
              _hover={{backgroundColor: "purple"}}
            >
              ログイン
            </Button>
          </Box>
          {/* signupbutton */}
          <Box m={40}>
            <Link
              href="/signup"
              textDecoration={"none"}
              textColor={"white"}
              w="80%"
              h={50}
              bg="lightskyblue"
              borderRadius={10}
              m="20px auto"
              textAlign="center"
              colorScheme="secondary"
              display="flex"
              alignItems={"center"}
              justifyContent={"center"}
              cursor={"pointer"}
              _hover={{backgroundColor: "purple"}}
            >
              新規登録へ
            </Link>
          </Box>

          <Box m={40}>
            <Link
              href="/password_reset"
              textDecoration={"none"}
              textColor={"white"}
              w="80%"
              h={50}
              bg="lightskyblue"
              borderRadius={10}
              m="20px auto"
              textAlign="center"
              colorScheme="secondary"
              display="flex"
              alignItems={"center"}
              justifyContent={"center"}
              cursor={"pointer"}
              _hover={{backgroundColor: "purple"}}
            >
              パスワードを忘れた方へ
            </Link>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Login;
