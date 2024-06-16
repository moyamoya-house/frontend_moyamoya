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
} from "@yamada-ui/react";


const TopHeader = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <>
            <Box w='100%' h={100} bg="gray">
            
            <Image src="download.jpg" alt="pot" h={100}></Image>
            <Button onClick={onOpen} w={50} h={50} borderRadius={100} float={"right"} mt={25} border="none">icon</Button>

            <Drawer isOpen={isOpen} onClose={onClose} placement="right" w='500px' h="auto" textAlign='right' border='1px solid #000' bg='#fff'>
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