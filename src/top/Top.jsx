import { Text, Box, Center } from '@yamada-ui/react';
import { useEffect, useState } from 'react';
import Baloon from './component/baloon';
import BaloonTopRight from './component/baloon-topright';
import BaloonTopLeft from './component/baloon-topleft';
import BaloonBottomRight from './component/baloon-bottomright';
import './css/top.css';

const Top = () => {
    const [useData, setUseData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            console.log(token);
            const response = await fetch('http://127.0.0.1:5000/mypage',{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setUseData(data);
            }
        };
        fetchUserData();
    },[]);
    return (
        <>            
        {useData ? (
            <Box className='top'>
                <Box className='gradetion'>
                    <Baloon></Baloon>
                    <Center>
                        <Text className='potcom'>PotCom</Text>
                    </Center>
                    <BaloonTopLeft></BaloonTopLeft>
                    <BaloonTopRight></BaloonTopRight>
                    <BaloonBottomRight></BaloonBottomRight>
                </Box>
                <div className='scrolldown'>
                    <span>
                        scroll
                    </span>
                </div>

                <Box m='0 auto' mt={50}>
                    <Center>
                        <Text fontSize='30px'>皆さん、日頃のストレスや思っていること発散していますか？</Text>
                    </Center>
                </Box>
            </Box>
        ) : (
            <Text>Loading...</Text>
        )}
        </>
    );
};

export default Top;