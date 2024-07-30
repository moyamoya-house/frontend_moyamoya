import {
  useDisclosure,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Center,
  rgbaTo,
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
        width={200}
        height={200}
        border={"none"}
        borderRadius={100}
      >
        +
      </Button>

      <Modal isOpen={isOpen} bg={"gray"}>
        <ModalHeader>モヤモヤ投稿</ModalHeader>

        <ModalBody>
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
