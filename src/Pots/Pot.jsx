import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Pots from './Pots';

const Pot = () => {
    return (
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <Pots />
        <OrbitControls />
      </Canvas>
    );
};
export default Pot;
