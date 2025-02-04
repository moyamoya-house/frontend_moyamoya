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
import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/post.css";

const Post = () => {
  const [post, setPost] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleCreateMoyamoya = async (e: React.FormEvent<HTMLFormElement>) => {
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

      <Modal isOpen={isOpen} className="modal">
        <CloseButton onClick={onClose} w={20} top={10} left={10}></CloseButton>
        <ModalOverlay bg="rgba(0, 0, 0, 0.6)" /> {/* Set the background to gray with opacity */}
        <ModalHeader className="modal-header">
          <Text m={'0 auto'}>モヤモヤ投稿</Text>
        </ModalHeader>

        <ModalBody className="modal-content">
            <form onSubmit={handleCreateMoyamoya} className="form">
                <textarea
                    placeholder="発散させたいこと"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    className="textarea"
                />
                <Box className="btnbox">
                    <Button type="submit" className="submitbutton" >投稿!</Button>
                </Box>
            </form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Post;
