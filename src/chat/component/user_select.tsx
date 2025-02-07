import React, { useState } from "react";
import { Box, Image, Button, VStack, Text } from "@yamada-ui/react";
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

  return (
    <Box className="userbox">
      <h1 className="usermap">チャット一覧</h1>

      {/* 個人/グループ切り替えボタン */}
      <Box m={"0 auto"}>
        <Button
          onClick={() => setShowGroups((prev) => !prev)} // 状態をトグル
          className="showbutton"
          variant={"ghost"}
        >
          {showGroups ? "個人チャット" : "グループチャット"}{" "}
          {/* 状態に応じてテキストを切り替え */}
        </Button>
      </Box>

      <VStack align="start" className="user-or-group-list">
        {showGroups ? (
          // グループチャット表示
          group.length > 0 ? (
            group.map((grp) => (
              <button
                key={grp.group_id}
                onClick={() => onSelectGroup(grp.group_id)}
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
        ) : // 個人チャット表示
        users.length > 0 ? (
          users.map((usr) => (
            <button
              key={usr.id}
              onClick={() => onSelectUser(usr.id)}
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
  );
};

export default UserSelect;
