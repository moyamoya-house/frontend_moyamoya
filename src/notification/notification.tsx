import { Box, Input, Text } from "@yamada-ui/react";
import React, { useEffect, useState } from "react";

interface NotificationData {
  notification: string;
  create_at: string;
}

const Notification = () => {
  const [notification, setNotification] = useState<NotificationData[]>([]);
  const [selectIds, setSelectIds] = useState([]);

  useEffect(() => {
    const fetchNotificationData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:5000/notification", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotification(data.notification);
      }
    };
    fetchNotificationData();
  }, []);


  return (
    <Box w={1500} maxW="80%" margin="130px auto 0 auto">
      {notification.length > 0 ? (
        notification.map((noti, index) => (
          <Box
            key={index}
            mb={4}
            w={"100%"}
            backgroundColor={"#3f368f00"}
            borderTop={"solid 1px #796de5"}
            borderBottom={"solid 1px #796de5"}
            m={"0 0 30px 0"}
            p={"50px 0 50px 0"}
          >
            <Box
              w={"100%"}
              h={25}
              backgroundColor="#796de500"
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Input type="checkbox" ml={10} />
              <Text w={500} fontWeight={"lighter"}>
                {noti.notification}
              </Text>
              <Text w={150} mr={30}>
                {new Date(noti.create_at).toLocaleString()}
              </Text>
            </Box>
          </Box>
        ))
      ) : (
        <Text>No notifications available</Text>
      )}
    </Box>
  );
};

export default Notification;
