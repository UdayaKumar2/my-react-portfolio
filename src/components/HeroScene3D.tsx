import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Play, Square } from 'lucide-react';
import portrait3dImg from '../assets/images/udayakumar_3d_portrait_1794631182260.jpg';
import { HeroFallbackVisual } from './HeroFallbackVisual';

export type FocusTargetId =
  | 'all'
  | 'portrait'
  | 'code'
  | 'react'
  | 'dotnet'
  | 'database'
  | 'docker';

interface HeroScene3DProps {
  isSoftwareGl: boolean;
  isCompact: boolean;
}

const FOCUS_LABELS: { id: FocusTargetId; label: string }[] = [
  { id: 'all', label: 'All Nodes' },
  { id: 'portrait', label: '3D Portrait' },
  { id: 'code', label: 'Code Editor' },
  { id: 'react', label: 'React' },
  { id: 'dotnet', label: 'C# / .NET' },
  { id: 'database', label: 'Database' },
  { id: 'docker', label: 'Docker' },
];

const TOUR_SEQUENCE: FocusTargetId[] = [
  'portrait',
  'code',
  'react',
  'dotnet',
  'database',
  'docker',
  'all',
];

const FOCUS_CAMERA_TARGETS: Record<
  FocusTargetId,
  { pos: [number, number, number]; look: [number, number, number] }
> = {
  all: { pos: [0, 0.25, 9.0], look: [0, 0, 0] },
  portrait: { pos: [-1.15, 0.2, 4.3], look: [-1.15, 0.12, 0.3] },
  code: { pos: [1.05, 0.2, 5.2], look: [1.05, 0.12, -0.1] },
  react: { pos: [-2.45, 1.55, 5.1], look: [-2.55, 1.45, -0.4] },
  dotnet: { pos: [2.45, 1.45, 5.1], look: [2.55, 1.35, -0.3] },
  database: { pos: [-2.35, -1.3, 5.0], look: [-2.45, -1.45, 0.1] },
  docker: { pos: [2.35, -1.2, 5.0], look: [2.45, -1.35, 0.2] },
};

const _targetPos = new THREE.Vector3();
const _targetLook = new THREE.Vector3();

function StudioEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    const roomEnv = new RoomEnvironment();
    const renderTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = renderTarget.texture;

    return () => {
      scene.environment = null;
      renderTarget.dispose();
      roomEnv.dispose();
      pmremGenerator.dispose();
    };
  }, [gl, scene]);

  return null;
}

function useCodeScreenTexture(maxAnisotropy: number) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 768;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#070B14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#10182A';
      ctx.fillRect(0, 0, canvas.width, 46);
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(0, 46, canvas.width, 2);

      ctx.fillStyle = '#38BDF8';
      ctx.fillRect(28, 44, 155, 3);
      ctx.font = '500 18px monospace';
      ctx.fillStyle = '#F8FAFC';
      ctx.fillText('MonitoringHub.cs', 36, 30);
      ctx.fillStyle = '#64748B';
      ctx.fillText('TechWiki.tsx', 215, 30);

      ctx.fillStyle = '#0B1120';
      ctx.fillRect(0, 48, 56, canvas.height - 48);

      const codeLines: { num: string; parts: { text: string; color: string }[] }[] = [
        {
          num: '01',
          parts: [
            { text: 'public class ', color: '#8B5CF6' },
            { text: 'TelemetryHub ', color: '#38BDF8' },
            { text: ': Hub', color: '#F8FAFC' },
          ],
        },
        { num: '02', parts: [{ text: '{', color: '#94A3B8' }] },
        {
          num: '03',
          parts: [
            { text: '  private readonly ', color: '#8B5CF6' },
            { text: 'IMetricsRepo ', color: '#38BDF8' },
            { text: '_repo;', color: '#F8FAFC' },
          ],
        },
        { num: '04', parts: [{ text: '', color: '#F8FAFC' }] },
        {
          num: '05',
          parts: [
            { text: '  public async ', color: '#8B5CF6' },
            { text: 'Task ', color: '#38BDF8' },
            { text: 'StreamMetrics(', color: '#F8FAFC' },
            { text: 'CancellationToken ct)', color: '#94A3B8' },
          ],
        },
        { num: '06', parts: [{ text: '  {', color: '#94A3B8' }] },
        {
          num: '07',
          parts: [
            { text: '    var ', color: '#8B5CF6' },
            { text: 'snapshot = ', color: '#F8FAFC' },
            { text: 'await ', color: '#8B5CF6' },
            { text: '_repo.GetLatestAsync(ct);', color: '#38BDF8' },
          ],
        },
        {
          num: '08',
          parts: [
            { text: '    await ', color: '#8B5CF6' },
            { text: 'Clients.All.SendAsync(', color: '#F8FAFC' },
            { text: '"metrics"', color: '#34D399' },
            { text: ', snapshot);', color: '#F8FAFC' },
          ],
        },
        { num: '09', parts: [{ text: '  }', color: '#94A3B8' }] },
        { num: '10', parts: [{ text: '}', color: '#94A3B8' }] },
        { num: '11', parts: [{ text: '// React + Zustand Client Store', color: '#64748B' }] },
        {
          num: '12',
          parts: [
            { text: 'const ', color: '#8B5CF6' },
            { text: 'useWikiStore = ', color: '#F8FAFC' },
            { text: 'create<WikiState>(', color: '#38BDF8' },
            { text: '(set) => ({ ... }));', color: '#94A3B8' },
          ],
        },
      ];

      ctx.font = '400 17px monospace';
      codeLines.forEach((line, idx) => {
        const y = 88 + idx * 33;
        ctx.fillStyle = '#475569';
        ctx.fillText(line.num, 16, y);

        let x = 74;
        for (const part of line.parts) {
          ctx.fillStyle = part.color;
          ctx.fillText(part.text, x, y);
          x += ctx.measureText(part.text).width;
        }
      });

      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.0)');
      grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.25)');
      grad.addColorStop(1, 'rgba(139, 92, 246, 0.0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 485, canvas.width, 3);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, maxAnisotropy);
    texture.needsUpdate = true;
    return texture;
  }, [maxAnisotropy]);
}

function useBadgeTexture(label: string, accentHex: string, maxAnisotropy: number) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0B1120';
      ctx.fillRect(0, 0, 256, 256);

      ctx.strokeStyle = accentHex;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(128, 128, 108, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#F8FAFC';
      ctx.font = '700 54px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, 128, 130);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, maxAnisotropy);
    texture.needsUpdate = true;
    return texture;
  }, [label, accentHex, maxAnisotropy]);
}

function useDockerPlateTexture(maxAnisotropy: number) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 160;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#070B14';
      ctx.fillRect(0, 0, 512, 160);

      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 6;
      ctx.strokeRect(8, 8, 496, 144);

      ctx.fillStyle = '#38BDF8';
      ctx.font = '700 58px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('DOCKER', 256, 82);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, maxAnisotropy);
    texture.needsUpdate = true;
    return texture;
  }, [maxAnisotropy]);
}

function ProfilePortraitModel({ highlighted }: { highlighted: boolean }) {
  const { gl } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const outerGyroRef = useRef<THREE.Mesh>(null);
  const innerGyroRef = useRef<THREE.Mesh>(null);
  const sat1Ref = useRef<THREE.Mesh>(null);
  const sat2Ref = useRef<THREE.Mesh>(null);

  const { canvas, texture } = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 680;
    const ctx = c.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, 680);
      grad.addColorStop(0, '#10182A');
      grad.addColorStop(1, '#080B16');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 680);
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 4;
      ctx.strokeRect(12, 12, 488, 656);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    tex.needsUpdate = true;
    return { canvas: c, texture: tex };
  }, [gl]);

  useEffect(() => {
    let cancelled = false;
    texture.needsUpdate = true;

    const paintPortrait = (img: HTMLImageElement) => {
      if (cancelled) return;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const edgeGrad = ctx.createLinearGradient(0, canvas.height - 90, 0, canvas.height);
        edgeGrad.addColorStop(0, 'rgba(8, 11, 22, 0)');
        edgeGrad.addColorStop(1, 'rgba(8, 11, 22, 0.72)');
        ctx.fillStyle = edgeGrad;
        ctx.fillRect(0, canvas.height - 90, canvas.width, 90);

        ctx.fillStyle = '#F8FAFC';
        ctx.font = '700 24px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('UDAYAKUMAR P', 24, canvas.height - 42);
        ctx.fillStyle = '#38BDF8';
        ctx.font = '500 16px monospace';
        ctx.fillText('FULL STACK DEVELOPER', 24, canvas.height - 18);

        texture.needsUpdate = true;
      }
    };

    const img = new Image();
    img.decoding = 'async';
    img.onload = () => paintPortrait(img);
    img.src = portrait3dImg;
    if (img.complete && img.naturalWidth > 0) {
      paintPortrait(img);
    }

    return () => {
      cancelled = true;
      texture.dispose();
    };
  }, [canvas, texture]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = 0.22 + Math.sin(t * 0.7) * 0.14;
    }
    if (outerGyroRef.current) {
      outerGyroRef.current.rotation.z += delta * 0.38;
      outerGyroRef.current.rotation.y = Math.sin(t * 0.5) * 0.25;
    }
    if (innerGyroRef.current) {
      innerGyroRef.current.rotation.z -= delta * 0.55;
      innerGyroRef.current.rotation.x = Math.cos(t * 0.6) * 0.28;
    }
    if (sat1Ref.current) {
      sat1Ref.current.position.set(Math.cos(t * 1.4) * 1.28, Math.sin(t * 1.4) * 1.28, -0.16);
    }
    if (sat2Ref.current) {
      sat2Ref.current.position.set(Math.cos(-t * 1.1) * 1.08, 0.15, Math.sin(-t * 1.1) * 0.62 - 0.12);
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.14} floatIntensity={0.34}>
      <group ref={groupRef} position={[-1.15, 0.12, 0.3]} rotation={[0.04, 0.22, 0]}>
        <mesh>
          <boxGeometry args={[1.64, 2.14, 0.12]} />
          <meshStandardMaterial color="#10182A" metalness={0.82} roughness={0.24} />
        </mesh>

        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[1.76, 2.26, 0.08]} />
          <meshStandardMaterial
            color={highlighted ? '#38BDF8' : '#334155'}
            metalness={0.88}
            roughness={0.2}
            emissive={highlighted ? '#38BDF8' : '#000000'}
            emissiveIntensity={highlighted ? 0.45 : 0}
          />
        </mesh>

        <mesh position={[0, 0.02, 0.068]}>
          <planeGeometry args={[1.48, 1.94]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.22}
            metalness={0.05}
            emissive="#ffffff"
            emissiveMap={texture}
            emissiveIntensity={0.55}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh position={[0, 1.04, 0.07]}>
          <boxGeometry args={[1.1, 0.03, 0.03]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={highlighted ? 1.2 : 0.7}
          />
        </mesh>
        <mesh position={[0, -0.99, 0.07]}>
          <boxGeometry args={[1.25, 0.035, 0.03]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#38BDF8"
            emissiveIntensity={highlighted ? 1.2 : 0.7}
          />
        </mesh>

        <mesh ref={outerGyroRef} position={[0, 0, -0.16]}>
          <torusGeometry args={[1.28, 0.022, 14, 56]} />
          <meshStandardMaterial
            color="#38BDF8"
            metalness={0.82}
            roughness={0.2}
            emissive="#38BDF8"
            emissiveIntensity={highlighted ? 0.9 : 0.4}
          />
        </mesh>
        <mesh ref={innerGyroRef} position={[0, 0, -0.12]}>
          <torusGeometry args={[1.08, 0.018, 12, 48]} />
          <meshStandardMaterial
            color="#8B5CF6"
            metalness={0.8}
            roughness={0.2}
            emissive="#8B5CF6"
            emissiveIntensity={highlighted ? 0.9 : 0.4}
          />
        </mesh>

        <mesh ref={sat1Ref}>
          <octahedronGeometry args={[0.065, 0]} />
          <meshStandardMaterial color="#F8FAFC" emissive="#38BDF8" emissiveIntensity={1.2} />
        </mesh>
        <mesh ref={sat2Ref}>
          <sphereGeometry args={[0.055, 14, 14]} />
          <meshStandardMaterial color="#F8FAFC" emissive="#8B5CF6" emissiveIntensity={1.2} />
        </mesh>
      </group>
    </Float>
  );
}

function CodeEditorModel({ highlighted }: { highlighted: boolean }) {
  const { gl } = useThree();
  const maxAniso = gl.capabilities.getMaxAnisotropy();
  const screenTexture = useCodeScreenTexture(maxAniso);

  useEffect(() => {
    return () => {
      screenTexture.dispose();
    };
  }, [screenTexture]);

  return (
    <Float speed={1.5} rotationIntensity={0.14} floatIntensity={0.26}>
      <group position={[1.05, 0.12, -0.1]} rotation={[0.05, -0.22, 0]} scale={0.84}>
        <mesh>
          <boxGeometry args={[3.2, 2.05, 0.14]} />
          <meshStandardMaterial color="#10182A" metalness={0.78} roughness={0.26} />
        </mesh>

        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[3.32, 2.17, 0.08]} />
          <meshStandardMaterial
            color={highlighted ? '#38BDF8' : '#334155'}
            metalness={0.85}
            roughness={0.22}
            emissive={highlighted ? '#38BDF8' : '#000000'}
            emissiveIntensity={highlighted ? 0.35 : 0}
          />
        </mesh>

        <mesh position={[0, 0, 0.075]}>
          <planeGeometry args={[2.98, 1.86]} />
          <meshStandardMaterial
            map={screenTexture}
            roughness={0.18}
            metalness={0.05}
            emissive="#ffffff"
            emissiveMap={screenTexture}
            emissiveIntensity={0.45}
          />
        </mesh>

        <mesh position={[0, 1.07, 0.03]}>
          <boxGeometry args={[1.6, 0.04, 0.06]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#38BDF8"
            emissiveIntensity={0.85}
            metalness={0.4}
            roughness={0.2}
          />
        </mesh>

        {[-0.8, 0, 0.8].map((x) => (
          <mesh key={x} position={[x, 0, -0.11]}>
            <boxGeometry args={[0.16, 1.45, 0.08]} />
            <meshStandardMaterial color="#1E293B" metalness={0.82} roughness={0.34} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function ReactSymbolModel({ highlighted }: { highlighted: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const electron1 = useRef<THREE.Mesh>(null);
  const electron2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.12;
    }
    if (electron1.current) {
      electron1.current.position.set(Math.cos(t * 2.1) * 0.82, Math.sin(t * 2.1) * 0.3, 0);
    }
    if (electron2.current) {
      electron2.current.position.set(
        Math.cos(-t * 1.8 + 1.5) * 0.82,
        0,
        Math.sin(-t * 1.8 + 1.5) * 0.3
      );
    }
  });

  const ringMaterialProps = {
    color: '#38BDF8',
    metalness: 0.72,
    roughness: 0.2,
    emissive: '#38BDF8',
    emissiveIntensity: highlighted ? 0.9 : 0.35,
  };

  return (
    <Float speed={1.9} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef} position={[-2.55, 1.45, -0.4]} scale={0.85}>
        <mesh>
          <sphereGeometry args={[0.19, 24, 24]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#38BDF8"
            emissiveIntensity={highlighted ? 1.4 : 0.8}
            metalness={0.3}
            roughness={0.15}
          />
        </mesh>

        <mesh rotation={[0.45, 0.2, 0]}>
          <torusGeometry args={[0.82, 0.032, 16, 48]} />
          <meshStandardMaterial {...ringMaterialProps} />
        </mesh>
        <mesh rotation={[0.45, 0.2, Math.PI / 3]}>
          <torusGeometry args={[0.82, 0.032, 16, 48]} />
          <meshStandardMaterial {...ringMaterialProps} />
        </mesh>
        <mesh rotation={[0.45, 0.2, -Math.PI / 3]}>
          <torusGeometry args={[0.82, 0.032, 16, 48]} />
          <meshStandardMaterial {...ringMaterialProps} />
        </mesh>

        <mesh ref={electron1}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color="#F8FAFC" emissive="#38BDF8" emissiveIntensity={1.0} />
        </mesh>
        <mesh ref={electron2}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color="#F8FAFC" emissive="#8B5CF6" emissiveIntensity={1.0} />
        </mesh>
      </group>
    </Float>
  );
}

function DotNetModuleModel({ highlighted }: { highlighted: boolean }) {
  const { gl } = useThree();
  const maxAniso = gl.capabilities.getMaxAnisotropy();
  const badgeTexture = useBadgeTexture('C#', '#8B5CF6', maxAniso);

  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    return () => {
      badgeTexture.dispose();
    };
  }, [badgeTexture]);

  useFrame((_, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.45;
      outerRingRef.current.rotation.x += delta * 0.2;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y -= delta * 0.6;
    }
  });

  return (
    <Float speed={1.7} rotationIntensity={0.22} floatIntensity={0.38}>
      <group position={[2.55, 1.35, -0.3]} scale={0.9}>
        <mesh>
          <icosahedronGeometry args={[0.44, 0]} />
          <meshStandardMaterial
            color="#8B5CF6"
            metalness={0.85}
            roughness={0.2}
            emissive="#8B5CF6"
            emissiveIntensity={highlighted ? 0.65 : 0.2}
          />
        </mesh>

        <mesh position={[0, 0, 0.46]}>
          <circleGeometry args={[0.3, 32]} />
          <meshStandardMaterial
            map={badgeTexture}
            metalness={0.2}
            roughness={0.3}
            emissive="#ffffff"
            emissiveMap={badgeTexture}
            emissiveIntensity={0.3}
          />
        </mesh>

        <mesh ref={outerRingRef} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.72, 0.036, 16, 48]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.92} roughness={0.18} />
        </mesh>
        <mesh ref={innerRingRef} rotation={[0, Math.PI / 3, 0]}>
          <torusGeometry args={[0.58, 0.028, 16, 48]} />
          <meshStandardMaterial
            color="#8B5CF6"
            metalness={0.75}
            roughness={0.25}
            emissive="#8B5CF6"
            emissiveIntensity={0.45}
          />
        </mesh>
      </group>
    </Float>
  );
}

function DatabaseStackModel({ highlighted }: { highlighted: boolean }) {
  const stackRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (stackRef.current) {
      stackRef.current.rotation.y += delta * 0.28;
      stackRef.current.position.y = -1.45 + Math.sin(t * 1.3) * 0.08;
    }
  });

  const diskPositions = [0.34, 0, -0.34];

  return (
    <group ref={stackRef} position={[-2.45, -1.45, 0.1]} scale={0.9}>
      {diskPositions.map((y, index) => (
        <group key={index} position={[0, y, 0]}>
          <mesh>
            <cylinderGeometry args={[0.54, 0.54, 0.22, 32]} />
            <meshStandardMaterial color="#1E293B" metalness={0.82} roughness={0.24} />
          </mesh>
          <mesh position={[0, 0.115, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.52, 0.022, 12, 36]} />
            <meshStandardMaterial
              color="#38BDF8"
              emissive="#38BDF8"
              emissiveIntensity={highlighted ? 1.1 : 0.55}
              metalness={0.5}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}

      {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.55, 0, Math.sin(angle) * 0.55]}>
          <boxGeometry args={[0.05, 0.92, 0.05]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.88} roughness={0.22} />
        </mesh>
      ))}
    </group>
  );
}

function DockerClusterModel({ highlighted }: { highlighted: boolean }) {
  const { gl } = useThree();
  const maxAniso = gl.capabilities.getMaxAnisotropy();
  const dockerTexture = useDockerPlateTexture(maxAniso);

  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    return () => {
      dockerTexture.dispose();
    };
  }, [dockerTexture]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.28;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.45;
    }
  });

  // Classic Docker-inspired stacked 3D container blocks on a metallic carrier deck
  const containers: { pos: [number, number, number]; color: string }[] = [
    { pos: [-0.36, 0.02, 0], color: '#38BDF8' },
    { pos: [0, 0.02, 0], color: '#0EA5E9' },
    { pos: [0.36, 0.02, 0], color: '#38BDF8' },
    { pos: [-0.18, 0.3, 0], color: '#8B5CF6' },
    { pos: [0.18, 0.3, 0], color: '#38BDF8' },
    { pos: [0, 0.58, 0], color: '#0284C7' },
  ];

  return (
    <Float speed={1.6} rotationIntensity={0.18} floatIntensity={0.34}>
      <group ref={groupRef} position={[2.45, -1.35, 0.2]} scale={0.92}>
        {/* Metallic carrier hull deck */}
        <mesh position={[0, -0.22, 0]}>
          <boxGeometry args={[1.38, 0.2, 0.66]} />
          <meshStandardMaterial color="#10182A" metalness={0.85} roughness={0.24} />
        </mesh>

        {/* Glowing front hull keel strip */}
        <mesh position={[0, -0.33, 0]}>
          <boxGeometry args={[1.22, 0.04, 0.56]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#38BDF8"
            emissiveIntensity={highlighted ? 1.1 : 0.5}
          />
        </mesh>

        {/* Front DOCKER identification plate */}
        <mesh position={[0, -0.22, 0.335]}>
          <planeGeometry args={[0.92, 0.16]} />
          <meshStandardMaterial
            map={dockerTexture}
            roughness={0.25}
            metalness={0.1}
            emissive="#ffffff"
            emissiveMap={dockerTexture}
            emissiveIntensity={0.45}
          />
        </mesh>

        {/* Stacked 3D Container Modules with metallic rib frames */}
        {containers.map((c, idx) => (
          <group key={idx} position={c.pos}>
            <mesh>
              <boxGeometry args={[0.31, 0.24, 0.44]} />
              <meshStandardMaterial
                color={c.color}
                metalness={0.62}
                roughness={0.26}
                emissive={c.color}
                emissiveIntensity={highlighted ? 0.55 : 0.18}
              />
            </mesh>
            {/* Container rib collar */}
            <mesh>
              <boxGeometry args={[0.325, 0.04, 0.455]} />
              <meshStandardMaterial color="#CBD5E1" metalness={0.9} roughness={0.18} />
            </mesh>
          </group>
        ))}

        {/* Orbiting container orchestration ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0.25, 0]} position={[0, 0.12, 0]}>
          <torusGeometry args={[0.92, 0.018, 12, 48]} />
          <meshStandardMaterial
            color="#38BDF8"
            metalness={0.8}
            roughness={0.2}
            emissive="#38BDF8"
            emissiveIntensity={highlighted ? 0.95 : 0.35}
          />
        </mesh>
      </group>
    </Float>
  );
}

function AbstractPolyhedra({ isCompact }: { isCompact: boolean }) {
  const polyRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (polyRef.current) {
      polyRef.current.rotation.x += delta * 0.22;
      polyRef.current.rotation.y += delta * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.35;
    }
  });

  return (
    <>
      <group ref={polyRef} position={[0, 2.05, -1.2]}>
        <mesh>
          <octahedronGeometry args={[0.36, 0]} />
          <meshStandardMaterial
            color="#38BDF8"
            wireframe
            emissive="#38BDF8"
            emissiveIntensity={0.4}
          />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial color="#8B5CF6" metalness={0.85} roughness={0.18} />
        </mesh>
      </group>

      {!isCompact && (
        <mesh ref={ringRef} position={[0, -2.15, -1.4]} rotation={[Math.PI / 3, 0.2, 0]}>
          <torusGeometry args={[1.4, 0.015, 12, 64]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
        </mesh>
      )}
    </>
  );
}

function StarFieldNodes({ count }: { count: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const seed1 = Math.sin(i * 12.9898) * 43758.5453;
      const seed2 = Math.sin(i * 78.233) * 43758.5453;
      const seed3 = Math.sin(i * 39.425) * 43758.5453;
      arr[i * 3] = ((seed1 - Math.floor(seed1)) - 0.5) * 14;
      arr[i * 3 + 1] = ((seed2 - Math.floor(seed2)) - 0.5) * 9;
      arr[i * 3 + 2] = -2.5 - (seed3 - Math.floor(seed3)) * 5;
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#38BDF8"
        size={0.045}
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

function SceneRig({
  focusTarget,
  isCompact,
  isSoftwareGl,
}: {
  focusTarget: FocusTargetId;
  isCompact: boolean;
  isSoftwareGl: boolean;
}) {
  const masterGroupRef = useRef<THREE.Group>(null);
  const { camera, pointer } = useThree();

  useFrame((_, delta) => {
    if (masterGroupRef.current && !isSoftwareGl) {
      masterGroupRef.current.rotation.y = THREE.MathUtils.damp(
        masterGroupRef.current.rotation.y,
        pointer.x * 0.18,
        3.5,
        delta
      );
      masterGroupRef.current.rotation.x = THREE.MathUtils.damp(
        masterGroupRef.current.rotation.x,
        -pointer.y * 0.12,
        3.5,
        delta
      );
    }

    const preset = FOCUS_CAMERA_TARGETS[focusTarget];
    _targetPos.set(preset.pos[0], preset.pos[1], preset.pos[2]);
    _targetLook.set(preset.look[0], preset.look[1], preset.look[2]);

    camera.position.x = THREE.MathUtils.damp(camera.position.x, _targetPos.x, 3.6, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, _targetPos.y, 3.6, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, _targetPos.z, 3.6, delta);
    camera.lookAt(_targetLook);
  });

  return (
    <>
      <color attach="background" args={['#080B16']} />
      <fog attach="fog" args={['#080B16', 10, 22]} />
      <StudioEnvironment />

      <hemisphereLight args={['#38BDF8', '#080B16', 0.7]} />
      <directionalLight position={[6, 7, 5]} intensity={1.8} color="#FFF7ED" />
      <directionalLight position={[-6, 3, -4]} intensity={1.1} color="#8B5CF6" />
      <pointLight position={[0, 1.5, 3.5]} intensity={1.2} color="#38BDF8" distance={10} />

      <group ref={masterGroupRef}>
        <ProfilePortraitModel highlighted={focusTarget === 'portrait'} />
        <CodeEditorModel highlighted={focusTarget === 'code'} />
        <ReactSymbolModel highlighted={focusTarget === 'react'} />
        <DotNetModuleModel highlighted={focusTarget === 'dotnet'} />
        <DatabaseStackModel highlighted={focusTarget === 'database'} />
        <DockerClusterModel highlighted={focusTarget === 'docker'} />
        <AbstractPolyhedra isCompact={isCompact} />
      </group>

      <StarFieldNodes count={isCompact ? 45 : 110} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping={!isSoftwareGl}
        dampingFactor={0.05}
        maxPolarAngle={Math.PI * 0.62}
        minPolarAngle={Math.PI * 0.35}
        maxAzimuthAngle={Math.PI * 0.25}
        minAzimuthAngle={-Math.PI * 0.25}
      />
    </>
  );
}

export default function HeroScene3D({ isSoftwareGl, isCompact }: HeroScene3DProps) {
  const [focusTarget, setFocusTarget] = useState<FocusTargetId>('all');
  const [tourActive, setTourActive] = useState(false);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    if (!tourActive) return;
    let index = 0;
    setFocusTarget(TOUR_SEQUENCE[0]);
    const interval = window.setInterval(() => {
      index = (index + 1) % TOUR_SEQUENCE.length;
      setFocusTarget(TOUR_SEQUENCE[index]);
    }, 2600);
    return () => window.clearInterval(interval);
  }, [tourActive]);

  const handleSelectTarget = (id: FocusTargetId) => {
    setTourActive(false);
    setFocusTarget(id);
  };

  if (contextLost) {
    return <HeroFallbackVisual reason="unavailable" />;
  }

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[540px] rounded-2xl border border-slate-800/80 bg-[#080B16] overflow-hidden">
      <Canvas
        dpr={isSoftwareGl ? 1 : isCompact ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0.25, 9.0], fov: 42, near: 0.1, far: 40 }}
        gl={{
          antialias: !isSoftwareGl,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.1;

          const canvas = gl.domElement;
          const handleLost = (e: Event) => {
            e.preventDefault();
            setContextLost(true);
          };
          const handleRestored = () => {
            setContextLost(false);
          };
          canvas.addEventListener('webglcontextlost', handleLost, false);
          canvas.addEventListener('webglcontextrestored', handleRestored, false);
        }}
        className="w-full h-full"
      >
        <SceneRig
          focusTarget={focusTarget}
          isCompact={isCompact}
          isSoftwareGl={isSoftwareGl}
        />
      </Canvas>

      {/* Top Subtle Interaction Hint + Tour Control */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
        <span className="pointer-events-none text-[11px] font-mono text-[#94A3B8]">
          Interactive 3D Stack
        </span>
        <button
          type="button"
          onClick={() => setTourActive((prev) => !prev)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            tourActive
              ? 'bg-[#38BDF8] text-[#080B16] border-[#38BDF8] font-semibold'
              : 'bg-[#10182A]/90 text-[#F8FAFC] border-slate-800 hover:border-[#38BDF8]/50'
          }`}
        >
          {tourActive ? (
            <>
              <Square className="w-3 h-3" />
              <span>Stop Tour</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3" />
              <span>3D Orbit Tour</span>
            </>
          )}
        </button>
      </div>

      {/* Bottom Dock Node Selector (No backdrop-filter over WebGL) */}
      <div className="absolute bottom-3 left-3 right-3 flex justify-center">
        <div
          role="tablist"
          aria-label="Focus 3D Technology Node"
          className="inline-flex flex-wrap items-center justify-center gap-1 p-1 rounded-xl border border-slate-800 bg-[#10182A]/95 shadow-xl"
        >
          {FOCUS_LABELS.map((item) => {
            const active = focusTarget === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleSelectTarget(item.id)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#38BDF8] text-[#080B16] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
