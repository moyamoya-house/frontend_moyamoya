import React, { useState } from "react";
import { Box, Text, Input, Center, Button } from "@yamada-ui/react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const hadlelogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <>
            <Box>
                <form onSubmit={hadlelogin}>
                    {/* title */}
                    <Text textAlign='center' fontSize='1.5rem' fontWeight='bold'>login</Text>
                    {/* username */}
                    <Box m='40px'>
                        <Input
                            type="text"
                            placeholder="Usernameを入力"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            w='90%'
                            padding={10}
                            borderRadius={5}
                            maxLength='20'
                        />
                    </Box>
                    {/* パスワード */}
                    <Box>
                        <Input
                            type="password"
                            placeholder="Passwordを入力"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            w='90%'
                            padding={10}
                            borderRadius={5}
                        />
                    </Box>
                    {/* loginbutton */}
                    <Center>
                        <Button type="submit" w='90%' h={50} m='20px auto' colorScheme="secondary" border='none' bg='lightskyblue' borderRadius={10}>ログイン</Button>
                    </Center>
                </form>
            </Box>
        </>
    )
}

export default Login;