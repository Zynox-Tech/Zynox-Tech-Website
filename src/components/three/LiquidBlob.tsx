'use client';

import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 3D Simplex noise code in GLSL for the vertex shader
const noiseGLSL = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const vertexShader = `
${noiseGLSL}

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisplacement;

uniform float uTime;
uniform vec2 uMouse;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  
  // Calculate noise based on vertex position + time + mouse offset
  float noise = snoise(position * 1.5 + vec3(0.0, 0.0, uTime * 0.3) + vec3(uMouse * 0.4, 0.0));
  float displacement = noise * 0.35;
  vDisplacement = displacement;
  
  vec3 newPosition = position + normal * displacement;
  vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
  vViewPosition = -mvPosition.xyz;
  
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisplacement;

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uLightMode;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);
  
  // Classic glowing Fresnel outline
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
  
  // Blend colors
  vec3 baseColor = mix(uColor1, uColor2, vUv.y + vDisplacement * 0.5);
  
  // Mix in fresnel highlight
  vec3 finalColor = mix(baseColor, vec3(1.0), fresnel * 0.4);
  
  float alpha = mix(0.75, 0.85, fresnel);
  if (uLightMode > 0.5) {
    alpha = mix(0.65, 0.75, fresnel);
  }
  
  gl_FragColor = vec4(finalColor, alpha);
}
`;

// Inner component to handle animation states
function BlobMesh({ interactive = true, darkTheme = true }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Smoothly track mouse coordinates in Three coordinates
  const mouseTarget = useRef(new THREE.Vector2(0, 0));
  const mouseCurrent = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1]
      const mx = (e.clientX / window.innerWidth) * 2 - 1;
      const my = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseTarget.current.set(mx, my);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    
    if (materialRef.current) {
      // Update time uniform
      materialRef.current.uniforms.uTime.value = elapsed;

      // Lerp mouse coordinates for organic fluid lag
      mouseCurrent.current.lerp(mouseTarget.current, 0.05);
      materialRef.current.uniforms.uMouse.value.copy(mouseCurrent.current);
    }

    if (meshRef.current) {
      // Slow background rotation
      meshRef.current.rotation.y = elapsed * 0.05;
      meshRef.current.rotation.x = elapsed * 0.03;
    }
  });

  // Theme colors mapping
  // Dark mode: cool blue/purple accenting
  // Light mode: deeper royal blue/violet accenting
  const color1 = darkTheme ? new THREE.Color('#4F8CFF') : new THREE.Color('#2563EB');
  const color2 = darkTheme ? new THREE.Color('#C961F2') : new THREE.Color('#A21CAF');

  const uniforms = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor1: { value: color1 },
    uColor2: { value: color2 },
    uLightMode: { value: darkTheme ? 0.0 : 1.0 },
  });

  // Update uniforms when theme changes
  useEffect(() => {
    if (uniforms.current) {
      uniforms.current.uColor1.value.copy(color1);
      uniforms.current.uColor2.value.copy(color2);
      uniforms.current.uLightMode.value = darkTheme ? 0.0 : 1.0;
    }
  }, [darkTheme, color1, color2]);

  return (
    <mesh ref={meshRef} scale={1.8}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// Background starfield/ambient particles
function AmbientParticles({ count = 200, color = '#EDEEF0' }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random coords inside space
  const positions = useRef(
    new Float32Array(
      Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 10)
    )
  );

  useFrame((state) => {
    if (pointsRef.current) {
      // Drifting motion
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.3}
        depthWrite={false}
      />
    </points>
  );
}

interface LiquidBlobProps {
  interactive?: boolean;
  particles?: boolean;
}

export default function LiquidBlob({ interactive = true, particles = true }: LiquidBlobProps) {
  const [mounted, setMounted] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Check initial theme
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    setDarkTheme(theme === 'dark');

    // Watch mutations on the HTML data-theme attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const next = document.documentElement.getAttribute('data-theme') || 'dark';
          setDarkTheme(next === 'dark');
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 3, 4]} intensity={1.5} />
        <BlobMesh interactive={interactive} darkTheme={darkTheme} />
        {particles && (
          <AmbientParticles
            count={120}
            color={darkTheme ? '#EDEEF0' : '#14161A'}
          />
        )}
      </Canvas>
    </div>
  );
}
