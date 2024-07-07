import React, { useEffect, useState } from "react";
import { Box,Image } from "@yamada-ui/react";

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
            <Box>
                <Image src={`http://127.0.0.1:5000/second_image/${useData.second_image}`} alt="big image"/>
            </Box>
            <Box>
                <Image src={`http://127.0.0.1:5000/prof_image/${useData.prof_image}`} alt="prof image"/>
            </Box>
        </>
    );
}

export default Mypage;