import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  Text,
  Box,
  CloseButton
} from "@yamada-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [post, setPost] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleCreateMoyamoya = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:5000/moyamoya", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("MoyaMoya Created", data);
      navigate("/post_all");
      onClose();
    } else {
      const error = await response.json();
      console.log(error);
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        width={100}
        height={100}
        border={"none"}
        borderRadius={100}
        variant={"ghost"}
        cursor={"pointer"}
        fontSize={30}
        backgroundColor={"lightskyblue"}
      >
        +
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} background={"white"} border='1px solid #000'borderRadius={10}>
        <CloseButton></CloseButton>
        <ModalOverlay bg="rgba(0, 0, 0, 0.6)" /> {/* Set the background to gray with opacity */}
        <ModalHeader>
          <Text m={'0 auto'}>モヤモヤ投稿</Text>
        </ModalHeader>

        <ModalBody width={600} height={200}>
            <form onSubmit={handleCreateMoyamoya} width={600} m={'0 auto'}>
                <textarea
                    type="text"
                    placeholder="発散させたいこと"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    style={{
                      margin: '30px auto 0 30px',
                      width: '530px',
                      height: '50px'
                    }}
                />
                <Box w={600}>
                    <Button type="submit" w='90%' h={50} m="40px auto 0 30px" colorScheme="secondary" border='none' bg='lightskyblue' borderRadius={10} >投稿!</Button>
                </Box>
            </form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Post;
