import { useState } from "react";
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
} from "@yamada-ui/react";
import { useNavigate } from "react-router-dom";

const CreateChatGroup = ({ users }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupname, setGroupName] = useState("");
  const [groupimage, setGroupImage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  // ユーザー選択の処理
  const handleUserSelect = (e) => {
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
    const formData = new FormData();  // FormDataオブジェクトを作成
  
    formData.append("group_name", groupname);  // グループ名を追加
    formData.append("group_image", groupimage);  // 画像ファイルを追加
    selectedUsers.forEach((userId) => formData.append("user_ids[]", userId));  // ユーザーIDを追加
  
    if (groupname && selectedUsers.length > 0) {
      fetch("http://127.0.0.1:5000/group", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,  // 認証トークンをヘッダに追加
        },
        body: formData,  // FormDataをリクエストボディに設定
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
      <Button onClick={onOpen}>グループ作成</Button>

      <Modal isOpen={isOpen} onClose={onClose} w={500} h={350} bg={"white"}>
        <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
        <ModalHeader mt={50}>グループチャット作成</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            value={groupname}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="グループ名を入力"
            mb={4}
          />
          <Input
            type="file"
            onChange={(e) => setGroupImage(e.target.files[0])}
          />
          <h3>メンバー選択</h3>
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
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleCreateGroup} colorScheme="blue">
            グループ作成
          </Button>
          <Button onClick={onClose} ml={3}>
            キャンセル
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CreateChatGroup;
