import { Box, Input } from "@yamada-ui/react";

const Sidebar = () => {
    return (
        <Box w="15%" h={"auto"}backgroundColor={"gray.100"}>
            <form action="">
                <Input placeholder="Search" />
            </form>

            <Box w="100%" h={200} backgroundColor={"orange"}>
                hasshutagu
            </Box>
        </Box>
    )
};

export default Sidebar;