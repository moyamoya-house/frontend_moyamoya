import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from '@yamada-ui/react';
import './css/profedit.css';

const ProfEdit = ({ useData }) => {
    const [username, setUsername] = useState(useData.name);
    const [password, setPassword] = useState(useData.password);
    const [email, setEmail] = useState(useData.email);
    const [comment, setComment] = useState(useData.prof_comment);
    const [secondImage, setSecondImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const history = useNavigate();

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name',username);
        formData.append('password', password);
        formData.append('comment', comment);
        formData.append('email',email);
        if (preview) formData.append('profimage',preview);
        if (secondImage) formData.append('secondimage',secondImage);

        const response = await fetch(`http://127.0.0.1:5000/users/${useData.id}`,{
            method: 'PUT',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            history('/mypage');
            console.log(data[0]);
            alert('user Edit successfully');
        } else {
            alert('Failed to update profile');
        }
    }

    const handlesecondimage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSecondImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
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
                    id="imageInput"
                    onChange={handlesecondimage}
                />
                <label htmlFor="imageInput">
                    <div
                    style={{
                        width: "100%",
                        height: "180px",
                        border: "2px dashed #000",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundImage: secondImage ? `url(${secondImage})` : "none"
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
                        width: "150px",
                        height: "150px",
                        border: "2px solid #000",
                        borderRadius: "100%",
                        display: "flex",
                        margin: "60px 0 0 100px",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundImage: preview ? `url(${preview})` : "none"
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
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="comment">
                        <label>Comment:</label>
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                    </div>
                    <div className="password">
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <button type="submit" className="btn">ユーザー情報の更新</button>
            </form>
        </>
    )
}
export default ProfEdit;