import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  Center,
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
      >
        +
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="rgba(0, 0, 0, 0.6)" /> {/* Set the background to gray with opacity */}
        <ModalHeader>モヤモヤ投稿</ModalHeader>

        <ModalBody width={200} height={200} border='1px solid #000'>
            <form onSubmit={handleCreateMoyamoya}>
                <input
                    type="text"
                    placeholder="発散させたいこと"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
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
