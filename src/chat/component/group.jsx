import { useState } from "react";
import { Button, Modal, ModalOverlay, ModalHeader, ModalBody, ModalFooter, Input, CheckboxGroup, Checkbox, VStack } from "@yamada-ui/react";

const CreateChatGroup = ({ users }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupname, setGroupName] = useState('');


    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(true);
    //ユーザー選択
    const handleUserSelect = (userId) => {
        setSelectedUsers(prevSelected => 
            prevSelected.includes(userId)
            ? prevSelected.filter(id => id !== userId)  // ユーザーが選択されている場合、選択を解除
            : [...prevSelected, userId]                 // ユーザーが選択されていない場合、選択
        );
    };

    // グループ作成の処理
    const handleCreateGroup = () => {
        if (groupname && selectedUsers.length > 0) {
            fetch('http://127.0.0.1:5000/group', {
                method: 'POST', // POSTメソッドを指定
                headers: {
                    'Content-Type': 'application/json' // リクエストのデータ形式をJSONと指定
                },
                body: JSON.stringify({
                    group_name: groupname,
                    user_ids: selectedUsers
                }) // JSONに変換してリクエストボディとして送信
            })
            .then(response => {
                if (!response.ok) {
                    // レスポンスが失敗した場合
                    throw new Error('グループ作成に失敗しました');
                }
                return response.json();
            })
            .then(data => {
                // 成功時の処理
                console.log('グループ作成成功', data);
            })
            .catch(error => {
                // エラー時の処理
                console.error('グループ作成失敗:', error);
            });
        } else {
            alert('グループ名とメンバーを選択してください。');
        }
    };

    return (
        <>
            <Button onClick={openModal}>グループ作成</Button>

            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
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
                        <CheckboxGroup>
                            <VStack align="start">
                                {users.map(user => (
                                    <Checkbox
                                        key={user.user_id}
                                        value={user.user_id}
                                        onChange={() => handleUserSelect(user.user_id)}
                                    >
                                        {user.user_name}
                                    </Checkbox>
                                ))}
                            </VStack>
                        </CheckboxGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleCreateGroup} colorScheme="blue">グループ作成</Button>
                        <Button onClick={closeModal} ml={3}>キャンセル</Button>
                    </ModalFooter>
            </Modal>
        </>
    )

}

export default CreateChatGroup;