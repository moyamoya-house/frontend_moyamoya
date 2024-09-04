import { useState, useEffect } from "react";
import io from 'socket.io-client';


const Chat = ({receiver_id}) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userData, setUserData] = useState(null);

    const socket = io.connect('http://localhost:5000');

    useEffect(() => {
        socket.on('receive_message', (data) => {
          setMessages((prevMessages) => [...prevMessages, data]);
        });
      }, []);
    
      const sendMessage = () => {
        socket.emit('send_message', {
          message: message,
          send_user_id: ,
          receiver_user_id: 2  // 受信者IDも仮（動的に変更可能）
        });
        setMessage("");
      };
}
export default Chat;
