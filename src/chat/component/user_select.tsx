"use client";

import React, { useState, useEffect } from "react";
import { Box, Image, Button, VStack, Text } from "@yamada-ui/react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import "./css/user_select.css";

interface User {
  id: number;
  user_name: string;
  prof_image: string | null;
}

interface Group {
  group_id: number;
  group_name: string;
  group_image: string | null;
}

interface UserSelectProps {
  users: User[];
  group: Group[];
  onSelectUser: (userId: number) => void;
  onSelectGroup: (groupId: number) => void;
}

const UserSelect: React.FC<UserSelectProps> = ({
  users,
  group,
  onSelectUser,
  onSelectGroup,
}) => {
  const [showGroups, setShowGroups] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // ウィンドウ幅の監視
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* スマホ用メニューアイコン */}
      {isMobile && (
        <Button
          position="fixed"
          top="110px"
          left="10px"
          zIndex="1001"
          bg="gray.700"
          color="white"
          borderRadius="full"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </Button>
      )}

      {/* スマホ用オーバーレイ */}
      {isMobile && isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="rgba(0, 0, 0, 0.5)"
          zIndex="1000"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* サイドメニュー */}
      <Box
        as={motion.div}
        initial={{ x: isMobile ? "-100%" : "0%" }}
        animate={{ x: isMobile && !isOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.3 }}
        position="fixed"
        top="100px"
        left="0"
        width={{ base: "80%", md: "250px" }}
        height="100vh"
        bg="lightsteelblue"
        overflowY="scroll"
        zIndex="1002"
        display="flex"
        flexDirection="column"
        p={4}
      >
        {/* スマホ用閉じるボタン */}
        {isMobile && (
          <Button
            alignSelf="flex-end"
            bg="gray.700"
            color="white"
            borderRadius="full"
            mb={2}
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </Button>
        )}

        <h1 className="usermap">チャット一覧</h1>

        {/* 個人/グループ切り替えボタン */}
        <Box textAlign="center" mt={2} mb={2}>
          <Button
            onClick={() => setShowGroups((prev) => !prev)}
            className="showbutton"
            variant={"ghost"}
          >
            {showGroups ? "個人チャット" : "グループチャット"}
          </Button>
        </Box>

        <VStack align="start" className="user-or-group-list">
          {showGroups ? (
            group.length > 0 ? (
              group.map((grp) => (
                <button
                  key={grp.group_id}
                  onClick={() => {
                    onSelectGroup(grp.group_id);
                    setIsOpen(false);
                  }}
                  className="selectbutton"
                >
                  <Image
                    className="userimage"
                    src={
                      grp.group_image
                        ? `http://127.0.0.1:5000/group_image/${grp.group_image}`
                        : "/not_profileicon.jpg"
                    }
                    alt="グループ画像"
                  />
                  <Text ml={30}>{grp.group_name}</Text>
                </button>
              ))
            ) : (
              <p>グループチャットがありません</p>
            )
          ) : users.length > 0 ? (
            users.map((usr) => (
              <button
                key={usr.id}
                onClick={() => {
                  onSelectUser(usr.id);
                  setIsOpen(false);
                }}
                className="selectbutton"
              >
                <Image
                  className="userimage"
                  src={
                    usr.prof_image
                      ? `http://127.0.0.1:5000/prof_image/${usr.prof_image}`
                      : "/not_profileicon.jpg"
                  }
                  alt="プロフィール画像"
                />
                <Text ml={30}>{usr.user_name}</Text>
              </button>
            ))
          ) : (
            <p>個人チャットがありません</p>
          )}
        </VStack>
      </Box>
    </>
  );
};

export default UserSelect;
