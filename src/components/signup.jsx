import React,{ useState } from 'react';
import { Box ,Input ,Button, Text, Center } from '@yamada-ui/react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [profimage, setProfimage] = useState('');
    const history = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username,password,email,profimage })
        });
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            history("/login");
        }
    };

    return (
        <Box w={500} h={500} m="0 auto" border='1px solid #000' mt={50} boxShadow='10px 10px 5px gray'>
        <form onSubmit={handleSignup}>
            {/* タイトル */}
            <Text textAlign="center" fontSize='1.5rem' fontWeight='bold'>signup</Text>
            {/* username */}
            <Box m='40px'>
            <Input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                w='90%'
                padding={10}
                borderRadius={5}
                maxLength={20}
            />
            </Box>
            {/* パスワード */}
            <Box m={40}>
            <Input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                w='90%'
                padding={10}
                borderRadius={5}
            />
            </Box>
            {/* Eメール */}
            <Box m={40}>
            <Input
                type='email'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                w='90%'
                padding={10}
                borderRadius={5}
            />
            </Box>
            {/* 画像 */}
            <Box m={40}>
            <Input
                type='file'
                placeholder='profimage'
                value={profimage}
                onChange={(e) => setProfimage(e.target.value)}
            />
            </Box>
            {/* 送信ボタン */}
            <Center>
                <Button type='submit' w='90%' h={50} m="20px auto" colorScheme="secondary" border='none' bg='lightskyblue' borderRadius={10}>新規登録</Button>
            </Center>
        </form>
        </Box>
    )
};

export default Signup;