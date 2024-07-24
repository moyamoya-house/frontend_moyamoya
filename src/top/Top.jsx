import { Text, Box, Center, Image, Flex } from '@yamada-ui/react';
import { useEffect, useState } from 'react';
import Baloon from './component/baloon';
import BaloonTopRight from './component/baloon-topright';
import BaloonTopLeft from './component/baloon-topleft';
import BaloonBottomRight from './component/baloon-bottomright';
import './css/top.css';

const Top = () => {
    const [useData, setUseData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            console.log(token);
            const response = await fetch('http://127.0.0.1:5000/mypage',{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setUseData(data);
            }
        };
        fetchUserData();
    },[]);
    return (
        <>            
        {useData ? (
            <Box className='top'>
                {/* トップヘッダー */}
                <Box className='gradetion'>
                    <Baloon></Baloon>
                    {/* 心の声左上 */}
                    <BaloonTopLeft></BaloonTopLeft>
                    {/* 心の声右上 */}
                    <BaloonTopRight></BaloonTopRight>
                    {/* 心の声左下 */}
                    <BaloonBottomRight></BaloonBottomRight>
                    {/* タイトル */}
                    <Center>
                        <Text className='potcom'>PotCom</Text>
                    </Center>
                </Box>

                {/* スクロール促す */}
                <div className='scrolldown'>
                    <span>
                        scroll
                    </span>
                </div>

                {/* サイト概要 */}
                <Box m='0 auto' mt={50}>
                    <Center>
                        <Text className='potcomTitle'>
                            PotComとは...
                        </Text>
                    </Center>
                    <Center mt={-20}>
                        <Text fontSize='30px'>
                            皆さん、日頃のストレスや思っていること発散していますか？<br />
                            人間関係や仕事、勉強など様々な要因でストレスを感じてます。<br></br>
                            そんなストレスや不満を思う存分発散してもらおうじゃないかと思い<br></br>
                            このストレス発散用SNSアプリ<strong>｢PotCom｣</strong>を制作しました。
                        </Text>
                    </Center>
                </Box>

                {/* 愚痴の壺紹介 */}
                <Box>
                    <Center>
                        <Text fontSize='50px' mt={50}>
                            PotComの由来...
                        </Text>
                    </Center>
                </Box>

                <Box display={'flex'} m="0 auto" justifyContent={'center'} alignItems={'center'}>
                    <Box>
                        <Image src='download.jpg' width={200} m='0 auto'/>
                    </Box>
                    <Center>
                        <Text fontSize='30px'>
                            PotComは｢愚痴の壺｣という商品をオマージュして製作しています。<br></br>

                        </Text>
                    </Center>
                </Box>
            </Box>
        ) : (
            <Text>Loading...</Text>
        )}
        </>
    );
};

export default Top;