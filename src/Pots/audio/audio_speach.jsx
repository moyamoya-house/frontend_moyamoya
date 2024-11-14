import { useState } from "react";
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

const SpeechText = ({ username }) => {
  const [isListening, setIsListening] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioURL, setAudioURL] = useState(null);
  const [result, setResult] = useState(null);
  const [recordCount, setRecordCount] = useState(1);
  const [isSaved, setIsSaved] = useState(false); // Track save status
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <div>ブラウザが音声認識をサポートしていません。</div>;
  }

  const handleListen = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      mediaRecorder.stop();
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
      // If "戻る" is clicked, close the modal and reset the save status
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
        setIsSaved(true); // Set to true when save is successful
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
        width={100}
        height={100}
        border={"none"}
        borderRadius={100}
        variant={"ghost"}
        cursor={"pointer"}
        fontSize={20}
        backgroundColor={"lightskyblue"}
      >
        音声録音
      </Button>

      <Modal
        isOpen={isOpen}
        background={"white"}
        border="1px solid #000"
        borderRadius={10}
      >
        <CloseButton
          onClick={onClose}
          position="absolute"
          top="10px"
          left="10px"
          width={60}
          height={60}
          borderRadius={100}
          border={"none"}
          onMouseOver={(e) => (e.target.style.color = "darkred")}
          onMouseOut={(e) => (e.target.style.color = "lightcoral")}
        ></CloseButton>
        <ModalOverlay bg="rgba(0,0,0,0.6)"></ModalOverlay>
        <ModalHeader>
          <h1
            style={{
              margin: "0 auto",
            }}
          >
            発散させたいこと
          </h1>
        </ModalHeader>

        <ModalBody width={1200} maxW="80%" height={400}>
          <Box mt={30} display={"flex"} m="0 auto">
            <Box mt={50} ml={100}>
              <button
                onClick={handleListen}
                style={{
                  width: "300px",
                  height: "300px",
                  border: "1px solid #000",
                  borderRadius: "100%",
                }}
              >
                <i
                  className={`fas ${
                    isListening ? "fa-stop" : "fa-play"
                  } play-button-overlay`}
                  style={{ fontSize: "150px" }}
                ></i>
              </button>
              {/* <button onClick={resetTranscript}>リセット</button> */}
            </Box>
            <Box ml={200}>
              <h1>入力結果:</h1>
              <p>{transcript}</p>
              <audio controls src={audioURL || ""} disabled={!audioURL} />

              <div>
                <h3>Analysis Result:</h3>
                <p>Text: {result ? result.classification.text : ""}</p>
                <p>
                  Sentiment:{" "}
                  {result ? result.classification.classification : ""}
                </p>
                <p>Voltage: {result ? result.classification.voltage : ""}</p>
              </div>
            </Box>
          </Box>
          <button
            onClick={handleSave}
            disabled={!audioChunks.length}
            style={{ width: "90%", backgroundColor: "lightskyblue", border: "none" , margin: "10px auto 0 80px", borderRadius: "10px", cursor: "pointer" }}
          >
            {isSaved ? "戻る" : "保存"}
          </button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default SpeechText;
