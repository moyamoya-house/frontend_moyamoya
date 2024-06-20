import { Box, Center, Text } from "@yamada-ui/react"

const Footer = () => {
    return(
        <>
            <Box w='100%' h={100} bg='gray' bottom={0}>
                <Center>
                    <Text color='#fff' mt={50}>2024 &copy; Copyright YamamotoTatsuya. All rights reserved.</Text>
                </Center>
            </Box>
        </>
    )
} 

export default Footer;