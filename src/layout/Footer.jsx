import { Box, Center, Text } from "@yamada-ui/react"
import './css/layout.css'

const Footer = () => {
    return(
        <>
            <Box className="footer">
                <Center>
                    <Text color='#fff' mt={50}>2024 &copy; Copyright YamamotoTatsuya. All rights reserved.</Text>
                </Center>
            </Box>
        </>
    )
} 

export default Footer;