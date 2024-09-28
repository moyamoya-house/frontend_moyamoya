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
                {useData.second_image ? (
                        <Image src={`http://127.0.0.1:5000/second_image/${useData.second_image}`}></Image>
                    ) : (
                        <Box h={300} bg={"aquamarine"}></Box>
                    )}                </Box>
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
                <Link href="/prof_edit" display={"flex"} w={200} h={50} textDecoration={"none"} color={"black"} alignItems={"center"} justifyContent={"center"} textAlign={"center"} m='-100px 0 50px 700px' backgroundColor='#dcdcdc' _hover={{opacity: 0.4}} >
                    + プロフ編集
                </Link>
                <Follow />
                <Tabs>
                    <Tab
                        width={300}
                        maxW="100%"
                        m="0 auto 0 auto"
                        border={"none"}
                    >
                        投稿一覧
                    </Tab>
                    <Tab
                        width={300}
                        maxW="100%"
                        m="0 auto 0 auto"
                        border={"none"}
                    >
                        ブックマーク一覧
                    </Tab>

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