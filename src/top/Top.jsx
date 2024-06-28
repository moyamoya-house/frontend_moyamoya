import { Text, Box, Center } from '@yamada-ui/react';
import { useEffect, useState } from 'react';
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

                    <Center>
                        <Text className='potcom'>PotCom</Text>
                    </Center>
                </Box>
                <div className='scrolldown'>
                    <span>
                        scroll
                    </span>
                </div>
            </Box>
        ) : (
            <Text>Loading...</Text>
        )}
        </>
    );
};

export default Top;