import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import ParticleBackground from "./ParticleBackground";

interface Scene3DProps {
  children?: React.ReactNode;
  enableControls?: boolean;
  cameraPosition?: [number, number, number];
}

const Scene3D = ({ 
  children, 
  enableControls = true, 
  cameraPosition = [0, 2, 8] 
}: Scene3DProps) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={cameraPosition}
          fov={60}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00bfff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        <spotLight
          position={[0, 20, 0]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          color="#00ff7f"
        />
        
        {/* Controls */}
        {enableControls && (
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={15}
          />
        )}
        
        {/* Background particles */}
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>
        
        {/* Scene content */}
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;