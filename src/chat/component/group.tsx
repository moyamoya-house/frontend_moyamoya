import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  VStack,
  useDisclosure,
  Text,
  Box
} from "@yamada-ui/react";
import { useNavigate } from "react-router-dom";
import "./css/group.css";

interface User {
  id: number;
  user_name: string;
}

interface CreateChatGroupProps {
  users: User[];
}

const CreateChatGroup: React.FC<CreateChatGroupProps> = ({ users }) => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [groupname, setGroupName] = useState<string>("");
  const [groupimage, setGroupImage] = useState<File | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  // ユーザー選択の処理
  const handleUserSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userId = parseInt(e.target.value, 10); // inputのvalueからユーザーIDを取得
    setSelectedUsers(
      (prevSelected) =>
        prevSelected.includes(userId)
          ? prevSelected.filter((id) => id !== userId) // 選択解除
          : [...prevSelected, userId] // 選択
    );
  };
  console.log(selectedUsers);

  const handleCreateGroup = () => {
    const token = localStorage.getItem("token");
    const formData = new FormData(); // FormDataオブジェクトを作成

    formData.append("group_name", groupname); // グループ名を追加
    if (groupimage) {
      formData.append("group_image", groupimage);
    }
    selectedUsers.forEach((userId) =>
      formData.append("user_ids[]", userId.toString())
    );
    if (groupname && selectedUsers.length > 0) {
      fetch("http://127.0.0.1:5000/group", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // 認証トークンをヘッダに追加
        },
        body: formData, // FormDataをリクエストボディに設定
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("グループ作成に失敗しました");
          }
          return response.json();
        })
        .then((data) => {
          console.log("グループ作成成功", data);
          navigate("/chat");
          onClose();
        })
        .catch((error) => {
          console.error("グループ作成失敗:", error);
        });
    } else {
      alert("グループ名とメンバーを選択してください。");
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        className="group-button"
      >
        グループ作成
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} className="group-modal">
        <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
        <ModalHeader className="group-modal-header">
          <Text m={"0 auto"}>グループチャット作成</Text>
        </ModalHeader>
        <ModalBody className="group-modal-body">
          <Input
            type="text"
            value={groupname}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="グループ名を入力"
            className="group-input-text"
          />
          <Input
            type="file"
            onChange={(e) => setGroupImage(e.target.files?.[0] || null)}
            mt={10}
          />
          <h3 className="member-selection">メンバー選択</h3>
          <Box className="member-box">
          <VStack align="start">
            {users.map((user) => (
              <label key={user.id}>
                <input
                  type="checkbox"
                  value={user.id}
                  checked={selectedUsers.includes(user.id)}
                  onChange={handleUserSelect}
                />
                {user.user_name} {/* ユーザー名を表示 */}
              </label>
            ))}
          </VStack>
          </Box>
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button
            onClick={handleCreateGroup}
            colorScheme="blue"
            className="create-button"
          >
            グループ作成
          </Button>
          <Button
            onClick={onClose}
            className="cancel-button"
          >
            キャンセル
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CreateChatGroup;
