import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  Center,
  Text
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
        backgroundColor={"lightblue"}
      >
        +
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} background={"white"} border='1px solid #000'borderRadius={10}>
        <ModalOverlay bg="rgba(0, 0, 0, 0.6)" /> {/* Set the background to gray with opacity */}
        <ModalHeader>
          <Text m={'0 auto'}>モヤモヤ投稿</Text>
        </ModalHeader>

        <ModalBody width={600} height={200}>
            <form onSubmit={handleCreateMoyamoya} width={600} m={'0 auto'}>
                <input
                    type="text"
                    placeholder="発散させたいこと"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    style={{
                      margin: '0 auto'
                    }}
                />
                <Center>
                    <Button type="submit" w='85%' h={50} m="20px auto" colorScheme="secondary" border='none' bg='lightskyblue' borderRadius={10} >投稿!</Button>
                </Center>
            </form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Post;
