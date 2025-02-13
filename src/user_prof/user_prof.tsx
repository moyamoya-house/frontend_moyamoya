import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Image, Text, Tabs, TabPanels, TabPanel, Tab } from "@yamada-ui/react";
import Followbutton from "./follow_button/follow_button.tsx";
import UserFollow from "../follow/user_follow.tsx";
import UserMoyamoya from "./component/user_post.tsx";
import UserBookmark from "./component/user_bookmark.tsx";
import { User } from "../prof_edit/ProfEditPage";
import "./css/user_prof.css";

const UserProf = () => {
    const { id } = useParams();
    const [userData, setUseData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fectchUserProf = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/users/${id}`,{
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();
                    setUseData(data);
                    setLoading(false);
                } else {
                    console.error('Faild to user data');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error to failed user data:',error);
                setLoading(false);
            }
        };
        fectchUserProf();
    },[id]);

    if (loading) {
        return <p>loading...</p>;
    }
    if (!userData) {
        return <p>not UserData</p>
    }

    return (
        <>
        {userData ? (
            <Box className="user-profile-container">
                <Box className="user-profile-image-container">
                    {userData.second_image ? (
                        <Image src={`http://127.0.0.1:5000/second_image/${userData.second_image}`}></Image>
                    ) : (
                        <Box className="user-profile-placeholder"></Box>
                    )}
                </Box>
                <Box className="user-profile-avatar-container">
                    <Box
                    className="user-profile-avatar"
                    >
                        { userData.prof_image ? (
                            <Image
                            className="user-img"
                            src={`http://127.0.0.1:5000/prof_image/${userData.prof_image}`}
                            alt="prof_image"
                            >
                            </Image>
                        ) : (
                            <Image
                            className="user-img"
                            src="/not_profileicon.jpg"
                            alt="prof_image"
                            ></Image>
                        )}

                    </Box>
                </Box>
                <h1 className="user-profile-name">{userData.name}</h1>
                <UserFollow userId={userData.id} />
                <Text className="user-profile-comment">{userData.prof_comment}</Text>
                <Followbutton userId={userData.id} />

                <Tabs>
                    <Tab
                    className="user-profile-tab"
                    >
                        投稿一覧
                    </Tab>
                    <Tab
                    className="user-profile-tab"
                    >
                        ブックマーク一覧
                    </Tab>

                    <TabPanels>
                        <TabPanel>
                            <UserMoyamoya userId={userData.id} />
                        </TabPanel>

                        <TabPanel>
                            <UserBookmark userId={userData.id} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        ) : (
            <p>Loading user data...</p>
        )}
        </>
    )
}
export default UserProf;