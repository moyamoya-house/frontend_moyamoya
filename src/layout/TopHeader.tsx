import {
  Button,
  List,
  ListItem,
  Drawer,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Box,
  Image,
  Link,
} from "@yamada-ui/react";
import "./css/layout.css";
import React, { useEffect, useState} from "react";

interface User {
  user_id: number;
  name: string;
  prof_image: string;
}

const TopHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:5000/mypage", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    };
    fetchUserData();
  }, []);
  return (
    <>
      {userData ? (
        <Box className="header">
          <Link href="/top">
            <Image src="/PotCom_logo_typography.png" alt="pot" h={100}></Image>
          </Link>
          <Box display="flex" mt={25}>
            <Link href="/notification" textDecoration={"none"} color={"black"}>
              <i className="fas fa-regular fa-bell" style={{ fontSize: '35px', margin: '10px 10px 0 0' }}></i>
            </Link>
            <Button
              onClick={onOpen}
              w={50}
              h={50}
              borderRadius={100}
              float={"right"}
              border="none"
              mr={40}
            >
              { userData.prof_image ? (
              <Image
                src={`http://127.0.0.1:5000/prof_image/${userData.prof_image}`}
                alt="prof_image"
                w={50}
                h={50}
                cursor={"pointer"}
              ></Image>
            ) : (
              <Image
              src='/not_profileicon.jpg'
              alt="prof_image"
              w={50}
              h={50}
              cursor={"pointer"}
            ></Image>
            )}
            </Button>
          </Box>
          <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement="right"
            w="200px"
            h="auto"
            textAlign="right"
            border="1px solid #000"
            bg="#fff"
            size={"xs"}
            zIndex={20}
            backgroundColor={"blue"}
          >
            <DrawerHeader mt={50} textAlign="right">
              <h1 className="username">{userData.name}</h1>
            </DrawerHeader>

            <DrawerBody textAlign="right">
              <List textAlign="right" mt={50}>
                <ListItem fontSize={25} m="30, 20">
                  <Link href='/mypage' color={"black"} textDecoration={"none"}>
                    My page
                  </Link>
                </ListItem>
                <ListItem fontSize={25} m="30, 20">
                  <Link href="/post_all"color={"black"} textDecoration={"none"} >
                    投稿内容
                  </Link>
                </ListItem>
                <ListItem fontSize={25} m="30, 20">
                  <Link href="/pots" color={"black"} textDecoration={"none"}>
                    PotCom
                  </Link>
                </ListItem>
                <ListItem fontSize={25} m="30, 20">
                  <Link href="/chat" color={"black"} textDecoration={"none"}>
                    メッセージ
                  </Link>
                </ListItem>
              </List>
            </DrawerBody>
          </Drawer>
        </Box>
      ) : (
        <Box className="header">
          <Link href="/top">
            <Image src="/PotCom_logo_typography.png" alt="pot" h={100}></Image>
          </Link>
        </Box>
      )}
    </>
  );
};

export default TopHeader;
