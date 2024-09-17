import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Box } from '@yamada-ui/react';
import SpeechText from './audio/audio_speach';

const Pots = () => {
  const ref = useRef();

  // 壺の形を定義
  const points = [];
  for (let i = 0; i < 10; i++) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * 5 + 2, (i - 5) * 2));
  }
  const latheGeometry = new THREE.LatheGeometry(points, 32);

  // useFrameはCanvas内で使用する必要があります
  useFrame(() => {
    ref.current.rotation.y += 0.01;  // Y軸周りに回転
  });

  return (
    <mesh ref={ref} geometry={latheGeometry}>
      <MeshDistortMaterial color="orange" attach="material" distort={0.5} speed={1.5} />
    </mesh>
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
    <SpeechText></SpeechText>
    </Box>
  );
};

export default Pot;
