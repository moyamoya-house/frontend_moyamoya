import React, { useEffect, useState } from "react";
import { Box,Image, Link, Tabs, Text, Tab, TabPanels, TabPanel } from "@yamada-ui/react";
import './css/mypage.css';
import Follow from "../follow/follow.tsx";
import UserPost from "./component/user_post.tsx";
import BookmarkPost from "./component/bookmark_post.tsx";

interface User {
    user_id: number;
    name: string;
    prof_image: string;
    second_image: string;
    prof_comment: string;
}

const Mypage  = () => {
    const [useData, setUseData] = useState<User | null>(null);

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
            <Box className="mypage-cotainer">
                <Box className="mypage-header">
                    {useData.second_image ? (
                        <Image src={`http://127.0.0.1:5000/second_image/${useData.second_image}`}></Image>
                    ) : (
                        <Box className="mypage-header-image"></Box>
                    )}
                </Box>
                <Box className="mypage-profile">
                <Box className="mypage-profile-image-container">
                    { useData.prof_image ? (
                    <Image 
                        className="mypage-profile-image"
                        src={`http://127.0.0.1:5000/prof_image/${useData.prof_image}`} 
                        alt="prof image" 
                    />
                ) : (
                    <Image 
                    className="mypage-profile-image"
                    src='not_profileicon.jpg'
                    alt="prof image" 
                />
                )}
                </Box>
                </Box>
                <h1 className="title">{useData.name}</h1>
                <Text className="mypage-content">{useData.prof_comment}</Text>
                <Link href="/prof_edit" className="mypage-edit-link" >
                    + プロフ編集
                </Link>
                <Follow />
                <Tabs>
                    <Tab
                    className="mypage-tab"
                    >
                        投稿一覧
                    </Tab>
                    <Tab
                    className="mypage-tab"
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