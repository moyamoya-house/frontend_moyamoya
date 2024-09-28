import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Box } from '@yamada-ui/react';


const SpeechText = () => {
    const [isListening, setIsListening] = useState(false);

    // 音声認識の状態やテキストを取得
    const { transcript, listening, resetTranscrpt, browserSupportsSpeechRecognition } = useSpeechRecognition();

    // ブラウザが音声認識に対応していない場合の処理
    if (!browserSupportsSpeechRecognition) {
        return <div>ブラウザが音声認識をサポートしていません。</div>;
    }

    // 音声認識の開始/停止を切り替える関数
    const handleListen = () => {
        if (isListening) {
            //停止
            SpeechRecognition.stopListening();
            setIsListening(false);
        } else {
            //開始
            SpeechRecognition.startListening({ continuous: true });
            setIsListening(true);
            console.log(transcript);
            console.log(listening);
        }
    };

    return (
        <>
            <Box>
                <button onClick={handleListen}>
                    {listening? '音声入力開始': '音声入力停止'}
                </button>
                <button onClick={resetTranscrpt}>リセット</button>

                <p>{listening ? '入力中...' : '停止中'}</p>

                <h1>入力結果:</h1>
                <p>{transcript}</p>
            </Box>
        </>
    );
};

export default SpeechText;