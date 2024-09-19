import { Box, Image } from "@yamada-ui/react";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import './css/chat.css';

const Chat = ({ receiverId, userId, receiverName, receiverImage }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('token'); 

  const socket = io.connect("http://127.0.0.1:5000", {
    transports: ['websocket'],
    query: { token: encodeURIComponent(token) }
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
    <Box ml={300} w={800} height="100%">
      {receiverId && (
        <Box display={"flex"} w="100%" h={60} backgroundColor={"gray"}>
          <Image src={receiverImage ? `http://127.0.0.1:5000/prof_image/${receiverImage}` : '/not_profileicon.jpg'} alt="Profile" w={50} h={50} borderRadius={100} mt={10} />
          <h3 mt={110}>{receiverName}</h3>
        </Box>
      )}
      <div>
      {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.send_user_id === userId ? 'sent' : 'received'}`}
          >

            <strong>{msg.sender}:</strong> {msg.message}{" "}
            <em>({msg.chat_at})</em>
          </div>
        ))}
      </div>

      <Box display={"flex"} bottom={110} position={"fixed"}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="メッセージを入力"
          className="chat_input"
        />

        <button onClick={sendMessage} className="chat_btn">送信</button>
      </Box>
    </Box>
  );
};
export default Chat;
