import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  className?: string;
}

export const ThreeScene = ({ className }: ThreeSceneProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const techIconsRef = useRef<THREE.Sprite[]>([]);
  const clockRef = useRef<THREE.Clock>();
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: window.devicePixelRatio === 1,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    clockRef.current = new THREE.Clock();

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00f0ff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x8b5cf6, 0.8, 10);
    pointLight1.position.set(-5, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 0.6, 8);
    pointLight2.position.set(5, -2, 2);
    scene.add(pointLight2);

    // OPTION 1: Comment out the icon loading (recommended for now)
    // This removes the error and improves performance
    /*
    const textureLoader = new THREE.TextureLoader();
    const icons = ['/react.png', '/node.png', '/python.png', '/docker.png', '/kubernetes.png', '/aws.png'];
    
    icons.forEach(iconUrl => {
      textureLoader.load(
        iconUrl,
        (texture) => {
          const material = new THREE.SpriteMaterial({ 
            map: texture,
            transparent: true,
            opacity: 0.8
          });
          const sprite = new THREE.Sprite(material);
          sprite.scale.set(0.5, 0.5, 1);
          sprite.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          );
          scene.add(sprite);
          techIconsRef.current.push(sprite);
        },
        undefined,
        (error) => console.error('Error loading texture:', error)
      );
    });
    */

    // OPTION 2: Use colored geometric shapes instead of icons (adds visual interest without images)
    const createFloatingShapes = () => {
      const colors = [0x3b82f6, 0x8b5cf6, 0x06b6d4, 0xec4899, 0x10b981, 0xf59e0b];
      const geometries = [
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.SphereGeometry(0.3, 16, 16),
        new THREE.ConeGeometry(0.3, 0.6, 16),
        new THREE.TorusGeometry(0.3, 0.1, 8, 16)
      ];

      for (let i = 0; i < 6; i++) {
        const geometry = geometries[i % geometries.length];
        const material = new THREE.MeshStandardMaterial({
          color: colors[i],
          transparent: true,
          opacity: 0.7,
          emissive: colors[i],
          emissiveIntensity: 0.3
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        );
        scene.add(mesh);
        techIconsRef.current.push(mesh as any);
      }
    };

    createFloatingShapes();
    
    // Optimized particle system
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 8;

    // THROTTLED mouse movement
    let lastMouseUpdate = 0;
    const handleMouseMove = (event: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseUpdate < 16) return;
      
      lastMouseUpdate = now;
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // DEBOUNCED resize
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 250);
    };

    // Visibility handler
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      if (!isVisibleRef.current) return;
      
      const delta = clockRef.current?.getDelta() || 0;
      const time = clockRef.current?.getElapsedTime() || 0;
      
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;
      
      // Animate shapes
      techIconsRef.current.forEach((shape, index) => {
        shape.position.y += delta * 0.5;
        shape.rotation.x += delta * 0.5;
        shape.rotation.y += delta * (index % 2 === 0 ? 0.5 : -0.5);
        
        if (shape.position.y > 10) {
          shape.position.y = -10;
        }
      });
      
      particleSystem.rotation.y = time * 0.05;
      
      pointLight1.position.x = Math.sin(time * 0.5) * 5;
      pointLight2.position.z = Math.cos(time * 0.7) * 3;
      
      camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(resizeTimeout);
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      techIconsRef.current.forEach(shape => {
        if (shape.material) {
          if (Array.isArray(shape.material)) {
            shape.material.forEach(mat => mat.dispose());
          } else {
            shape.material.dispose();
          }
        }
        if (shape.geometry) shape.geometry.dispose();
      });
      
      particleGeometry.dispose();
      particleMaterial.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={className}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};
