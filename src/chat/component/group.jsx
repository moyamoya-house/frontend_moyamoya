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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  // チェックボックスの選択状態を管理
  const handleCheckboxChange = (e) => {
    const userId = e.target.value;
    if (e.target.checked) {
      // チェックされた場合、ユーザーIDを追加
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId]);
    } else {
      // チェックが外れた場合、ユーザーIDを削除
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((id) => id !== userId)
      );
    }
  };

  console.log(selectedUsers);

  // グループ作成の処理
  const handleCreateGroup = () => {
    const token = localStorage.getItem("token");
    if (groupname && selectedUsers.length > 0) {
      fetch("http://127.0.0.1:5000/group", {
        method: "POST", // POSTメソッドを指定
        headers: {
          "Content-Type": "application/json", // リクエストのデータ形式をJSONと指定
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          group_name: groupname,
          user_ids: selectedUsers,
        }), // JSONに変換してリクエストボディとして送信
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
        <ModalHeader>グループチャット作成</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            value={groupname}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="グループ名を入力"
            mb={4}
          />
          <h3>メンバー選択</h3>
          <VStack align="start">
            {users.map((user) => (
              <label key={user.id}>
                <input
                  type="checkbox"
                  value={user.id}
                  checked={selectedUsers.includes(user.user_id)}
                  onChange={handleCheckboxChange}
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
