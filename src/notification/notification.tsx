import { Box, Input, Text, Button } from "@yamada-ui/react";
import React, { useEffect, useState } from "react";
import "./css/notification.css";

interface NotificationData {
  id: number;
  notification: string;
  create_at: string;
  is_read: boolean;
}

const Notification = () => {
  const [notification, setNotification] = useState<NotificationData[]>([]);
  const [selectIds, setSelectIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 10;

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

  const handleCheckboxChange = (id: number) => {
    setSelectIds(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id)
          : [...prevSelected, id]
    );
  };

  const markAsRead = () => {
    fetch("http://127.0.0.1:5000/notifications/mark-as-read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ notification_ids: selectIds }),
    })
      .then((res) => res.json())
      .then(() => {
        setNotification((prevNotifications) =>
          prevNotifications.map((n) =>
            selectIds.includes(n.id) ? { ...n, is_read: true } : n
          )
        );
        setSelectIds([]);
      });
  };

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notification.slice(indexOfFirstNotification, indexOfLastNotification);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Box className="notification-container">
        {currentNotifications.length > 0 ? (
          currentNotifications.map((noti, index) => (
            <Box key={index} className="notification-box">
              <Box className="notification-header">
                <Input
                  type="checkbox"
                  ml={10}
                  onChange={() => handleCheckboxChange(noti.id)}
                  checked={selectIds.includes(noti.id)}
                  disabled={noti.is_read}
                  style={{
                    cursor: noti.is_read ? "not-allowed" : "pointer",
                    opacity: noti.is_read ? 0.5 : 1,
                  }}
                />
                <Text className="notification-text">{noti.notification}</Text>
                <Text className="notification-date">
                  {new Date(noti.create_at).toLocaleString()}
                </Text>
              </Box>
              <button onClick={markAsRead} disabled={selectIds.length === 0}>
                既読
              </button>
            </Box>
          ))
        ) : (
          <Text>No notifications available</Text>
        )}
      </Box>
      <Box className="pagination">
        {Array.from({ length: Math.ceil(notification.length / notificationsPerPage) }, (_, i) => (
          <Button key={i} onClick={() => paginate(i + 1)} disabled={currentPage === i + 1}>
            {i + 1}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default Notification;
