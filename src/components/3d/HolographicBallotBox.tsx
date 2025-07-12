import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const HolographicBallotBox = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && wireframeRef.current) {
      meshRef.current.rotation.y += 0.01;
      wireframeRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      wireframeRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Main ballot box */}
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1, 1]} />
        <meshStandardMaterial
          color="#00bfff"
          transparent
          opacity={0.3}
          emissive="#00bfff"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Wireframe overlay */}
      <mesh ref={wireframeRef}>
        <boxGeometry args={[1.6, 1.1, 1.1]} />
        <meshBasicMaterial
          color="#ff00ff"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Slot on top */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.1]} />
        <meshStandardMaterial
          color="#00ff7f"
          emissive="#00ff7f"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Glowing orbs around the box */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 0.5,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? "#00bfff" : i % 3 === 1 ? "#ff00ff" : "#00ff7f"}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default HolographicBallotBox;