import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@yamada-ui/react";
import { User } from "./ProfEditPage.tsx";
import "./css/profedit.css";

interface ProfEditProps {
    useData: User;
}

const ProfEdit: React.FC<ProfEditProps> = ({ useData }) => {
    const [username, setUsername] = useState(useData.name);
    const [email, setEmail] = useState(useData.email);
    const [comment, setComment] = useState(useData.prof_comment);
    const [secondImage, setSecondImage] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const history = useNavigate();

    // コンポーネント初期レンダリング時に画像データを取得
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/users/${useData.id}`);
                if (response.ok) {
                    const data = await response.json();
                    // プロフィール画像と背景画像がDBにあれば設定
                    if (data.profimage) setPreview(data.profimage);
                    if (data.secondimage) setSecondImage(data.secondimage);
                } else {
                    console.error("Failed to fetch images");
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, [useData.id]);

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", username);
        formData.append("comment", comment);
        formData.append("email", email);

        // プロフィール画像を追加
        const profImageInput = document.querySelector<HTMLInputElement>("#imageInput");
        if (profImageInput?.files?.[0]) {
            formData.append("profimage", profImageInput.files[0]);
        }

        // 背景画像を追加
        const secondImageInput = document.querySelector<HTMLInputElement>("#secondimageInput");
        if (secondImageInput?.files?.[0]) {
            formData.append("secondimage", secondImageInput.files[0]);
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/users/${useData.id}`, {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                history("/mypage");
                console.log(data);
                alert("User edited successfully");
            } else {
                const error = await response.json();
                console.error("Error:", error);
                alert("Failed to update profile");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("An error occurred while updating the profile");
        }
    };

    const handlesecondimage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSecondImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <form onSubmit={handleEditSubmit} className="proform">
                <h1>プロフィール編集</h1>
                <div>
                    <input
                        type="file"
                        style={{ display: "none" }}
                        id="secondimageInput"
                        onChange={handlesecondimage}
                    />
                    <label htmlFor="secondimageInput">
                        <div
                            style={{
                                backgroundImage: secondImage ? `url(${secondImage})` : "none",
                            }}
                        >
                            {secondImage ? "" : "背景画像を選択"}
                        </div>
                    </label>
                </div>
                <div>
                    <input
                        type="file"
                        style={{ display: "none" }}
                        id="imageInput"
                        onChange={handleProfImage}
                    />
                    <label htmlFor="imageInput" className="label">
                        <div
                            style={{
                                backgroundImage: preview ? `url(${preview})` : "none",
                            }}
                        >
                            {preview ? "" : "アイコン画像を選択"}
                        </div>
                    </label>
                </div>
                <div className="editbox">
                    <Box className="username">
                        <label>ユーザーネーム：</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Box>
                    <div className="email">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="emailinput" />
                    </div>
                    <div className="comment">
                        <label>Comment:</label>
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="commentinput" />
                    </div>
                </div>
                <button type="submit" className="btn">ユーザー情報の更新</button>
            </form>
        </>
    );
};

export default ProfEdit;
