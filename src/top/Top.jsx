import { Text, Image } from '@yamada-ui/react';
import { useEffect, useState } from 'react';

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
            <>
                <Text>Hello {useData.username}</Text>
                <Image src={useData.profimage}></Image>
            </>
        ) : (
            <Text>Loading...</Text>
        )}
        </>
    );
};

export default Top;