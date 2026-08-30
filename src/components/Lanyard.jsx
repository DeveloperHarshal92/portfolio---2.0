"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import { cn } from "@/libs/utils";
import "../app/styles/Lanyard.css"; 

try {
  extend({ MeshLineGeometry, MeshLineMaterial });
} catch {
  // safe if already extended
}

const BLANK_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

export default function Lanyard({
  position = [0, 0, 15],
  gravity = [0, -38, 0],
  fov = 23,
  transparent = true,
  frontImage = "/images/harshal-portrait.png",
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1.1,
  className = "",
}) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "relative w-full h-[540px] lg:h-[640px] flex items-center justify-center overflow-hidden select-none",
        className
      )}
    >
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
        }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[5, 8, 10]} intensity={1.5} />
        <directionalLight position={[-5, -4, 6]} intensity={0.6} color="#b7c8de" />

        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
          />
        </Physics>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1.1,
}) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 3.5,
    linearDamping: 3.5,
  };

  const strapTexture = useTexture(lanyardImage || BLANK_PIXEL);
  const frontTex = useTexture(frontImage || BLANK_PIXEL);

  // 2048 x 3072 Ultra-Crisp Front ID Texture for Light Theme
  const frontCardMap = useMemo(() => {
    const W = 2048;
    const H = 3072;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.Texture();

    // Solid clean white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);

    // Outer subtle border
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 16;
    ctx.strokeRect(20, 20, W - 40, H - 40);

    // Top Header Banner (Blueprint blue accent)
    ctx.fillStyle = "#0a0d12";
    ctx.fillRect(40, 40, W - 80, 240);

    // Header Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 64px 'JetBrains Mono', monospace";
    ctx.fillText("DEV ACCESS // 2026", 90, 180);

    // Online Status Indicator Dot
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(W - 140, 160, 24, 0, Math.PI * 2);
    ctx.fill();

    // Photo Box Section
    const rx = 80;
    const ry = 340;
    const rw = W - 160;
    const rh = 1840;

    // Photo Background
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(rx, ry, rw, rh);

    if (frontTex.image && frontImage) {
      const img = frontTex.image;
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(rx, ry, rw, rh, 32);
      ctx.clip();

      const scale =
        imageFit === "contain"
          ? Math.min(rw / img.width, rh / img.height)
          : Math.max(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;

      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();

      // Border around photo
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.roundRect(rx, ry, rw, rh, 32);
      ctx.stroke();
    }

    // Lower Details Section
    ctx.fillStyle = "#0a0d12";
    ctx.font = "bold 96px 'JetBrains Mono', monospace";
    ctx.fillText("HARSHAL VARADE", 90, 2340);

    ctx.fillStyle = "#0284c7";
    ctx.font = "bold 56px 'JetBrains Mono', monospace";
    ctx.fillText("FULL-STACK & CREATIVE TECHNOLOGIST", 90, 2430);

    // Divider Line
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(90, 2480);
    ctx.lineTo(W - 90, 2480);
    ctx.stroke();

    // Spec Badges
    ctx.fillStyle = "#475569";
    ctx.font = "bold 44px 'JetBrains Mono', monospace";
    ctx.fillText("CORE: REACT • NEXT.JS • GSAP • AI", 90, 2570);
    ctx.fillText("LOCATION: PUNE, IN  //  PASS-VERIFIED", 90, 2640);

    // Barcode at Bottom
    ctx.fillStyle = "#0a0d12";
    for (let x = 90; x < W - 90; x += 22) {
      const barWidth = (x % 5 === 0 || x % 3 === 0) ? 14 : 7;
      ctx.fillRect(x, 2730, barWidth, 220);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    return texture;
  }, [frontImage, imageFit, frontTex]);

  // Back Card Texture (Technical Blueprint)
  const backCardMap = useMemo(() => {
    const W = 2048;
    const H = 3072;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.Texture();

    // Dark sleek blueprint slate back
    ctx.fillStyle = "#0a0d12";
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
    ctx.lineWidth = 12;
    ctx.strokeRect(40, 40, W - 80, H - 80);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 80px 'JetBrains Mono', monospace";
    ctx.fillText("SYSTEM SPECIFICATION", 120, 280);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "52px 'JetBrains Mono', monospace";
    ctx.fillText("ARCHITECT: HARSHAL VARADE", 120, 480);
    ctx.fillText("DISCIPLINE: FRONTEND & SYSTEMS", 120, 580);
    ctx.fillText("STATE: PRODUCTION READY", 120, 680);
    ctx.fillText("FPS TARGET: 60 FPS MOTION", 120, 780);

    // Decorative Blueprint Lines
    ctx.strokeStyle = "rgba(183, 200, 222, 0.25)";
    ctx.lineWidth = 4;
    for (let y = 920; y < 2400; y += 120) {
      ctx.beginPath();
      ctx.moveTo(120, y);
      ctx.lineTo(W - 120, y);
      ctx.stroke();
    }

    ctx.fillStyle = "#94a3b8";
    ctx.font = "40px 'JetBrains Mono', monospace";
    ctx.fillText("ENCRYPTED PASS CODE // 0x892F-PORTFOLIO-2025", 120, 2600);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    return texture;
  }, []);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation()
          );
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());

      if (band.current && band.current.geometry) {
        band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      }

      if (card.current) {
        ang.copy(card.current.angvel());
        rot.copy(card.current.rotation());
        card.current.setAngvel({
          x: ang.x,
          y: ang.y - rot.y * 0.25,
          z: ang.z,
        });
      }
    }
  });

  curve.curveType = "chordal";
  strapTexture.wrapS = strapTexture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 3.8, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.35, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody position={[0.7, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody position={[1.05, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>

        <RigidBody
          position={[1.4, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[1.1, 1.6, 0.05]} />
          <group
            scale={1.55}
            position={[0, -0.65, 0]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
          >
            {/* Front Card Face */}
            <mesh position={[0, 0, 0.021]} castShadow receiveShadow>
              <planeGeometry args={[1.5, 2.25]} />
              <meshStandardMaterial
                map={frontCardMap}
                roughness={0.35}
                metalness={0.05}
              />
            </mesh>

            {/* Back Card Face */}
            <mesh position={[0, 0, -0.021]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[1.5, 2.25]} />
              <meshStandardMaterial
                map={backCardMap}
                roughness={0.4}
                metalness={0.1}
              />
            </mesh>

            {/* Card Body Core / Rim (Light Slate Blueprint Edge) */}
            <mesh>
              <boxGeometry args={[1.52, 2.27, 0.04]} />
              <meshStandardMaterial
                color="#b7c8de"
                roughness={0.3}
                metalness={0.2}
              />
            </mesh>

            {/* Metallic Top Clamp Clip */}
            <mesh position={[0, 1.2, 0]}>
              <boxGeometry args={[0.55, 0.22, 0.09]} />
              <meshStandardMaterial
                color="#cbd5e1"
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>

            {/* Metallic Eyelet Ring */}
            <mesh position={[0, 1.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.13, 0.04, 16, 32]} />
              <meshStandardMaterial
                color="#94a3b8"
                metalness={0.95}
                roughness={0.15}
              />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* Lanyard Band (Dark Slate Ribbon) */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#0f172a"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap={false}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
