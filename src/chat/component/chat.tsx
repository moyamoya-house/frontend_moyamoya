import React, { useState, useEffect, useCallback } from "react";
import { Box, Image, Text, IconButton } from "@yamada-ui/react";
import io from "socket.io-client";
import "./css/chat.css";

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

  return (
    <Box ml={300} w={800} h="78vh">
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
              w={50}
              h={50}
              borderRadius={100}
              mt={10}
            />
          )}
          <Text w={200} mt={20} ml={20} h={40}>
            {receiverName || groupName}
          </Text>
        </Box>
      ) : (
        <Box
          display={"flex"}
          w="100%"
          h={60}
          borderBottom="1px solid #000"
          mb={10}
        >
          <Text w={500} mt={20} ml={20} h={40}>
            ユーザーまたはグループを選択してください
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
                    w={300}
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
                    w={300}
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

      <Box display={"flex"} flexDirection="column" bottom={10}>
        <Box display={"flex"} mb={2}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Box as="span" cursor="pointer" p={2} border="1px dashed gray">
              画像をアップロード
            </Box>
          </label>
        </Box>
        {uploadedImage && (
          <Box position="relative" display="inline-block" mb={2} mt={5}>
            <Image
              src={uploadedImage.data}
              alt="Uploaded"
              width="100px"
              height="100px"
            />
            <IconButton
              onClick={handleImageRemove}
              position="absolute"
              top="5px"
              right="5px"
              size="sm"
              aria-label="Remove image"
            >
              &times;
            </IconButton>
          </Box>
        )}
        <Box display={"flex"}>
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="メッセージを入力"
            className="chat_input"
          />
          <button onClick={sendMessage} className="chat_btn">
            送信
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
