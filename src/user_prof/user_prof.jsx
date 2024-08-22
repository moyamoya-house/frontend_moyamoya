import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@yamada-ui/react";

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
            <Box >
                <h1>{userData.name}</h1>
            </Box>
        ) : (
            <p>Loading user data...</p>
        )}
        </>
    )
}
export default UserProf;