import { useState } from "react";
import { Box } from "@yamada-ui/react";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confilm, setConfilm] = useState("");
    const redirect = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/password_reset',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, confilm })
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            redirect('/login');
        }
    };

    return (
        <>
            <Box w={1500} maxW="80%" m="0 auto 0 auto">
                <form onSubmit={handlePasswordReset}>
                    <input type="text" placeholder="ユーザーネームを入力" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="パスワードを入力" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="パスワード再入力" value={confilm} onChange={(e) => setConfilm(e.target.value)} />
                    <button>再設定</button>
                </form>
            </Box>
        </>
    )
};

export default PasswordReset;