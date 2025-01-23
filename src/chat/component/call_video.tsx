import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
//import SimplePeer from "simple-peer";

interface VideoCallProps {
  userId: number;
  groupId?: number;
}

const VideoCall: React.FC<VideoCallProps> = ({
  userId,
  groupId,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const token = localStorage.getItem("token");

  const socket = io("http://127.0.0.1:5000", {
    transports: ["websocket"],
    query: { token: encodeURIComponent(token || "") },
  });

  useEffect(() => {
    // 自分のカメラ映像を取得
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // 通話開始イベントを送信
        socket.emit("start_call", { caller_id: userId, group_id: groupId, session_type: "personal" });

        // サーバーから通話開始の通知を受信
        socket.on("call_started", (data) => {
          console.log("Call started:", data);
          setSessionId(data.session_id); // サーバーから受け取った session_id を保存
        });

        // 他の参加者のリストを受信
        socket.on("participants_update", (data: string[]) => {
          setParticipants(data);
        });
      })
      .catch((err) => console.error("Error accessing media devices:", err));

    return () => {
      socket.emit("end_call", { session_id: sessionId, caller_id: userId });
    };
  }, [socket, sessionId, userId, groupId]);

  useEffect(() => {
    if (streamRef.current) {
      // カメラのオン/オフ設定
      console.log(`Camera is ${isCameraOff ? 'off' : 'on'}`);
      streamRef.current.getVideoTracks().forEach((track) => {
        console.log(`Track ${track.id} enabled: ${!isCameraOff}`);
        track.enabled = !isCameraOff;
      });
  
      // 動作確認用のデバッグメッセージ
      streamRef.current.getVideoTracks().forEach((track) => {
        console.log(`After toggle - Track ${track.id} enabled: ${track.enabled}`);
      });
  
      // Reassign the video stream to ensure it's using the updated state
      if (videoRef.current && videoRef.current.srcObject !== streamRef.current) {
        videoRef.current.srcObject = streamRef.current;
      }
    }
  }, [isCameraOff]);
  
  useEffect(() => {
    if (streamRef.current) {
      // 音声のミュート設定
      console.log(`Audio is ${isMuted ? 'muted' : 'unmuted'}`);
      streamRef.current.getAudioTracks().forEach((track) => {
        console.log(`Track ${track.id} enabled: ${!isMuted}`);
        track.enabled = !isMuted;
      });
    }
  }, [isMuted]);
  
  
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };
  
  const toggleCamera = () => {
    setIsCameraOff((prev) => !prev);
  };
  

  const endCall = () => {
    socket.emit("end_call", { session_id: sessionId, caller_id: userId });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#2c2f33",
        color: "#fff",
        padding: "20px",
      }}
    >
      {/* メインビデオ表示 */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "10px",
          width: "100%",
        }}
      >
        {/* 自分のビデオ */}
        <div
          style={{
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#23272a",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <span
            style={{
              position: "absolute",
              bottom: "10px",
              left: "10px",
              background: "rgba(0, 0, 0, 0.6)",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            You
          </span>
        </div>

        {/* 他の参加者のビデオ（仮にダミーデータを使用） */}
        {participants.map((participant, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "#23272a",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <p>{participant}</p>
          </div>
        ))}
      </div>

      {/* 操作ボタン */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {/* マイクミュートボタン */}
        <button
          onClick={toggleMute}
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: isMuted ? "#f04747" : "#7289da",
            border: "none",
            borderRadius: "50%",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i
            className={
              isMuted ? "fas fa-microphone-slash" : "fas fa-microphone"
            }
          ></i>
        </button>

        {/* カメラオフボタン */}
        <button
          onClick={toggleCamera}
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: isCameraOff ? "#f04747" : "#7289da",
            border: "none",
            borderRadius: "50%",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i
            className={isCameraOff ? "fas fa-video-slash" : "fas fa-video"}
          ></i>
        </button>

        {/* 通話終了ボタン */}
        <button
          onClick={endCall}
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#f04747",
            border: "none",
            borderRadius: "50%",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i className="fas fa-phone-slash"></i>
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
