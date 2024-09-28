import { Text, Box, Center, Image, Link } from '@yamada-ui/react';
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

                <Box>
                    <Box display={'flex'} m="0 auto" justifyContent={'center'} alignItems={'center'}>
                        <Box>
                            <Image src='download.jpg' width={200} m='0 auto'/>
                        </Box>
                        <Center>
                            <Text fontSize={20}>
                                <strong>｢愚痴の壺｣</strong>という商品をオマージュ。<br></br>
                                詳細は<Link href='https://nlab.itmedia.co.jp/nl/articles/1907/01/news043.html#:~:text=%E3%83%95%E3%82%BF%E3%82%92%E9%96%8B%E3%81%91%E3%81%A6%E5%8F%A3,%E3%81%AA%E3%81%84%E5%A0%B4%E6%89%80%E3%81%A7%E4%BD%BF%E3%81%8A%E3%81%86%E3%80%82&text=%E3%80%8C%E6%AF%92%E8%88%8C%E3%80%8D%E3%80%8C%E6%94%BE%E9%80%81%E7%A6%81%E6%AD%A2%E3%80%8D%E3%80%8C%E3%83%8A%E3%82%A4%E3%82%B7%E3%83%A7%E3%80%8D%E3%81%A8%E3%81%84%E3%81%A3%E3%81%9F%E3%80%81,%E3%81%AE%E8%A3%BD%E5%93%81%E3%82%82%E3%83%A9%E3%82%A4%E3%83%B3%E3%82%A2%E3%83%83%E3%83%97%E3%80%82'>こちら→</Link><br></br>
                                PotComでは｢愚痴の壺｣を疑似体験できます!!
                            </Text>
                        </Center>
                    </Box>
                    <Box className='link'>
                        <Link href='/potcom' textDecoration={'none'} display={'inline-block'} color={'black'}>愚痴の壺</Link>
                    </Box>
                </Box>
            </Box>
        ) : (
            <Text>Loading...</Text>
        )}
        </>
    );
};

export default Top;