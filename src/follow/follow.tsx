import {
  Box,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@yamada-ui/react";
import React, { useEffect, useState } from "react";

interface User {
  user_id: number;
  user_name: string;
  prof_image: string;
  prof_comment: string;
}

const Follow = () => {
  const [user_all, setUserAll] = useState<User[]>([]);
  const [isFollower, setIsFollower] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [countFollow, setCountFollow] = useState<{ follower: number; following: number } | null>(null);

  const openModal = (type: "follower" | "following") => {
    setIsFollower(type === "following");
    fetchUsers(type === "following" ? "follow_users" : "followed_users");
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  // フォロー・フォロワーの数を取得
  useEffect(() => {
    const fetchFollowCount = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://127.0.0.1:5000/follower", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCountFollow(data);
        } else {
          console.error("Failed to fetch follow counts");
        }
      } catch (error) {
        console.error("Error fetching follow count data:", error);
      }
    };
    fetchFollowCount();
  }, []);

  // ユーザー一覧を取得
  const fetchUsers = async (endpoint: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserAll(data.following);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <Box>
      {countFollow ? (
        <>
          <Box display="flex">
            <Link
              onClick={(e) => {
                e.preventDefault();
                openModal("follower");
              }}
              cursor="pointer"
            >
              {countFollow.follower} フォロワー
            </Link>
            <Link
              onClick={(e) => {
                e.preventDefault();
                openModal("following");
              }}
              cursor="pointer"
            >
              {countFollow.following} フォロー中
            </Link>
          </Box>

          <Modal isOpen={isOpen} onClose={closeModal} w={700} h={500} bg="white">
            <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
            <ModalHeader>
              {isFollower ? "フォロワー一覧" : "フォロー一覧"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                {user_all.length > 0 ? (
                  user_all.map((user) => (
                    <Box key={user.user_id} display="flex" alignItems="center" mb={4}>
                      <Image
                        src={
                          user.prof_image
                            ? `http://127.0.0.1:5000/prof_image/${user.prof_image}`
                            : "/not_profileicon.jpg"
                        }
                        alt={`${user.user_name}のプロフィール画像`}
                        boxSize="50px"
                        borderRadius="full"
                        mr={4}
                      />
                      <Box>
                        <Text fontWeight="bold">{user.user_name}</Text>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Text>{isFollower ? "フォロワーがいません。" : "フォローするユーザーがいません。"}</Text>
                )}
              </Box>
            </ModalBody>
          </Modal>
        </>
      ) : (
        <Text>データを読み込んでいます...</Text>
      )}
    </Box>
  );
};

export default Follow;
