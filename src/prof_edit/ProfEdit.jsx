import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from '@yamada-ui/react';

const ProfEdit = ({ useData }) => {
    const [username, setUsername] = useState(useData.name);
    const [password, setPassword] = useState(useData.password);
    const [email, setEmail] = useState(useData.email);
    const [comment, setComment] = useState(useData.prof_comment);
    const [profImage, setProfimage] = useState(null);
    const [secondImage, setSecondImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [secondpreview, setSecondPreview] = useState(null);
    const history = useNavigate();

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name',username);
        formData.append('password', password);
        formData.append('comment', comment);
        formData.append('email',email);
        if (profImage) formData.append('profimage',profImage);
        if (secondImage) formData.append('secondimage',secondImage);

        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:5000/users/${useData.id}`,{
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
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

    return (
        <>
            <form onSubmit={handleEditSubmit}>
                <Box>
                    <label>ユーザーネーム：{useData.name}</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Box>
                <div>
                    <label>Email:{useData.email}</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Comment:{useData.prof_comment}</label>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Profile Image:</label>
                    <input type="file" onChange={(e) => setProfimage(e.target.files[0])} />
                </div>
                <div>
                    <label>Second Image:</label>
                    <input type="file" onChange={(e) => setSecondImage(e.target.files[0])} />
                </div>
                <button type="submit">ユーザー情報の更新</button>
            </form>
        </>
    )
}
export default ProfEdit;