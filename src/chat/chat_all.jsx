import { useEffect, useState } from "react";
import { Box } from "@yamada-ui/react";
import UserSelect from "./component/user_select";
import Chat from "./component/chat";

const ChatAll = () => {
    const [receiverId, setReceiver] = useState(null);
    const [userId, setUser] = useState(null);
    const [receiverName, setReceiverName] = useState("");
    const [receiverImage, setReceiverImage] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://127.0.0.1:5000/mypage',{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchUsersData = async () => {
            const response = await fetch('http://127.0.0.1:5000/users',{
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        };
        fetchUsersData();
    }, []);

    const handleUserSelect = (id) => {
        const selectedUser = users.find(user => user.id === id);
        if (selectedUser) {
            setReceiver(id);
            setReceiverName(selectedUser.user_name);
            setReceiverImage(selectedUser.prof_image);
        }
    };

    return (
        <>
            <Box w={1000} h="84vh" m={"100px auto 0 auto"}>
                <UserSelect users={users} onSelectUser={handleUserSelect}></UserSelect>
                <Chat receiverId={receiverId} userId={userId} receiverName={receiverName} receiverImage={receiverImage}></Chat>
            </Box>
        </>
    )
}
export default ChatAll;
