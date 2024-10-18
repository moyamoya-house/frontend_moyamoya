import { useState } from "react";
import { Box, Image, Button, VStack } from "@yamada-ui/react";
import './css/user_select.css';

const UserSelect = ({ users, group, onSelectUser, onSelectGroup }) => {
  const [showGroups, setShowGroups] = useState(false); // 表示を切り替えるためのstate

  return (
    <Box className="userbox">
      <h1 className="usermap">チャット一覧</h1>

      {/* 個人/グループ切り替えボタン */}
      <Box className="button-container">
        <Button
          onClick={() => setShowGroups(false)}
          colorScheme={!showGroups ? "blue" : "gray"}
        >
          個人チャット
        </Button>
        <Button
          onClick={() => setShowGroups(true)}
          colorScheme={showGroups ? "blue" : "gray"}
        >
          グループチャット
        </Button>
      </Box>

      <VStack align="start" className="user-or-group-list">
        {showGroups ? (
          // グループチャット表示
          group.length > 0 ? (
            group.map((group) => (
              <button
                key={group.id}
                onClick={() => onSelectGroup(group.id)}
                className="selectbutton"
              >
                {group.group_name}
              </button>
            ))
          ) : (
            <p>グループチャットがありません</p>
          )
        ) : (
          // 個人チャット表示
          users.length > 0 ? (
            users.map((user) => (
              <button
                key={user.id}
                onClick={() => onSelectUser(user.id)}
                className="selectbutton"
              >
                <Image
                  className="userimage"
                  src={user.prof_image ? `http://127.0.0.1:5000/prof_image/${user.prof_image}` : '/not_profileicon.jpg'}
                  alt="プロフィール画像"
                />
                {user.name}
              </button>
            ))
          ) : (
            <p>個人チャットがありません</p>
          )
        )}
      </VStack>
    </Box>
  );
};

export default UserSelect;
