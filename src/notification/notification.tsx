import { Box, Input, Text } from "@yamada-ui/react";
import React, { useEffect, useState } from "react";

interface NotificationData {
  id: number;
  notification: string;
  create_at: string;
}

const Notification = () => {
  const [notification, setNotification] = useState<NotificationData[]>([]);
  const [selectIds, setSelectIds] = useState<number[]>([]);

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

  // チェックボックスの変更ハンドラー
  const handleCheckboxChange = (id) => {
    setSelectIds(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id) // 解除
          : [...prevSelected, id] // 選択
    );
  };

  // 選択された通知を一括で既読にする
  const markAsRead = () => {
    fetch("/notifications/mark-as-read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ notification_ids: selectIds }),
    })
      .then((res) => res.json())
      .then(() => {
        // UIを更新
        setNotification((prevNotifications) =>
          prevNotifications.map((n) =>
            selectIds.includes(n.id) ? { ...n, is_read: true } : n
          )
        );
        setSelectIds([]); // 選択解除
      });
  };

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
              <Input type="checkbox" ml={10} onChange={() => handleCheckboxChange(noti.id)} checked={selectIds.includes(noti.id)} />
              <Text w={500} fontWeight={"lighter"}>
                {noti.notification}
              </Text>
              <Text w={150} mr={30}>
                {new Date(noti.create_at).toLocaleString()}
              </Text>
            </Box>
            <button onClick={markAsRead} disabled={selectIds.length === 0}>
              選択を既読にする
            </button>
          </Box>
        ))
      ) : (
        <Text>No notifications available</Text>
      )}
    </Box>
  );
};

export default Notification;
