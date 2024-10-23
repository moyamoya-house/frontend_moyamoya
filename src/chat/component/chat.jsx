import { Box, Image, Text } from "@yamada-ui/react";
import { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import "./css/chat.css";

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
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("token");

  const socket = io.connect("http://127.0.0.1:5000", {
    transports: ["websocket"],
    query: { token: encodeURIComponent(token) },
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
      socket.emit("send_message", {
        message: message,
        send_user_id: userId,
        receiver_user_id: receiverId,
        group_id: groupId,
      });
      setMessage("");
    } else {
      alert("チャット相手またはグループが選択されていません");
    }
  };

  return (
    <Box ml={300} w={800} h="84vh">
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
          <Text w={300} mt={20} ml={20} h={40}>
            ユーザーまたはグループを選択してください
          </Text>
        </Box>
      )}

      <div>
        <div className="message_chat">
          {messages.map((msg, index) =>
            msg.send_user_id === userId ? (
              <div key={index} className={"message_send"}>
                <em>({msg.timestamp})</em>
                <span className="chatspan">
                  <p className="chatmessage">{msg.message} </p>
                </span>
                <Image
                  src={`http://127.0.0.1:5000/prof_image/${myImage}`} // 自分のプロフィール画像
                  alt="Profile"
                  w={50}
                  h={50}
                  borderRadius={100}
                />
              </div>
            ) : (
              <div key={index} className={"message_receive"}>
                <Image
                  src={`http://127.0.0.1:5000/prof_image/${receiverImage}`} // 相手のプロフィール画像
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
            )
          )}
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
