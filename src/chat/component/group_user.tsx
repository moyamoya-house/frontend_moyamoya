import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Link,
} from "@yamada-ui/react";
import React, { useEffect, useState } from "react";
import "./css/group_user.css";

interface User {
  id: number;
  name: string;
  prof_image: string | null;
}

const GroupMembers = ({ groupId }) => {
  const [members, setMembers] = useState<User[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:5000/groupchat/members/${groupId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setMembers(data.members);
      }
    };
    fetchMembers();
  }, [groupId]);

  return (
    <div>
      <Button onClick={onOpen} className="group-members-button">
        メンバー
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} className="group-members-modal">
        <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
        <ModalHeader className="modal-header">グループメンバー一覧</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="modal-body">
          <ul>
            {members.map((member) => (
              <li key={member.id}>
                <Link href={`/user_prof/${member.id}`} className="user-link">
                  <img
                    src={
                      member.prof_image
                        ? `http://127.0.0.1:5000/prof_image/${member.prof_image}`
                        : "/not_profileicon.jpg"
                    }
                    alt={member.name}
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                  <Text className="user_name">{member.name}</Text>
                </Link>
              </li>
            ))}
          </ul>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default GroupMembers;
