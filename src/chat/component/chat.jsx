import { Box } from "@yamada-ui/react";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");
const Chat = ({ receiver_id, userId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const sendMessage = () => {
    if (receiver_id) {
      socket.emit("send_message", {
        message: message,
        send_user_id: userId,
        receiver_user_id: receiver_id, // 受信者IDも仮（動的に変更可能）
      });
      setMessage("");
    } else {
      alert("チャット相手が選択されていません");
    }
  };

  return (
    <Box ml={300}>
      <h1>ユーザーチャット</h1>
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
