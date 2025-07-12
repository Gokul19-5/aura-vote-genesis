import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const ParticleBackground = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create particle positions
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    
    // Random colors for particles (cyan, purple, green)
    const colorChoice = Math.random();
    if (colorChoice < 0.33) {
      colors[i * 3] = 0; colors[i * 3 + 1] = 0.7; colors[i * 3 + 2] = 1; // Cyan
    } else if (colorChoice < 0.66) {
      colors[i * 3] = 0.7; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 1; // Purple
    } else {
      colors[i * 3] = 0; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 0.3; // Green
    }
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002;
      pointsRef.current.rotation.x += 0.001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleBackground;