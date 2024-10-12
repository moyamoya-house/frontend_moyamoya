import { Box } from "@yamada-ui/react";
import { useEffect, useState } from "react";


const Notification = () => {
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        const fetchNotificationData = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://127.0.0.1:5000/notification',{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setNotification(data);
            }
        };
        fetchNotificationData();
    },[]);
    return (
        <Box>
            {notification}
        </Box>
    )
}

export default Notification