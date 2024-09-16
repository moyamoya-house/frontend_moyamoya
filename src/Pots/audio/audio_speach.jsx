import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const SpeechText = () => {
    const [isListening, setIsListening] = useState(false);

    // 音声認識の状態やテキストを取得
    const { transcript, listening, resetTranscrpt, browserSupportsSpeechRecognition } = useSpeechRecognition();

    // ブラウザが音声認識に対応していない場合の処理
    if (!browserSupportsSpeechRecognition) {
        return <div>ブラウザが音声認識をサポートしていません。</div>;
    }

    // 
}