import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
  const [hasError, setHasError] = useState(false);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const activeActionRef = useRef<THREE.AnimationAction | null>(null);

  useEffect(() => {
    let isMounted = true;
    const container = containerRef.current;
    if (!container) return;

    // --- CHECK REDUCED MOTION ---
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- SCENE & CAMERA SETUP ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(34, container.clientWidth / container.clientHeight, 0.1, 50);
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
    const ambientLight = new THREE.AmbientLight(0xfff3e3, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf9e4b7, 2.8);
    keyLight.position.set(2.5, 4.0, 3.0);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd4e2ee, 1.1);
    fillLight.position.set(-2.5, 2.5, 2.0);
    scene.add(fillLight);

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

    // --- ANIMATION MIXER & SETUP ---
    let mixer: THREE.AnimationMixer | null = null;

    const setupAnimations = (rootObj: THREE.Object3D, animations: THREE.AnimationClip[]) => {
      // Ensure frustum culling doesn't clip skinned meshes during animation
      rootObj.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.frustumCulled = false;
        }
      });

      scene.add(rootObj);

      mixer = new THREE.AnimationMixer(rootObj);
      mixerRef.current = mixer;

      const clipNames = animations.map((a) => a.name);
      console.log(`[GLTF Animations] ${character} available animation clips:`, clipNames);

      // Preferred animation clip detection
      const preferredName = character === 'man' ? 'Bhangra' : 'Namaste';
      const targetQuery = (defaultClip || preferredName).toLowerCase();

      let targetClip = animations.find((a) => a.name.toLowerCase() === targetQuery);
      if (!targetClip) {
        targetClip = animations.find((a) =>
          a.name.toLowerCase().includes(character === 'man' ? 'bhangra' : 'namaste')
        );
      }
      if (!targetClip && animations.length > 0) {
        targetClip = animations[0];
      }

      if (targetClip) {
        console.log(
          `[GLTF Animation Action] Playing clip "${targetClip.name}" (${targetClip.duration.toFixed(2)}s) for ${character}`
        );
        const action = mixer.clipAction(targetClip);
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.clampWhenFinished = false;
        action.play();
        activeActionRef.current = action;

        if (prefersReducedMotion) {
          mixer.update(character === 'man' ? 0.6 : 2.6);
          action.paused = true;
        }
      } else {
        console.warn(`[GLTF Animation Action] No animation clips found for ${character}`);
      }

      if (isMounted) {
        setIsLoaded(true);
        setHasError(false);
      }
    };

    // --- LOAD GLB MODEL DIRECTLY (NO PROCEDURAL FALLBACK) ---
    const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    const glbUrl = `${basePath}/models/${character === 'man' ? 'punjabi_man.glb' : 'punjabi_woman.glb'}`;
    const loader = new GLTFLoader();

    console.log(`[GLTFLoader] Requesting ${character} model from ${glbUrl}`);

    loader.load(
      glbUrl,
      (gltf) => {
        if (!isMounted) return;
        console.log(`[GLTFLoader] Successfully loaded ${character} GLB model (${glbUrl})`);
        setupAnimations(gltf.scene, gltf.animations);
      },
      undefined,
      (error) => {
        if (!isMounted) return;
        console.error(`[GLTFLoader Error] Failed to load ${character} model from ${glbUrl}:`, error);
        // Do NOT display any procedural fallback geometry.
        setIsLoaded(false);
        setHasError(true);
      }
    );

    // --- RESIZE HANDLING ---
    const handleResize = () => {
      if (!container || !renderer) return;
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
          // Clamp delta to prevent erratic jumps on tab return
          mixer.update(Math.min(delta, 0.1));
        }

        // Subtle warm light shimmer
        const time = clock.getElapsedTime();
        keyLight.intensity = 2.8 + 0.15 * Math.sin(time * 1.5);

        renderer.render(scene, camera);
      }
    };

    animate();

    // --- CLEANUP DISPOSAL ---
    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (mixer) {
        mixer.stopAllAction();
      }

      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
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

      {/* Subtle spinner during initial load (clears as soon as GLB loads or errors) */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 rounded-full border border-saffron-500/30 border-t-saffron-400 animate-spin opacity-40" />
        </div>
      )}
    </div>
  );
};
