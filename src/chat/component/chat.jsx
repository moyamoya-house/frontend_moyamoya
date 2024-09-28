import { Box, Image, Text } from "@yamada-ui/react";
import { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import "./css/chat.css";

const Chat = ({ receiverId, userId, receiverName, receiverImage }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("token");

  const socket = io.connect("http://127.0.0.1:5000", {
    transports: ["websocket"],
    query: { token: encodeURIComponent(token) },
  });

  const fetchChatHistory = useCallback(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/chat_send?receiverId=${receiverId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  }, [token,receiverId]);

  useEffect(() => {
    if (receiverId) {
      fetchChatHistory();
    }
  }, [receiverId,fetchChatHistory]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const sendMessage = () => {
    if (receiverId) {
      socket.emit("send_message", {
        message: message,
        send_user_id: userId,
        receiver_user_id: receiverId,
      });
      setMessage("");
    } else {
      alert("チャット相手が選択されていません");
    }
  };

  return (
    <Box ml={300} w={800} h="84vh">
      {receiverId ? (
        <Box display={"flex"} w="100%" h={60} borderBottom="1px solid #000" mb={10}>
          <Image
            src={
              receiverImage
                ? `http://127.0.0.1:5000/prof_image/${receiverImage}`
                : "/not_profileicon.jpg"
            }
            alt="Profile"
            w={50}
            h={50}
            borderRadius={100}
            mt={10}
          />
          <Text w={200} mt={20} ml={20} h={40}>{receiverName}</Text>
        </Box>
      ) : (
        <Box display={"flex"} w="100%" h={60} borderBottom="1px solid #000" mb={10}>
        <Text w={300} mt={20} ml={20} h={40}>ユーザーを選択してください</Text>
      </Box>
      )}
      <div>
        <div className="message_chat">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.send_user_id === userId ? "sent" : "received"
              }`}
            >
              <Image
                src={
                  msg.send_user_id === userId
                    ? `http://127.0.0.1:5000/prof_image/${userId.prof_image}` // 自分のプロフィール画像
                    : `http://127.0.0.1:5000/prof_image/${receiverImage}` // 相手のプロフィール画像
                }
                alt="Profile"
                w={50}
                h={50}
                borderRadius={100}
              />
              <span className="chatspan">
                <p className="chatmessage">{msg.message} </p>
              </span>
              <em>({msg.timestamp})</em>
            </div>
          ))}
        </div>
      </div>

      <Box display={"flex"} bottom={10}>
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
  );
};
export default Chat;
