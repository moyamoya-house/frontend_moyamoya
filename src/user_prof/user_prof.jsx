import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Image, Text, Tabs, TabPanels, TabPanel, Tab } from "@yamada-ui/react";
import Followbutton from "./follow_button/follow_button";
import UserFollow from "../follow/user_follow";
import UserMoyamoya from "./component/user_post";
import UserBookmark from "./component/user_bookmark";

const UserProf = () => {
    const { id } = useParams();
    const [userData, setUseData] = useState(null);
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
            <Box w={1500} maxWidth='80%' m='0 auto' mt={100} overflow={"hidden"}>
                <Box h={300} border='1px solid #000' overflow={"hidden"}>
                    {userData.second_image ? (
                        <Image src={`http://127.0.0.1:5000/second_image/${userData.second_image}`}></Image>
                    ) : (
                        <Box h={300} bg={"aquamarine"}></Box>
                    )}
                </Box>
                <Box position='relative' display={"flex"}>
                    <Box
                    w={160}
                    h={160}
                    borderRadius={100}
                    mt={-90}
                    ml={100}
                    bg='white'
                    display={"flex"}
                    justifyContent='center'
                    alignItems={"center"}
                    >
                        { userData.prof_image ? (
                            <Image
                            w={150}
                            h={150}
                            borderRadius={100}
                            src={`http://127.0.0.1:5000/prof_image/${userData.prof_image}`}
                            alt="prof_image"
                            >
                            </Image>
                        ) : (
                            <Image
                            w={150}
                            h={150}
                            borderRadius={100}
                            src="/not_profileicon.jpg"
                            alt="prof_image"
                            ></Image>
                        )}

                    </Box>
                </Box>
                <h1>{userData.name}</h1>
                <UserFollow userId={userData.id} />
                <Text>{userData.prof_comment}</Text>
                <Followbutton userId={userData.id} />

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