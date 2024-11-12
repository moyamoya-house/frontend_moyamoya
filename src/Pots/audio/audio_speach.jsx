import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Box } from "@yamada-ui/react";

const SpeechText = ({ username }) => {
  const [isListening, setIsListening] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioURL, setAudioURL] = useState(null);
  const [result, setResult] = useState(null);
  const [recordCount, setRecordCount] = useState(1);

  // 音声認識の状態やテキストを取得
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // ブラウザが音声認識に対応していない場合の処理
  if (!browserSupportsSpeechRecognition) {
    return <div>ブラウザが音声認識をサポートしていません。</div>;
  }

  // 録音の開始/停止を切り替える関数
  const handleListen = () => {
    if (isListening) {
      // 音声認識と録音を停止
      SpeechRecognition.stopListening();
      mediaRecorder.stop();
      setIsListening(false);
    } else {
      // 音声認識と録音を開始
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

  // 録音データをMP3形式でサーバーに送信する関数
  const handleSave = async () => {
    const blob = new Blob(audioChunks, { type: "audio/webm" }); // WebM形式で保存
    setAudioURL(URL.createObjectURL(blob));

    const formData = new FormData();
    const fileName = `${username}${recordCount}.webm`; // ファイル名作成
    formData.append("audio", blob, fileName);
    console.log(fileName);

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
      } else {
        alert("音声の保存に失敗しました");
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };

  return (
    <>
      <Box mt={100}>
        <button
          onClick={handleListen}
          style={{
            width: "100px",
            height: "100px",
            border: "1px solid #000",
            borderRadius: "100%",
          }}
        >
          {/* <i className={`fas ${isListening ? 'fa-circle-stop' : 'fa-circle'} play-button-background`}></i> */}
          <i
            className={`fas ${
              isListening ? "fa-stop" : "fa-play"
            } play-button-overlay`}
          ></i>
        </button>
        <button onClick={resetTranscript}>リセット</button>
        <button onClick={handleSave} disabled={!audioChunks.length}>
          保存
        </button>

        <h1>入力結果:</h1>
        <p>{transcript}</p>
        {audioURL && <audio controls src={audioURL}></audio>}

        {result && (
          <div>
            <h3>Analysis Result:</h3>
            <p>Text: {result.classification.text}</p>
            <p>Sentiment: {result.classification.classification}</p>
            <p>Voltage: {result.classification.voltage}</p>
          </div>
        )}
      </Box>
    </>
  );
};

export default SpeechText;
