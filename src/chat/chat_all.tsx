import React, { useEffect, useState } from "react";
import { Box } from "@yamada-ui/react";
import UserSelect from "./component/user_select.tsx";
import Chat from "./component/chat.tsx";
import CreateChatGroup from "./component/group.tsx";
import "./css/chat_all.css";

interface User {
  id: number;
  user_name: string;
  prof_image: string;
}

interface Group {
  group_id: number;
  group_name: string;
  group_image: string;
}

const ChatAll = () => {
  const [receiverId, setReceiver] = useState<number | null>(null);
  const [userId, setUser] = useState<number | null>(null);
  const [myImage, setMyImage] = useState<string>("");
  const [receiverName, setReceiverName] = useState<string>("");
  const [receiverImage, setReceiverImage] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [group, setGroup] = useState<Group[]>([]);
  const [groupId, setGroupId] = useState(null); // グループIDを管理する状態
  const [groupName, setGroupName] = useState(""); // グループ名を管理する状態
  const [groupImage, setGroupImage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:5000/mypage", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.id);
        setMyImage(data.prof_image);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUsersData = async () => {
      const response = await fetch("http://127.0.0.1:5000/users", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    };
    fetchUsersData();
  }, []);

  useEffect(() => {
    const fetchGroupData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:5000/groupchat", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setGroup(data);
      }
    };
    fetchGroupData();
  }, []);

  const handleUserSelect = (id) => {
    const selectedUser = users.find((user) => user.id === id);
    if (selectedUser) {
      setReceiver(id);
      setReceiverName(selectedUser.user_name);
      setReceiverImage(selectedUser.prof_image);
      setGroupId(null); // グループ選択をリセット
      setGroupName("");
    }
  };

  const handleGroupSelect = (id) => {
    const selectedGroup = group.find((group) => group.group_id === id);
    if (selectedGroup) {
      setGroupId(id);
      setGroupName(selectedGroup.group_name);
      setGroupImage(selectedGroup.group_image);
      setReceiver(null); // ユーザー選択をリセット
      setReceiverName("");
      setReceiverImage("");
    }
  };

  return (
    <>
      <Box className="chat-container">
        <Box className="chat-user-select">
          <UserSelect
            users={users}
            onSelectUser={handleUserSelect}
            group={group}
            onSelectGroup={handleGroupSelect}
          />
        </Box>
        <Box className="chat-flex-container">
          <Chat
            receiverId={receiverId}
            userId={userId}
            receiverName={receiverName}
            receiverImage={receiverImage}
            myImage={myImage}
            groupId={groupId} // グループIDを渡す
            groupName={groupName} // グループ名を渡す
            groupImage={groupImage}
          />
          <Box className="chat-fixed-box">
            <CreateChatGroup users={users} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatAll;
