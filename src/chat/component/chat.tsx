import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Image,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalCloseButton,
} from "@yamada-ui/react";
import io from "socket.io-client";
import "./css/chat.css";
import VideoCall from "./call_video.tsx";

interface Message {
  message: string;
  send_user_id: number;
  receiver_user_id?: number;
  group_id?: number;
  timestamp: string;
  profile_image?: string;
  image?: string;
}

const Chat = ({
  receiverId,
  userId,
  receiverName,
  receiverImage,
  myImage,
  groupId,
  groupName,
  groupImage,
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [uploadedImage, setUploadedImage] = useState<{
    filename: string;
    data: string;
  } | null>(null);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const token = localStorage.getItem("token");

  const socket = io("http://127.0.0.1:5000", {
    transports: ["websocket"],
    query: { token: encodeURIComponent(token || "") },
  });

  const fetchChatHistory = useCallback(async () => {
    try {
      let url = "";

      // グループチャットか個人チャットかを判定
      if (groupId) {
        url = `http://127.0.0.1:5000/chat_send_group?group_id=${groupId}`;
      } else if (receiverId) {
        url = `http://127.0.0.1:5000/chat_send?receiverId=${receiverId}`;
      }

      if (!url) {
        console.error("receiverId または groupId が必要です");
        return;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  }, [token, receiverId, groupId]);

  useEffect(() => {
    if (receiverId) {
      fetchChatHistory();
    }
  }, [receiverId, fetchChatHistory]);

  useEffect(() => {
    if (groupId) {
      fetchChatHistory();
    }
  }, [groupId, fetchChatHistory]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const sendMessage = () => {
    if (groupId || receiverId) {
      const messageData = {
        message: message,
        send_user_id: userId,
        receiver_user_id: receiverId,
        group_id: groupId,
        image: uploadedImage,
      };

      socket.emit("send_message", messageData);
      setMessage("");
      setUploadedImage(null); // 送信後に画像をリセット
    } else {
      alert("チャット相手またはグループが選択されていません");
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUploadedImage({ filename: file.name, data: reader.result as string });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
  };

  const startVideoCall = () => {
    setIsVideoCallOpen(true);
  };

  const closeVideoCall = () => {
    setIsVideoCallOpen(false);
  };

  return (
    <Box className="chat">
      {receiverId || groupId ? (
        <Box
          display={"flex"}
          w="100%"
          h={60}
          borderBottom="1px solid #000"
          mb={10}
        >
          {/* グループチャットか個人チャットかを判定して画像を表示 */}
          {groupId ? (
            <Image
              src={
                groupImage
                  ? `http://127.0.0.1:5000/group_image/${groupImage}`
                  : "/not_profileicon.jpg" // グループ画像がない場合のデフォルト
              }
              alt="Group Profile"
              w={50}
              h={50}
              borderRadius={100}
              mt={10}
            />
          ) : (
            <Image
              src={
                receiverImage // 個人チャットで相手の画像を使う場合
                  ? `http://127.0.0.1:5000/prof_image/${receiverImage}`
                  : "/not_profileicon.jpg" // プロフィール画像がない場合のデフォルト
              }
              alt="User Profile"
              className="user-prof"
            />
          )}
          <Text className="user-name">
            {receiverName || groupName}
          </Text>

          {/* ビデオ通話アイコン */}
          <IconButton
            aria-label="ビデオ通話を開始"
            icon={<i className="fas fa-video"></i>}
            size="md"
            colorScheme="teal"
            onClick={startVideoCall}
            className="video-call"
          />
        </Box>
      ) : (
        <Box
          display={"flex"}
          w="100%"
          h={60}
          borderBottom="1px solid #000"
          mb={10}
        >
          <Text className="user-text">
            ユーザーまたはグループを選択
          </Text>
        </Box>
      )}

      <div>
        <div className="message_chat">
          {messages.map((msg, index) =>
            msg.send_user_id === userId ? (
              <div key={index} className={"message_send"}>
                <em style={{ fontSize: "12px", marginTop: "15px" }}>
                  ({msg.timestamp})
                </em>
                {msg.message ? (
                  <span className="chatspan">
                    <p className="chatmessage">{msg.message} </p>
                  </span>
                ) : (
                  <Image
                    src={`http://127.0.0.1:5000/chat_image/${msg.image}`}
                    className="chatimage"
                  />
                )}
                <Image
                  src={
                    myImage
                      ? `http://127.0.0.1:5000/prof_image/${myImage}`
                      : "/not_profileicon.jpg"
                  } // 自分のプロフィール画像
                  alt="Profile"
                  w={50}
                  h={50}
                  borderRadius={100}
                />
              </div>
            ) : (
              <div key={index} className={"message_receive"}>
                {/* グループチャットの場合は送信者の画像を表示 */}
                <Image
                  src={
                    msg.profile_image || receiverImage
                      ? `http://127.0.0.1:5000/prof_image/${
                          msg.profile_image || receiverImage // 個人チャットでは receiverImage を使用
                        }`
                      : "/not_profileicon.jpg"
                  }
                  alt="Profile"
                  w={50}
                  h={50}
                  borderRadius={100}
                />
                {msg.message ? (
                  <span className="chatspan">
                    <p className="chatmessage">{msg.message} </p>
                  </span>
                ) : (
                  <Image
                    src={`http://127.0.0.1:5000/chat_image/${msg.image}`}
                    className="chatimage"
                  />
                )}
                <em style={{ fontSize: "12px", marginTop: "15px" }}>
                  ({msg.timestamp})
                </em>
              </div>
            )
          )}
        </div>
      </div>

      <Box display="flex" flexDirection="column" alignItems="center" p={4}>
        {/* 画像アップロード */}
        <Box display="flex" alignItems="center" mb={4}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <IconButton
              aria-label="画像をアップロード"
              icon={<i className="fas fa-upload"></i>}
              size="lg"
              variant="outline"
              colorScheme="blue"
              as="span"
              cursor="pointer"
              display={"none"}
            />
          </label>
        </Box>

        {/* アップロード済み画像のプレビュー */}
        {uploadedImage && (
          <Box position="relative" display="inline-block" mb={4}>
            <Image
              src={uploadedImage.data}
              alt="Uploaded"
              boxSize="120px"
              borderRadius="md"
              shadow="md"
            />
            <IconButton
              onClick={handleImageRemove}
              position="absolute"
              top="-10px"
              right="-10px"
              size="sm"
              colorScheme="red"
              aria-label="Remove image"
              icon={<>&times;</>}
            />
          </Box>
        )}

        {/* メッセージ入力と送信 */}
        <Box display="flex" alignItems="center" w="100%" maxW="600px">
          <Box flex="1" mr={2} position="relative">
            <input
              type="text"
              placeholder="メッセージを入力"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="chat_input"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #ddd",
                borderRadius: "24px",
                fontSize: "16px",
                outline: "none",
                backgroundColor: "#f9f9f9",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(0, 123, 255, 0.5)")
              }
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
            <label
              htmlFor="image-upload"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <IconButton
                aria-label="画像をアップロード"
                icon={<i className="fas fa-upload"></i>}
                size="sm"
                variant="ghost"
                colorScheme="blue"
                as="span"
                cursor="pointer"
              />
            </label>
          </Box>
          <button
            onClick={sendMessage}
            className="chat_btn"
            style={{
              minWidth: "80px",
              padding: "10px 16px",
              fontSize: "16px",
              borderRadius: "24px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s",
              marginLeft: "35px",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007BFF")
            }
          >
            送信
          </button>
        </Box>
      </Box>

      {/* ビデオ通話モーダル */}
      <Modal isOpen={isVideoCallOpen} onClose={closeVideoCall} size="full">
        <ModalOverlay />
        <ModalCloseButton />
        <VideoCall userId={userId} groupId={groupId} />
      </Modal>
    </Box>
  );
};

export default Chat;
