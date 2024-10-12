import { Box, Text } from "@yamada-ui/react";
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
                setNotification(data.notification);
            }
        };
        fetchNotificationData();
    },[]);
    return (
        <Box mt={120}>
            {notification.length > 0 ? (
                notification.map((noti, index) => (
                    <Box key={index} mb={4}>
                        <Text>Notification: {noti.notification}</Text>
                        <Text>Date: {new Date(noti.create_at).toLocaleString()}</Text>
                    </Box>
                ))
            ) : (
                <Text>No notifications available</Text>
            )}
        </Box>
    )
}

export default Notification;
