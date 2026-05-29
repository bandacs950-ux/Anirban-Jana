import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Save container dimensions
    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 25;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const goldSpotLight = new THREE.SpotLight(0xd4af37, 10, 50, Math.PI / 4, 0.5, 1);
    goldSpotLight.position.set(10, 20, 10);
    scene.add(goldSpotLight);

    const blueSpotLight = new THREE.SpotLight(0x718096, 5, 50, Math.PI / 3, 0.5, 1);
    blueSpotLight.position.set(-15, -15, 15);
    scene.add(blueSpotLight);

    const cursorLight = new THREE.PointLight(0xd4af37, 4, 20);
    cursorLight.position.set(0, 0, 10);
    scene.add(cursorLight);

    // --- Generate glowing particle circle texture dynamically ---
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(212, 175, 55, 1)'); // Warm gold
      grad.addColorStop(0.3, 'rgba(212, 175, 55, 0.6)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    // --- Particle System (Golden Bokeh Dust) ---
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Spread particles across a wide 3D grid
      positions[i] = (Math.random() - 0.5) * 60;     // X
      positions[i + 1] = (Math.random() - 0.5) * 50; // Y
      positions[i + 2] = (Math.random() - 0.5) * 40; // Z

      // Speed for drifting animation
      speeds[i] = (Math.random() - 0.5) * 0.02;     // dx
      speeds[i + 1] = Math.random() * 0.015 + 0.005; // dy (always floats up)
      speeds[i + 2] = (Math.random() - 0.5) * 0.01;  // dz
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.8,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- Elegant Floating Photographic Frames (translucent wireframe planes) ---
    const frames: THREE.Group[] = [];
    const frameColors = [0xd4af37, 0xe2e8f0, 0xa0aec0]; // Gold, Platinum, Silver

    for (let i = 0; i < 4; i++) {
      const frameGroup = new THREE.Group();

      // Translucent panel glassmorphic mesh
      // Width & height matching golden photography ratios (3:4 or 16:9)
      const w = i % 2 === 0 ? 4 : 5.33;
      const h = i % 2 === 0 ? 5.33 : 3;

      const pGeom = new THREE.PlaneGeometry(w, h);
      const pMat = new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        transparent: true,
        opacity: 0.25,
        roughness: 0.1,
        metalness: 0.9,
        transmission: 0.6, // Glass lookup effect
        thickness: 1.2,
        side: THREE.DoubleSide,
      });
      const glassPlane = new THREE.Mesh(pGeom, pMat);
      frameGroup.add(glassPlane);

      // Gold frame wireframe border-accent
      const edges = new THREE.EdgesGeometry(pGeom);
      const lineMat = new THREE.LineBasicMaterial({
        color: frameColors[i % frameColors.length],
        linewidth: 2,
        transparent: true,
        opacity: 0.5,
      });
      const frameOutline = new THREE.LineSegments(edges, lineMat);
      frameOutline.position.z = 0.02; // lift slightly
      frameGroup.add(frameOutline);

      // Position in space
      frameGroup.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 26,
        -10 - Math.random() * 15
      );

      // Save random rotation speed
      frameGroup.userData = {
        rotX: (Math.random() - 0.5) * 0.003,
        rotY: (Math.random() - 0.5) * 0.003,
        rotZ: (Math.random() - 0.5) * 0.001,
        hoverSpeed: 0.5 + Math.random() * 0.5,
        hoverOffset: Math.random() * Math.PI,
        baseY: frameGroup.position.y,
      };

      scene.add(frameGroup);
      frames.push(frameGroup);
    }

    // --- Cursor Tracking ---
    const handleMouseMove = (event: MouseEvent) => {
      // Map cursors to normalized range [-1, 1]
      mouseRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Responsive Dimensions ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth || window.innerWidth;
      const newHeight = containerRef.current.clientHeight || window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    // --- Render Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // --- 1. Soft Mouse Parallax Easing ---
      const mouse = mouseRef.current;
      // Linear interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x = mouse.x * 3.5;
      camera.position.y = mouse.y * 3.5;
      camera.lookAt(0, 0, 0);

      cursorLight.position.x = mouse.x * 15;
      cursorLight.position.y = mouse.y * 12;

      // --- 2. Animate Particles drift ---
      const positionAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      const posArray = positionAttr.array as Float32Array;

      for (let i = 0; i < particleCount * 3; i += 3) {
        // Drift coordinates
        posArray[i] += speeds[i]; // dx
        posArray[i + 1] += speeds[i + 1]; // dy

        // Wrap around borders
        if (posArray[i + 1] > 25) {
          posArray[i + 1] = -25;
          posArray[i] = (Math.random() - 0.5) * 60;
        }
        if (posArray[i] > 30 || posArray[i] < -30) {
          speeds[i] *= -1;
        }
      }
      positionAttr.needsUpdate = true;

      // --- 3. Rotate and Hover Photo Frames ---
      frames.forEach((frame) => {
        const ud = frame.userData;
        frame.rotation.x += ud.rotX;
        frame.rotation.y += ud.rotY;
        frame.rotation.z += ud.rotZ;

        // Hover sine wave
        frame.position.y = ud.baseY + Math.sin(elapsedTime * ud.hoverSpeed + ud.hoverOffset) * 0.4;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (renderer && renderer.domElement && containerRef.current) {
        // Safe check
        try {
          containerRef.current.removeChild(renderer.domElement);
        } catch (e) {}
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="canvas-container"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#050505]"
    />
  );
}
