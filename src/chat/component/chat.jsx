import { Box, Image } from "@yamada-ui/react";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const Chat = ({ receiverId, userId, receiverName, receiverImage }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('token'); 

  const socket = io.connect("http://127.0.0.1:5000", {
    auth: {
      token: token, // トークンをSocket.IOのリクエストに含める
    }
  });

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
    <Box ml={300}>
      <h1>ユーザーチャット</h1>
      {receiverId && (
        <Box mb={4}>
          <h2>チャット相手</h2>
          <Image src={receiverImage ? `http://127.0.0.1:5000/prof_image/${receiverImage}` : '/not_profileicon.jpg'} alt="Profile" />
          <h3>{receiverName}</h3>
        </Box>
      )}
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.message}{" "}
            <em>({msg.chat_at})</em>
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="メッセージを入力"
      />

      <button onClick={sendMessage}>メッセージ送信</button>
    </Box>
  );
};
export default Chat;
