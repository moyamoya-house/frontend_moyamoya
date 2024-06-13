import React,{ useState } from 'react';
import { Input ,Button } from '@yamada-ui/react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [profimage, setProfimage] = useState('');

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
    };

    return (
        <form onSubmit={handleSignup}>
            <h2>signup</h2>
            <Input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Input
                type='email'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type='file'
                placeholder='profimage'
                value={profimage}
                onChange={(e) => setProfimage(e.target.value)}
            />
            <Button w='10%' m="20px auto" colorScheme="secondary">sign up</Button>
            <Button m="20px" colorScheme="primary" variant="solid" bg='blue'>
    Outline
  </Button>
        </form>
    )
};

export default Signup;