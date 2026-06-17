import { useEffect, useRef } from 'react';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup: undefined | (() => void);

    const setup = async () => {
      const THREE = await import('three');
      if (disposed || !mountRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 0.65, 7.2);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      mount.appendChild(renderer.domElement);

      const group = new THREE.Group();
      group.position.set(2.4, -0.2, -1.2);
      scene.add(group);

      const body = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 1.75, 0.35),
        new THREE.MeshStandardMaterial({ color: '#d8d1b8', roughness: 0.82, metalness: 0.05 }),
      );
      group.add(body);

      const screen = new THREE.Mesh(
        new THREE.BoxGeometry(1.85, 1.18, 0.06),
        new THREE.MeshStandardMaterial({ color: '#173b9f', emissive: '#173b9f', emissiveIntensity: 0.28 }),
      );
      screen.position.z = 0.21;
      group.add(screen);

      const stand = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.45, 0.35),
        new THREE.MeshStandardMaterial({ color: '#b7ad94', roughness: 0.9 }),
      );
      stand.position.y = -1.08;
      group.add(stand);

      const base = new THREE.Mesh(
        new THREE.BoxGeometry(1.3, 0.18, 0.8),
        new THREE.MeshStandardMaterial({ color: '#c6bea7', roughness: 0.86 }),
      );
      base.position.y = -1.4;
      group.add(base);

      const particles = new THREE.Points(
        new THREE.BufferGeometry().setAttribute(
          'position',
          new THREE.Float32BufferAttribute(
            Array.from({ length: 120 }, () => (Math.random() - 0.5) * 12),
            3,
          ),
        ),
        new THREE.PointsMaterial({ color: '#fff7c8', size: 0.025, transparent: true, opacity: 0.58 }),
      );
      scene.add(particles);

      const key = new THREE.DirectionalLight('#ffffff', 1.9);
      key.position.set(-2, 3, 4);
      scene.add(key);
      scene.add(new THREE.AmbientLight('#8ab6ff', 1.1));

      let frame = 0;
      let raf = 0;
      const animate = () => {
        frame += 0.006;
        group.rotation.y = -0.32 + Math.sin(frame) * 0.035;
        group.rotation.x = Math.sin(frame * 0.7) * 0.018;
        particles.rotation.y += 0.0008;
        renderer.render(scene, camera);
        raf = window.requestAnimationFrame(animate);
      };
      animate();

      const resize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', resize);

      cleanup = () => {
        window.cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        renderer.dispose();
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
    };

    void setup();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0 opacity-70" aria-hidden="true" />;
}
