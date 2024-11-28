import React, { useEffect, useState } from "react";
import { fetchAudioId } from "../hooks/useAudioId";
import { useParams } from "react-router-dom";

interface Audio  {
    id: number;
    audio: string;
    stress_level: number;
    emotion_score: number;
    classification: string;
    user_id: number;
    created_at: string;
}

const AudioDetails = () => {
    const { id } = useParams();
    const [audio, setAudio] = useState<Audio | null>(null);

    useEffect(() => {
        const fetchAudio = async () => {
            try {
                if (id) {
                    const numericId = parseInt(id, 10); // 文字列から数値に変換
                    const data = await fetchAudioId(numericId); // 型エラーが解消される
                    setAudio(data);
                } else {
                    console.error("Invalid id");
                }
            } catch (error) {
                console.error("Error fetching audio:", error);
            }
        };

        fetchAudio();
    }, [id]); 

    return (
        <></>
    )
}

export default AudioDetails;