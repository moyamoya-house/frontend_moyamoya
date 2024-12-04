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
        width={150}
        height={30}
        border={"none"}
        borderRadius={10}
        variant={"ghost"}
        cursor={"pointer"}
        fontSize={20}
        backgroundColor={"lightskyblue"}
        ml={-140}
        mt={10}
      >
        グループ作成
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} w={700} h={500} bg={"white"}>
        <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
        <ModalHeader mt={50}>
          <Text m={"0 auto"}>グループチャット作成</Text>
        </ModalHeader>
        <ModalBody h={400}>
          <Input
            type="text"
            value={groupname}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="グループ名を入力"
            mb={4}
            m={"0 auto"}
            p={5}
            w={"60%"}
          />
          <Input
            type="file"
            onChange={(e) => setGroupImage(e.target.files?.[0] || null)}
          />
          <h3 style={{marginTop: "100px"}}>メンバー選択</h3>
          <Box w={"100%"} h={200}>
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
        <ModalFooter w={"100%"} m={"0 auto 0 auto"}>
          <Button
            onClick={handleCreateGroup}
            colorScheme="blue"
            w={"45%"}
            border={"none"}
            borderRadius={5}
            _hover={{background: "blue", color: "white"}}
          >
            グループ作成
          </Button>
          <Button
            onClick={onClose}
            ml={3}
            w={"45%"}
            mr={30}
            border={"none"}
            borderRadius={5}
            _hover={{background: "red", color: "white"}}
          >
            キャンセル
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CreateChatGroup;
