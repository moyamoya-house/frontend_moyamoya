import { useEffect, useState } from "react";
import { Box } from "@yamada-ui/react";
import UserSelect from "./component/user_select";
import Chat from "./component/chat";
import CreateChatGroup from "./component/group";

const ChatAll = () => {
    const [receiverId, setReceiver] = useState(null);
    const [userId, setUser] = useState(null);
    const [myImage, setMyImage] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const [receiverImage, setReceiverImage] = useState("");
    const [users, setUsers] = useState([]);
    const [group, setGroup] = useState([]);
    const [groupId, setGroupId] = useState(null);  // グループIDを管理する状態
    const [groupName, setGroupName] = useState("");  // グループ名を管理する状態

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://127.0.0.1:5000/mypage', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
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
            const response = await fetch('http://127.0.0.1:5000/users', {
                method: 'GET',
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
            const token = localStorage.getItem('token');
            const response = await fetch('http://127.0.0.1:5000/groupchat', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setGroup(data);
            }
        };
        fetchGroupData();
    }, []);

    const handleUserSelect = (id) => {
        const selectedUser = users.find(user => user.id === id);
        if (selectedUser) {
            setReceiver(id);
            setReceiverName(selectedUser.user_name);
            setReceiverImage(selectedUser.prof_image);
            setGroupId(null);  // グループ選択をリセット
            setGroupName("");
        }
    };

    const handleGroupSelect = (id) => {
        const selectedGroup = group.find(group => group.group_id === id);
        if (selectedGroup) {
            setGroupId(id);
            setGroupName(selectedGroup.group_name);
            setReceiver(null);  // ユーザー選択をリセット
            setReceiverName("");
            setReceiverImage("");
        }
    };

    return (
        <>
            <Box w={1000} h="84vh" m={"100px auto 0 auto"}>
                <UserSelect 
                    users={users} 
                    onSelectUser={handleUserSelect} 
                    group={group} 
                    onSelectGroup={handleGroupSelect} 
                />
                <Chat 
                    receiverId={receiverId} 
                    userId={userId} 
                    receiverName={receiverName} 
                    receiverImage={receiverImage} 
                    myImage={myImage} 
                    groupId={groupId}        // グループIDを渡す
                    groupName={groupName}    // グループ名を渡す
                />
                <CreateChatGroup users={users} />
            </Box>
        </>
    )
}

export default ChatAll;
