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

if (typeof window !== "undefined") {
  const origWarn = console.warn;
  console.warn = (...args) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("THREE.Clock: This module has been deprecated") ||
       args[0].includes("using deprecated parameters for the initialization function") ||
       args[0].includes("Invalid scope"))
    ) {
      return;
    }
    origWarn.apply(console, args);
  };
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

  // 2048 x 3072 Ultra-Crisp Realistic Engineering ID Badge
  const frontCardMap = useMemo(() => {
    const W = 2048;
    const H = 3072;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.Texture();

    // 1. Crisp Card Base (Off-white security substrate)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);

    // Subtle micro-grid security watermark background
    ctx.strokeStyle = "rgba(226, 232, 240, 0.45)";
    ctx.lineWidth = 2;
    for (let x = 60; x < W - 60; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 60);
      ctx.lineTo(x, H - 60);
      ctx.stroke();
    }
    for (let y = 60; y < H - 60; y += 60) {
      ctx.beginPath();
      ctx.moveTo(60, y);
      ctx.lineTo(W - 60, y);
      ctx.stroke();
    }

    // Outer card edge hairline
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, W - 60, H - 60);

    // 2. Badge Clip Slot Cutout (Top center pill slot hole)
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.roundRect(W / 2 - 160, 60, 320, 70, 35);
    ctx.fill();

    // 3. Top Security Header Bar
    ctx.fillStyle = "#0a0d12";
    ctx.beginPath();
    ctx.roundRect(60, 170, W - 120, 240, 24);
    ctx.fill();

    // Header Typography
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 56px 'JetBrains Mono', monospace";
    ctx.fillText("ENGINEERING IDENTITY // PASS", 110, 280);

    // Status Indicator Badge
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(W - 240, 290, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#6ee7b7";
    ctx.font = "bold 38px 'JetBrains Mono', monospace";
    ctx.fillText("ACTIVE", W - 200, 302);

    // 4. Gold EMV Smart Chip (Realistic Credit/Security Chip)
    const chipX = 110;
    const chipY = 460;
    const chipW = 280;
    const chipH = 220;

    // Gold base gradient
    const chipGrad = ctx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
    chipGrad.addColorStop(0, "#fbbf24");
    chipGrad.addColorStop(0.5, "#d97706");
    chipGrad.addColorStop(1, "#f59e0b");
    ctx.fillStyle = chipGrad;
    ctx.beginPath();
    ctx.roundRect(chipX, chipY, chipW, chipH, 24);
    ctx.fill();

    // Smart chip inner etched circuit lines
    ctx.strokeStyle = "#78350f";
    ctx.lineWidth = 6;
    ctx.strokeRect(chipX + 24, chipY + 24, chipW - 48, chipH - 48);
    ctx.beginPath();
    ctx.moveTo(chipX + chipW / 2, chipY + 24);
    ctx.lineTo(chipX + chipW / 2, chipY + chipH - 24);
    ctx.moveTo(chipX + 24, chipY + chipH / 2);
    ctx.lineTo(chipX + chipW - 24, chipY + chipH / 2);
    ctx.stroke();

    // Chip ID Label
    ctx.fillStyle = "#64748b";
    ctx.font = "bold 36px 'JetBrains Mono', monospace";
    ctx.fillText("RFID // NFC PASS", chipX + chipW + 40, chipY + 120);

    ctx.fillStyle = "#0a0d12";
    ctx.font = "bold 44px 'JetBrains Mono', monospace";
    ctx.fillText("AUTH CODE: HV-9201-DEV", chipX + chipW + 40, chipY + 180);

    // 5. Portrait Photo Section (Centered, Realistic Passport Frame)
    const px = 110;
    const py = 730;
    const pw = W - 220;
    const ph = 1380;

    // Outer photo frame background
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(px, py, pw, ph);

    if (frontTex.image && frontImage) {
      const img = frontTex.image;
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(px, py, pw, ph, 32);
      ctx.clip();

      const scale =
        imageFit === "contain"
          ? Math.min(pw / img.width, ph / img.height)
          : Math.max(pw / img.width, ph / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = px + (pw - dw) / 2;
      const dy = py + (ph - dh) / 2;

      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();

      // Sharp industrial photo border
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.roundRect(px, py, pw, ph, 32);
      ctx.stroke();
    }

    // Photo Watermark Stamp
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.font = "bold 34px 'JetBrains Mono', monospace";
    ctx.fillText("VERIFIED CANDIDATE // HARSHAL VARADE", px + 40, py + ph - 40);

    // 6. Identity & Metadata Block
    ctx.fillStyle = "#0a0d12";
    ctx.font = "bold 96px 'JetBrains Mono', monospace";
    ctx.fillText("HARSHAL VARADE", 110, 2260);

    ctx.fillStyle = "#0284c7";
    ctx.font = "bold 56px 'JetBrains Mono', monospace";
    ctx.fillText("FULL-STACK SOFTWARE ENGINEER", 110, 2345);

    // Hairline divider
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(110, 2390);
    ctx.lineTo(W - 110, 2390);
    ctx.stroke();

    // Two-column metadata telemetry
    ctx.fillStyle = "#475569";
    ctx.font = "bold 40px 'JetBrains Mono', monospace";
    ctx.fillText("SPEC: REACT • NEXT.JS • NODE • GSAP", 110, 2465);
    ctx.fillText("LOCATION: PUNE, INDIA (18.52° N, 73.85° E)", 110, 2530);
    ctx.fillText("CLEARANCE: FULL-STACK & SYSTEMS ARCHITECTURE", 110, 2595);

    // 7. Holographic Foil Security Strip
    const holoGrad = ctx.createLinearGradient(110, 2640, W - 110, 2690);
    holoGrad.addColorStop(0, "rgba(203, 213, 225, 0.7)");
    holoGrad.addColorStop(0.25, "rgba(147, 197, 253, 0.7)");
    holoGrad.addColorStop(0.5, "rgba(253, 230, 138, 0.7)");
    holoGrad.addColorStop(0.75, "rgba(216, 180, 254, 0.7)");
    holoGrad.addColorStop(1, "rgba(167, 243, 208, 0.7)");
    ctx.fillStyle = holoGrad;
    ctx.fillRect(110, 2640, W - 220, 45);

    // 8. Authentic Scannable Barcode & Serial
    ctx.fillStyle = "#0a0d12";
    for (let x = 110; x < W - 110; x += 18) {
      const barWidth = (x % 5 === 0 || x % 7 === 0) ? 12 : 6;
      ctx.fillRect(x, 2730, barWidth, 190);
    }

    ctx.fillStyle = "#64748b";
    ctx.font = "38px 'JetBrains Mono', monospace";
    ctx.fillText("*HV - 0 7 9 4 - 5 0 3 2 - 2 0 2 6*", W / 2 - 340, 2980);

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

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.6]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.6]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.6]);
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
      const safeDelta = Math.min(Math.max(delta, 0), 0.05);
      [j1, j2].forEach((ref) => {
        if (!ref.current) return;
        const trans = ref.current.translation();
        if (!trans || !Number.isFinite(trans.x) || !Number.isFinite(trans.y) || !Number.isFinite(trans.z)) {
          return;
        }

        if (!ref.current.lerped || !Number.isFinite(ref.current.lerped.x)) {
          ref.current.lerped = new THREE.Vector3().copy(trans);
        }
        const dist = ref.current.lerped.distanceTo(trans);
        const clampedDistance = Math.max(0.1, Math.min(1, Number.isFinite(dist) ? dist : 0.5));
        const alpha = Math.min(1, Math.max(0, safeDelta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))));
        ref.current.lerped.lerp(trans, alpha);
      });

      const p0 = j3.current?.translation();
      const p1 = j2.current?.lerped;
      const p2 = j1.current?.lerped;
      const p3 = fixed.current?.translation();

      if (
        p0 && Number.isFinite(p0.x) && Number.isFinite(p0.y) && Number.isFinite(p0.z) &&
        p1 && Number.isFinite(p1.x) && Number.isFinite(p1.y) && Number.isFinite(p1.z) &&
        p2 && Number.isFinite(p2.x) && Number.isFinite(p2.y) && Number.isFinite(p2.z) &&
        p3 && Number.isFinite(p3.x) && Number.isFinite(p3.y) && Number.isFinite(p3.z)
      ) {
        curve.points[0].copy(p0);
        curve.points[1].copy(p1);
        curve.points[2].copy(p2);
        curve.points[3].copy(p3);

        if (band.current && band.current.geometry) {
          const pts = curve.getPoints(isMobile ? 16 : 32);
          const allFinite = pts.every(
            (p) => Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.z)
          );
          if (allFinite) {
            band.current.geometry.setPoints(pts);
          }
        }
      }

      if (card.current) {
        const cardAng = card.current.angvel();
        const cardRot = card.current.rotation();
        if (cardAng && cardRot && Number.isFinite(cardAng.x) && Number.isFinite(cardRot.y)) {
          ang.copy(cardAng);
          rot.copy(cardRot);
          card.current.setAngvel({
            x: ang.x,
            y: ang.y - rot.y * 0.25,
            z: ang.z,
          });
        }
      }
    }
  });

  curve.curveType = "chordal";
  strapTexture.wrapS = strapTexture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 2.4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.2, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody position={[0.4, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody position={[0.6, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>

        <RigidBody
          position={[0.8, 0, 0]}
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
            <mesh position={[0, 0, 0.022]} castShadow receiveShadow>
              <planeGeometry args={[1.5, 2.25]} />
              <meshStandardMaterial
                map={frontCardMap}
                roughness={0.25}
                metalness={0.08}
              />
            </mesh>

            {/* Back Card Face */}
            <mesh position={[0, 0, -0.022]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[1.5, 2.25]} />
              <meshStandardMaterial
                map={backCardMap}
                roughness={0.3}
                metalness={0.12}
              />
            </mesh>

            {/* Inner Card White Core */}
            <mesh>
              <boxGeometry args={[1.5, 2.25, 0.035]} />
              <meshStandardMaterial
                color="#ffffff"
                roughness={0.4}
                metalness={0.05}
              />
            </mesh>

            {/* Clear Protective Acrylic Badge Sleeve / Beveled Outer Rim */}
            <mesh>
              <boxGeometry args={[1.58, 2.33, 0.05]} />
              <meshPhysicalMaterial
                color="#ffffff"
                transparent
                opacity={0.35}
                roughness={0.12}
                metalness={0.1}
                clearcoat={1}
                clearcoatRoughness={0.08}
                transmission={0.65}
                ior={1.45}
              />
            </mesh>

            {/* Top Badge Slot Punch-Hole Border */}
            <mesh position={[0, 1.05, 0]}>
              <boxGeometry args={[0.32, 0.08, 0.06]} />
              <meshStandardMaterial
                color="#0f172a"
                roughness={0.8}
              />
            </mesh>

            {/* Heavy-Duty Chrome Top Clamp / Lanyard Clasp */}
            <mesh position={[0, 1.18, 0]}>
              <boxGeometry args={[0.42, 0.18, 0.09]} />
              <meshStandardMaterial
                color="#f1f5f9"
                metalness={0.95}
                roughness={0.12}
              />
            </mesh>

            {/* Chrome Rivet Pins on Clamp */}
            <mesh position={[-0.14, 1.18, 0.05]}>
              <cylinderGeometry args={[0.025, 0.025, 0.015, 16]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
            </mesh>
            <mesh position={[0.14, 1.18, 0.05]}>
              <cylinderGeometry args={[0.025, 0.025, 0.015, 16]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
            </mesh>

            {/* Chrome Swivel Carabiner Loop */}
            <mesh position={[0, 1.34, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.12, 0.035, 16, 32]} />
              <meshStandardMaterial
                color="#f8fafc"
                metalness={0.98}
                roughness={0.1}
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
