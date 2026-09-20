import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createPunjabiMan, createPunjabiWoman } from './punjabiRigs';

export interface PunjabiCharacterCanvasProps {
  character: 'man' | 'woman';
  className?: string;
  defaultClip?: string;
}

export const PunjabiCharacterCanvas: React.FC<PunjabiCharacterCanvasProps> = ({
  character,
  className = '',
  defaultClip,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const activeActionRef = useRef<THREE.AnimationAction | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- CHECK REDUCED MOTION ---
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- SCENE & CAMERA SETUP ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(34, container.clientWidth / container.clientHeight, 0.1, 50);
    // Position camera for a luxury full-body framing
    if (character === 'man') {
      camera.position.set(0, 0.98, 3.4);
      camera.lookAt(0, 0.95, 0);
    } else {
      camera.position.set(0, 0.94, 3.3);
      camera.lookAt(0, 0.92, 0);
    }

    // --- WEBGL RENDERER ---
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // --- CINEMATIC HOSPITALITY LIGHTING ---
    // Warm ambient light
    const ambientLight = new THREE.AmbientLight(0xfff3e3, 1.3);
    scene.add(ambientLight);

    // Key Light (Warm Saffron / Champagne Gold)
    const keyLight = new THREE.DirectionalLight(0xf9e4b7, 2.8);
    keyLight.position.set(2.5, 4.0, 3.0);
    scene.add(keyLight);

    // Fill Light (Soft Ivory/Steel contrast)
    const fillLight = new THREE.DirectionalLight(0xd4e2ee, 1.1);
    fillLight.position.set(-2.5, 2.5, 2.0);
    scene.add(fillLight);

    // Rim / Backlight (Vibrant Amber / Terracotta Edge Glow)
    const rimLight = new THREE.DirectionalLight(0xe67e22, 3.2);
    rimLight.position.set(0, 3.0, -3.0);
    scene.add(rimLight);

    // Soft Contact Shadow below feet
    const shadowGeo = new THREE.PlaneGeometry(0.75, 0.75);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.01;
    scene.add(shadowMesh);

    // --- MODEL ATTACHMENT & ANIMATION MIXER SETUP ---
    let mixer: THREE.AnimationMixer | null = null;

    const setupAnimations = (rootObj: THREE.Object3D, animations: THREE.AnimationClip[]) => {
      scene.add(rootObj);

      mixer = new THREE.AnimationMixer(rootObj);
      mixerRef.current = mixer;

      const targetClipName = defaultClip || (character === 'man' ? 'Bhangra' : 'Namaste');
      let clip = THREE.AnimationClip.findByName(animations, targetClipName);
      if (!clip && animations.length > 0) {
        clip = animations[0];
      }

      if (clip && mixer) {
        const action = mixer.clipAction(clip);
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.clampWhenFinished = false;
        action.play();
        activeActionRef.current = action;

        // If user prefers reduced motion, freeze at a dignified greeting pose
        if (prefersReducedMotion) {
          mixer.update(character === 'man' ? 0.6 : 2.6); // Hold peak greeting pose
          action.paused = true;
        }
      }

      setIsLoaded(true);
    };

    // Load GLB file with procedural fallback
    const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    const glbPath = `${basePath}/models/${character === 'man' ? 'punjabi_man.glb' : 'punjabi_woman.glb'}`;
    const loader = new GLTFLoader();

    loader.load(
      glbPath,
      (gltf) => {
        setupAnimations(gltf.scene, gltf.animations);
      },
      undefined,
      (error) => {
        console.warn(`[3D Viewer] Notice: Falling back to procedural humanoid rig for ${character}:`, error);
        const fallback = character === 'man' ? createPunjabiMan() : createPunjabiWoman();
        setupAnimations(fallback.scene, fallback.animations);
      }
    );

    // --- RESIZE HANDLING ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // --- VIEWPORT INTERSECTION OBSERVER ---
    let isVisible = true;
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // --- ANIMATION RENDER LOOP ---
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      if (isVisible) {
        if (mixer && !prefersReducedMotion) {
          mixer.update(delta);
        }

        // Subtle dynamic light shimmer
        const time = clock.getElapsedTime();
        keyLight.intensity = 2.8 + 0.15 * Math.sin(time * 1.5);

        renderer.render(scene, camera);
      }
    };

    animate();

    // --- CLEANUP DISPOSAL ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (mixer) {
        mixer.stopAllAction();
      }

      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh || (child as THREE.SkinnedMesh).isSkinnedMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => mat.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });

      shadowTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [character, defaultClip]);

  return (
    <div className={`relative ${className}`}>
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        className="w-full h-full relative cursor-default select-none pointer-events-none"
        aria-hidden="true"
      />

      {/* Graceful subtle shimmer while initializing */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full border border-saffron-500/30 border-t-saffron-400 animate-spin opacity-40" />
        </div>
      )}
    </div>
  );
};
