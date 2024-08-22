import { useState, useTransition, Suspense } from "react";
import { useControls } from "leva";
import { Canvas } from "@react-three/fiber";
import {
  AccumulativeShadows,
  RandomizedLight,
  Center,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import "./index.scss"; // 确保引入的样式文件名正确
import SuCar from "./SuCar";
import Loader from "../common/Loader";

const Sphere = () => {
  const { roughness } = useControls({
    roughness: { value: 1, min: 0, max: 1 },
  });
  return (
    <Center top>
      <mesh castShadow>
        <sphereGeometry args={[0.75, 64, 64]} />
        <meshStandardMaterial metalness={1} roughness={roughness} />
      </mesh>
    </Center>
  );
};

const Env = () => {
  const [preset, setPreset] = useState("sunset");
  const [inTransition, startTransition] = useTransition();
  const { blur } = useControls({
    blur: { value: 1, min: 0, max: 1 },
    preset: {
      value: preset,
      options: [
        "sunset",
        "dawn",
        "night",
        "warehouse",
        "forest",
        "apartment",
        "studio",
        "city",
        "park",
        "lobby",
      ],
      onChange: (value) => startTransition(() => setPreset(value)),
    },
  });
  // blur -- backgroundBlurriness 发生变更https://github.com/pmndrs/drei?tab=readme-ov-file#environment
  return <Environment preset={preset} background backgroundBlurriness={blur} />;
};

const CarSu7Demo = () => {
  return (
    <div className="car_su">
      <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <Suspense fallback={<Loader />}>
          <SuCar scale={1} />
        </Suspense>

        {/* <group position={[0, -0.65, 0]}>
          <Sphere />
          <AccumulativeShadows
            temporal
            frames={200}
            color="purple"
            colorBlend={0.5}
            opacity={1}
            scale={10}
            alphaTest={0.85}
          >
            <RandomizedLight
              amount={8}
              radius={5}
              ambient={0.5}
              position={[5, 3, 2]}
              bias={0.001}
            />
          </AccumulativeShadows>
        </group> */}
        <Env />
        <OrbitControls
          autoRotate={false}
          autoRotateSpeed={1}
          enablePan={true}
          enableRotate={true}
          enableZoom={true}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
};

export default CarSu7Demo;
