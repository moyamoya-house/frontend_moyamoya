import { Box, Text } from "@yamada-ui/react";
import { useEffect, useState } from "react";

const Follow = () => {
    const [countFollow, setFollow] = useState(null);

    useEffect(() => {
        const fetchFollow = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://127.0.0.1:5000/follower', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
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
    }, []); // useEffectの第二引数を空配列にして初回レンダー時のみ実行する

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

export default Follow;
