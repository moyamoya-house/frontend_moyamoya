import { Box, Text } from "@yamada-ui/react";
import { useEffect, useState } from "react";

const UserFollow = ({ userId }) => {
    const [countFollow, setFollow] = useState(null);

    useEffect(() => {
        const fetchFollow = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/user_followers/${userId}`, {
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setFollow(data);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching follow data:', error);
            }
        };
        fetchFollow();
    }, [userId]); // useEffectの第二引数を空配列にして初回レンダー時のみ実行する

    return (
        <Box>
            {countFollow ? (
                <Box display={"flex"}>
                    <Text>{countFollow.follower} フォロワー</Text>
                    <Text>{countFollow.following} フォロー中</Text>
                </Box>
            ) : (
                <Text>データを読み込んでいます...</Text>
            )}
        </Box>
    );
};

export default UserFollow;
