import React, { useEffect, useState } from "react";
import { Box,Image } from "@yamada-ui/react";
import './css/mypage.css'

const Mypage  = () => {
    const [useData, setUseData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://127.0.0.1:5000/mypage',{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUseData(data);
            }
        };
        fetchUserData();
    }, []);
    return (
        <>
        {useData ? (
            <Box w={1500} maxWidth='80%' m='0 auto' mt={100}>
                <Box h={300} border='1px solid #000'>
                    {/* <Image src={`http://127.0.0.1:5000/second_image/${useData.second_image}`} alt="big image"/> */}
                    <Image src="sample01.jpg" alt="sample" width='100%' h='auto' />
                </Box>
                <Box>
                    <Image w={150} h={150} mt={-80} ml={100} borderRadius={100} src={`http://127.0.0.1:5000/prof_image/${useData.prof_image}`} alt="prof image"/>
                </Box>
                <h1 className="title">{useData.name}</h1>
            </Box>
        ) : (
            <Box>
                loading
            </Box>
        )}
        </>
    );
}

export default Mypage;