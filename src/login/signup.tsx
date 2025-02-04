import React,{ useState } from 'react';
import { Box ,Input ,Button, Text, Center, Image, Flex } from '@yamada-ui/react';
import { useNavigate } from 'react-router-dom';
import "./css/signup.css";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [profimage, setProfimage] = useState<File | undefined>(undefined);
    const [preview, setPreview] = useState<string | null>(null);
    const history = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username',username);
        formData.append('password',password);
        formData.append('email',email);

        if (profimage) {
            formData.append('profimage',profimage);
        }

        const response = await fetch('http://127.0.0.1:5000/users',{
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            alert(data[0]+'この内容でいいですか？');
            history("/login");
        }
    };

    // 画像プレビュー
    const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setProfimage(file || undefined);
    
        const render = new FileReader();
        render.onloadend = () => {
            if (typeof render.result === 'string') {
                setPreview(render.result);
            }
        };
    
        if (file) {
            render.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    return (
        <Box className="signup">
        <form onSubmit={handleSignup} encType='multipart/form-data'>
            {/* タイトル */}
            <Text className='signuptitle'>signup</Text>
            {/* username */}
            <Box className='usernamebox'>
            <Input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='signupinput'
                maxLength={20}
            />
            </Box>
            {/* パスワード */}
            <Box className='usernamebox'>
            <Input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='signupinput'
            />
            </Box>
            {/* Eメール */}
            <Box className='usernamebox'>
            <Input
                type='email'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='signupinput'
            />
            </Box>
            {/* 画像 */}
            <Flex alignItems="center" m={40} justifyContent="space-between">
                    <Button as="label" htmlFor="file-upload" className='imgbtn'>
                        プロフ画像をアップロード
                    </Button>
                    <Input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImagePreview}
                        display="none"
                    />
                    {preview && (
                        <Box ml={4}>
                            <Image src={preview} alt="Profile Preview" className='preview' />
                        </Box>
                    )}
                </Flex>
            {/* 送信ボタン */}
            <Center>
                <Button type='submit' className='signupbutton'>新規登録</Button>
            </Center>
        </form>
        </Box>
    )
};

export default Signup;