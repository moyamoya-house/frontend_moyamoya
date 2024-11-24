import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Box } from "@yamada-ui/react";
import SpeechText from "./audio/audio_speach.tsx";
import AudioAll from "./audio/audio_all.tsx";

const Pots = () => {
  const ref = useRef<THREE.Mesh>(null);

  // 壺の形を定義（輪郭）
  const points: THREE.Vector2[] = [];
  points.push(new THREE.Vector2(0.8, -3)); // 底の部分
  points.push(new THREE.Vector2(2, -2.5)); // 下部
  points.push(new THREE.Vector2(3.5, -1)); // 広がり部分
  points.push(new THREE.Vector2(3, 0)); // 中央部分
  points.push(new THREE.Vector2(2.5, 1.5)); // 首に向かう部分
  points.push(new THREE.Vector2(1.8, 2.5)); // 首の付け根
  points.push(new THREE.Vector2(1, 3.5)); // 細い首
  points.push(new THREE.Vector2(1.5, 4)); // 壺の口

  // LatheGeometryで壺の形状を作成
  const latheGeometry = new THREE.LatheGeometry(points, 64); // 滑らかな回転体

  // 底面の円を作成
  //const bottomGeometry = new THREE.CircleGeometry(0.8, 64); // 底面の円のサイズは0.8

  // useFrameで壺を回転
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Y軸周りに回転
    }
  });
  

  return (
    <>
      {/* 壺の形状 */}
      <mesh ref={ref} geometry={latheGeometry}>
        <MeshDistortMaterial
          color="orange"
          attach="material"
          distort={0.2}
          speed={1.5}
        />
      </mesh>

      {/* 底面の形状 */}
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.8, 64]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
};

const Pot = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:5000/mypage", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsername(data.name);
      }
    };
    fetchUser();
  },[]);
  return (
    <Box w={1000} mt={130} display={"flex"}>
      <Box w={400} h={450}>
        <Canvas style={{ width: "100%", height: "100%" }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
          <Pots />
          <OrbitControls />
        </Canvas>
      </Box>
      <Box ml={100}>
        <AudioAll />
      </Box>
      <Box position={"fixed"} w={100} h={"auto"} top={110} right={50}>
        <SpeechText username={username} />
      </Box>
    </Box>
  );
};

export default Pot;
