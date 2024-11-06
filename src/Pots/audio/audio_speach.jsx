import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Box } from '@yamada-ui/react';

const SpeechText = () => {
    const [isListening, setIsListening] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audioURL, setAudioURL] = useState(null);

    // 音声認識の状態やテキストを取得
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

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
            SpeechRecognition.startListening({ continuous: true });
            setIsListening(true);

            navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);

                recorder.ondataavailable = event => {
                    setAudioChunks(prev => [...prev, event.data]);
                };

                recorder.start();
            });
        }
    };

    // 録音データをMP3形式でサーバーに送信する関数
    const handleSave = async () => {
        const blob = new Blob(audioChunks, { type: 'audio/mp3' });
        setAudioURL(URL.createObjectURL(blob));

        const formData = new FormData();
        formData.append('audio', blob, 'audio.mp3'); // MP3ファイルとして送信

        try {
            const response = await fetch('http://127.0.0.1:5000/audio', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('音声が保存されました');
            } else {
                alert('音声の保存に失敗しました');
            }
        } catch (error) {
            console.error('エラーが発生しました', error);
        }
    };

    return (
        <>
            <Box mt={300}>
                <button onClick={handleListen}>
                    {listening ? '音声入力停止' : '音声入力開始'}
                </button>
                <button onClick={resetTranscript}>リセット</button>
                <button onClick={handleSave} disabled={!audioChunks.length}>保存</button>

                <p>{listening ? '入力中...' : '停止中'}</p>

                <h1>入力結果:</h1>
                <p>{transcript}</p>
                {audioURL && (
                    <audio controls src={audioURL}></audio>
                )}
            </Box>
        </>
    );
};

export default SpeechText;
