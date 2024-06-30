import { useRef, useEffect } from "react";
import * as THREE from "three";
import "./App.css";

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      canvas.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      camera.position.z = 5;

      const animate = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

      renderer.setAnimationLoop(animate);

      // Cleanup on component unmount
      return () => {
        renderer.dispose();
        if (canvas) {
          canvas.removeChild(renderer.domElement);
        }
      };
    }
  }, []);

  return <div className="canvas" ref={canvasRef}></div>;
};

export default App;
