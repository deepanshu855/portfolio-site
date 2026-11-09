"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function SignalOrb({ lightTheme }: { lightTheme: boolean }) {
  const group = useRef<THREE.Group>(null);
  const shader = useRef<THREE.ShaderMaterial>(null);
  const material = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uTime: { value: 0 }, uPointer: { value: new THREE.Vector2(0, 0) } },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uTime;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec3 p = position;
        float wave = sin(p.y * 8.0 + uTime * 0.55) * 0.012;
        p += normal * wave;
        vPosition = p;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uTime;
      uniform vec2 uPointer;
      void main() {
        float rim = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.0);
        float bands = 0.5 + 0.5 * sin(vUv.y * 95.0 + uTime * 0.55 + uPointer.x * 1.8);
        float latitude = smoothstep(0.87, 1.0, bands);
        float glow = rim * 0.42 + latitude * 0.24;
        vec3 deep = ${lightTheme ? "vec3(0.015, 0.25, 0.23)" : "vec3(0.025, 0.12, 0.16)"};
        vec3 mint = ${lightTheme ? "vec3(0.0, 0.58, 0.49)" : "vec3(0.43, 0.95, 0.83)"};
        vec3 color = mix(deep, mint, clamp(glow * 1.9, 0.0, 1.0));
        float alpha = ${lightTheme ? "0.18 + glow * 0.82" : "0.12 + glow * 0.72"};
        gl_FragColor = vec4(color, alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  }), [lightTheme]);

  useFrame((state, delta) => {
    if (shader.current) {
      shader.current.uniforms.uTime.value += delta;
      shader.current.uniforms.uPointer.value.lerp(state.pointer, 0.025);
    }
    if (group.current) {
      group.current.rotation.y += delta * 0.075;
      group.current.rotation.x += (state.pointer.y * 0.12 - group.current.rotation.x) * 0.012;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.45, 72, 72]} />
        <primitive ref={shader} object={material} attach="material" />
      </mesh>
      <mesh scale={1.006}>
        <sphereGeometry args={[1.45, 32, 24]} />
        <meshBasicMaterial color={lightTheme ? "#087e73" : "#88f0dc"} wireframe transparent opacity={lightTheme ? 0.42 : 0.24} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, -0.28]} scale={[1.02, 1.02, 1.02]}>
        <torusGeometry args={[1.68, 0.006, 6, 180]} />
        <meshBasicMaterial color={lightTheme ? "#475cb1" : "#9cafff"} transparent opacity={0.78} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, -0.28]} scale={[1.02, 1.02, 1.02]}>
        <torusGeometry args={[1.78, 0.003, 4, 180]} />
        <meshBasicMaterial color={lightTheme ? "#087e73" : "#88f0dc"} transparent opacity={lightTheme ? 0.54 : 0.38} />
      </mesh>
    </group>
  );
}

export default function HeroScene({ lightTheme = false }: { lightTheme?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.4], fov: 36 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.6} />
      <Float speed={0.55} rotationIntensity={0.08} floatIntensity={0.11}>
        <SignalOrb lightTheme={lightTheme} />
      </Float>
    </Canvas>
  );
}
