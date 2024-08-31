import React, { useEffect, useState } from "react";
import { Box,Image, Link, Tabs, Text, Tab, TabPanels, TabPanel } from "@yamada-ui/react";
import './css/mypage.css'
import Follow from "../follow/follow";
import UserPost from "./component/user_post";
import BookmarkPost from "./component/bookmark_post";

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
            <Box w={1500} maxWidth='80%' m='0 auto' mt={100} overflow={"hidden"}>
                <Box h={300} border='1px solid #000'>
                    <Image src={`http://127.0.0.1:5000/second_image/${useData.second_image}`} alt="big image"  width='100%' height='100%' objectFit={"cover"}/>
                </Box>
                <Box position="relative" display="flex" >
                <Box 
                    w={160} 
                    h={160} 
                    borderRadius={100} 
                    mt={-90} 
                    ml={100}
                    bg="white" 
                    display="flex" 
                    justifyContent="center" 
                    alignItems="center"
                >
                    { useData.prof_image ? (
                    <Image 
                        w={150} 
                        h={150} 
                        borderRadius={100} 
                        src={`http://127.0.0.1:5000/prof_image/${useData.prof_image}`} 
                        alt="prof image" 
                    />
                ) : (
                    <Image 
                    w={150} 
                    h={150} 
                    borderRadius={100} 
                    src='not_profileicon.jpg'
                    alt="prof image" 
                />
                )}
                </Box>
                </Box>
                <h1 className="title">{useData.name}</h1>
                <Text mb={20}>{useData.prof_comment}</Text>
                <Link href="/prof_edit" display={"flex"} w={200} h={50} textDecoration={"none"} color={"black"} alignItems={'center'} justifyContent={'center'} textAlign={"center"} >
                    <Box w={200} h={50} backgroundColor='#dcdcdc' m='-140px 0 50px 700px'>+ プロフ編集</Box>
                </Link>
                <Follow />
                <Tabs>
                    <Tab>投稿一覧</Tab>
                    <Tab>ブックマーク一覧</Tab>

                    <TabPanels>
                        <TabPanel>
                            <UserPost></UserPost>
                        </TabPanel>
                        
                        <TabPanel>
                            <BookmarkPost></BookmarkPost>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
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