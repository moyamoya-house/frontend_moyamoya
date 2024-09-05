import { useEffect, useState } from "react";
import { Box } from "@yamada-ui/react";
import UserSelect from "./component/user_select";
import Chat from "./component/chat";

const ChatAll = () => {
    const [receiverId, setReceiver] = useState(null);
    const [userId, setUser] = useState(null);

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
        setReceiver(id);
      };

    return (
        <>
            <Box>
                <UserSelect users={users} onSelectUser={handleUserSelect}></UserSelect>
                <Chat receiver_id={receiverId} userId={userId}></Chat>
            </Box>
        </>
    )

}
export default ChatAll;