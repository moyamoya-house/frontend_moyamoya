import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  Box,
  Button,
  useDisclosure,
  Modal,
  CloseButton,
  ModalOverlay,
  ModalHeader,
  ModalBody,
} from "@yamada-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import "./css/speach.css";

const SpeechText = ({ username }: { username: string }) => {
  const [isListening, setIsListening] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [recordCount, setRecordCount] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <div>ブラウザが音声認識をサポートしていません。</div>;
  }

  const handleListen = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      mediaRecorder?.stop(); // null チェックを追加
      setIsListening(false);
    } else {
      resetTranscript();
      setAudioChunks([]);
      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);

      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.ondataavailable = (event) => {
          setAudioChunks((prev) => [...prev, event.data]);
        };

        recorder.start();
      });
    }
  };

  const handleSave = async () => {
    if (isSaved) {
      onClose();
      setIsSaved(false);
      return;
    }

    const blob = new Blob(audioChunks, { type: "audio/webm" });
    setAudioURL(URL.createObjectURL(blob));

    const formData = new FormData();
    const fileName = `${username}${recordCount}.webm`;
    formData.append("audio", blob, fileName);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:5000/audio", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        alert("音声が保存されました");
        setRecordCount((prev) => prev + 1);
        setIsSaved(true);
      } else {
        alert("音声の保存に失敗しました");
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        className="speach-button"
      >
        音声録音
      </Button>

      <Modal
        isOpen={isOpen}
        className="speach-modal"
      >
        <CloseButton
          onClick={onClose}
          className="close-button"
          onMouseOver={(e) => {
            (e.target as HTMLElement).style.color = "darkred";
          }}
          onMouseOut={(e) => {
            (e.target as HTMLElement).style.color = "lightcoral";
          }}
        ></CloseButton>
        <ModalOverlay bg="rgba(0,0,0,0.6)"></ModalOverlay>
        <ModalHeader className="modal-header">発散させたいこと</ModalHeader>
        <ModalBody className="modal-body">
          <Box className="speachbox">
            <Box className="box-inner">
              <button
                onClick={handleListen}
                className="record-button"
              >
                <FontAwesomeIcon
                  icon={isListening ? faStop : faPlay}
                  style={{ fontSize: "150px" }}
                />
              </button>
              {/* <button onClick={resetTranscript}>リセット</button> */}
            </Box>
            <Box className="result-box">
              <h1>入力結果:</h1>

              <p>{audioURL ? transcript : ""}</p>
              <div>
                <h3>Analysis Result:</h3>
                <p>Text: {result ? result.classification.text : ""}</p>
                <p>
                  感情:{" "}
                  {result ? result.classification.classification : ""}
                </p>
                <p>解決策: {result ? result.solution : ""}</p>
              </div>
            </Box>
          </Box>
          <button
            onClick={handleSave}
            disabled={!audioChunks.length}
            className="save-button"
          >
            {isSaved ? "戻る" : "保存"}
          </button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default SpeechText;
