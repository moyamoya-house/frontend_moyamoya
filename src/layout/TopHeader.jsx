import {
    Button,
    List,
    ListItem,
    Drawer,
    DrawerHeader,
    DrawerBody,
    useDisclosure,
    Box,
    Image,
    Link,
} from "@yamada-ui/react";
import './css/layout.css'


const TopHeader = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <>
            <Box className="header" w='100%' h={100} display="flex" justifyContent="space-between">
                <Link href="/top">
                    <Image src="PotCom_logo_typography.png" alt="pot" h={100}></Image>
                </Link>
                <Box display='flex' mt={25}>
                    <Button onClick={onOpen} w={50} h={50} borderRadius={100} float={"right"} border="none" mr={40}>icon</Button>
                </Box>
            <Drawer isOpen={isOpen} onClose={onClose} placement="right" w='350px' h="auto" textAlign='right' border='1px solid #000' bg='#fff'>
                <DrawerHeader mt={50}>username</DrawerHeader>

                <DrawerBody textAlign="right">
                    <List textAlign="right" mt={50}>
                        <ListItem fontSize={50} m='20, 20'>My page</ListItem>
                        <ListItem fontSize={50} m='20, 20'>投稿内容</ListItem>
                        <ListItem fontSize={50} m='20, 20'>PotCom</ListItem>
                        <ListItem fontSize={50} m='20, 20'>メッセージ</ListItem>
                    </List>
                </DrawerBody>
            </Drawer>
            </Box>

        </>
    );
}

export default TopHeader;