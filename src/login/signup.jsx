import React,{ useState } from 'react';
import { Box ,Input ,Button, Text, Center, Image, Flex } from '@yamada-ui/react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [profimage, setProfimage] = useState(null);
    const [preview, setPreview] = useState(null);
    const history = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username',username);
        formData.append('password',password);
        formData.append('email',email);
        formData.append('profimage',profimage);

        const response = await fetch('http://127.0.0.1:5000/users',{
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            alert(data+'この内容でいいですか？');
            history("/login");
        }
    };

    // 画像プレビュー
    const handleImagePreview = (e) => {
        const file = e.target.files[0];
        setProfimage(file);
        const render = new FileReader();
        render.onloadend = () => {
            setPreview(render.result);
        };
        if (file) {
            render.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    return (
        <Box w={500} h={500} m="0px auto 20px" border='1px solid #000' mt={120} boxShadow='10px 10px 5px gray'>
        <form onSubmit={handleSignup} encType='multipart/form-data'>
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
            <Flex alignItems="center" m={40} justifyContent="space-between">
                    <Button as="label" htmlFor="file-upload" cursor="pointer" bg="orange" color="white" p={2} borderRadius={5} hover={{ bg: "blue.600" }}>
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
                            <Image src={preview} alt="Profile Preview" boxSize="100px" objectFit="cover" />
                        </Box>
                    )}
                </Flex>
            {/* 送信ボタン */}
            <Center>
                <Button type='submit' w='85%' h={50} m="20px auto" colorScheme="secondary" border='none' bg='lightskyblue' borderRadius={10}>新規登録</Button>
            </Center>
        </form>
        </Box>
    )
};

export default Signup;