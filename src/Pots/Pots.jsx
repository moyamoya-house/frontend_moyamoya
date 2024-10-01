import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Box } from '@yamada-ui/react';
import SpeechText from './audio/audio_speach';

const Pots = () => {
  const ref = useRef();

  // 壺の形を定義（輪郭）
  const points = [];
  points.push(new THREE.Vector2(0.8, -3));  // 底の部分
  points.push(new THREE.Vector2(2, -2.5));  // 下部
  points.push(new THREE.Vector2(3.5, -1));  // 広がり部分
  points.push(new THREE.Vector2(3, 0));     // 中央部分
  points.push(new THREE.Vector2(2.5, 1.5)); // 首に向かう部分
  points.push(new THREE.Vector2(1.8, 2.5)); // 首の付け根
  points.push(new THREE.Vector2(1, 3.5));   // 細い首
  points.push(new THREE.Vector2(1.2, 4));   // 壺の口
  
  // LatheGeometryで壺の形状を作成
  const latheGeometry = new THREE.LatheGeometry(points, 64); // 滑らかな回転体

  // 底面の円を作成
  const bottomGeometry = new THREE.CircleGeometry(0.8, 64); // 底面の円のサイズは0.8

  // useFrameで壺を回転
  useFrame(() => {
    ref.current.rotation.y += 0.01;  // Y軸周りに回転
  });

  return (
    <>
      {/* 壺の形状 */}
      <mesh ref={ref} geometry={latheGeometry}>
        <MeshDistortMaterial color="orange" attach="material" distort={0.2} speed={1.5} />
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
  return (
    <Box w={1000}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <Pots />
        <OrbitControls />
      </Canvas>
      <SpeechText />
    </Box>
  );
};

export default Pot;
