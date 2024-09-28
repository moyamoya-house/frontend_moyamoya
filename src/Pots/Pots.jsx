import React, { useRef } from 'react';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Potsxxx = () => {
  const ref = useRef();

  // 壺の形を定義
  const points = [];
  for (let i = 0; i < 10; i++) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * 5 + 2, (i - 5) * 2));
  }
  const latheGeometry = new THREE.LatheGeometry(points, 32);

  return (
    <mesh ref={ref} geometry={latheGeometry}>
      <MeshDistortMaterial color="orange" attach="material" distort={0.5} speed={1.5} />
    </mesh>
  );
};



export default Potsxxx;
