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

interface Followed {
  follower: number;
  following: number;
}

interface User {
  user_id: number;
  user_name: string;
  prof_image: string;
  prof_comment: string;
}

const Follow = () => {
  const [countFollow, setFollow] = useState<Followed | null>(null);
  const [user_all, setUserAll] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const fetchFollow = async () => {
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
          console.log(data); // デバッグ用
          setFollow(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching follow data:", error);
      }
    };
    fetchFollow();
  }, []);

  useEffect(() => {
    const followUserAll = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://127.0.0.1:5000/follow_users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data); // デバッグ用
          setUserAll(data.following);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching follow data:", error);
      }
    };
    followUserAll();
  }, []);

  return (
    <Box>
      {countFollow ? (
        <>
          <Box display={"flex"}>
            <Link
              onClick={(e) => {
                e.preventDefault();
                openModal();
              }}
              cursor={"pointer"}
            >
              {countFollow.follower} フォロワー
            </Link>
            <Link
              onClick={(e) => {
                e.preventDefault();
                openModal();
              }}
              cursor={"pointer"}
            >
              {countFollow.following} フォロー中
            </Link>
          </Box>

          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            w={700}
            h={500}
            bg={"white"}
          >
            <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
            <ModalHeader>フォロー一覧</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                {/* 配列であることを確認してからmapを実行 */}
                {Array.isArray(user_all) && user_all.length > 0 ? (
                  user_all.map((user) => (
                    <Box key={user.user_id}>
                      <Link href={`/user_prof/${user.user_id}`} textDecoration={"none"} display={"inline-block"}>
                        <Image
                          src={
                            user.prof_image
                              ? `http://127.0.0.1:5000/prof_image/${user.prof_image}`
                              : "/not_profileicon.jpg"
                          }
                          w={100}
                          h={100}
                          borderRadius={"100%"}
                        />
                        <Text >{user.user_name}</Text>
                      </Link>
                    </Box>
                  ))
                ) : (
                  <Text>フォローするユーザーがいません。</Text>
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
