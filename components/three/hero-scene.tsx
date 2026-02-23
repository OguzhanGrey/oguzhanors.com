"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, Trail } from "@react-three/drei";
import * as THREE from "three";

function AerospaceVehicle({ radius, speed, color, offset }: { radius: number, speed: number, color: string, offset: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduceMotion(mediaQuery.matches);
    }, []);

    useFrame((state) => {
        if (!groupRef.current || reduceMotion) return;
        const t = state.clock.getElapsedTime() * speed + offset;
        groupRef.current.position.x = Math.cos(t) * radius;
        groupRef.current.position.y = Math.sin(t) * radius;
        groupRef.current.rotation.z = t;
    });

    return (
        <group ref={groupRef}>
            <mesh rotation={[0, 0, -Math.PI / 2]}>
                <coneGeometry args={[0.1, 0.5, 4]} />
                <meshBasicMaterial color={color} wireframe />
            </mesh>
            <mesh position={[-0.25, 0, 0]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshBasicMaterial color={color} transparent opacity={0.8} />
            </mesh>
        </group>
    );
}

function OrbitPath({ radius }: { radius: number }) {
    return (
        <mesh>
            <torusGeometry args={[radius, 0.005, 16, 120]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
        </mesh>
    );
}

function GimbalRing({ radius, axis, speed }: { radius: number, axis: 'x' | 'y' | 'z', speed: number }) {
    const ringRef = useRef<THREE.Mesh>(null);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduceMotion(mediaQuery.matches);
    }, []);

    useFrame((state, delta) => {
        if (ringRef.current && !reduceMotion) {
            ringRef.current.rotation[axis] += delta * speed;
        }
    });

    return (
        <mesh ref={ringRef}>
            <torusGeometry args={[radius, 0.015, 16, 100]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.15} wireframe />
            <mesh>
                <torusGeometry args={[radius - 0.01, 0.005, 16, 100]} />
                <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} />
            </mesh>
        </mesh>
    );
}

function CoreSystem() {
    const coreRef = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        if (coreRef.current) {
            coreRef.current.rotation.y += delta * 0.2;
            coreRef.current.rotation.x += delta * 0.1;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh ref={coreRef}>
                    <icosahedronGeometry args={[0.6, 1]} />
                    <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.3} />
                </mesh>
                <mesh>
                    <icosahedronGeometry args={[0.3, 0]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
                </mesh>
            </Float>
            <GimbalRing radius={0.9} axis="x" speed={0.5} />
            <GimbalRing radius={1.1} axis="y" speed={0.3} />
            <GimbalRing radius={1.3} axis="z" speed={0.4} />
        </group>
    );
}

function AvionicsWebArchitecture() {
    const systemRef = useRef<THREE.Group>(null);
    const { viewport } = useThree();

    useFrame((state, delta) => {
        if (systemRef.current) {
            systemRef.current.rotation.y += delta * 0.05;
            systemRef.current.rotation.x += delta * 0.03;
        }
    });

    const isDesktop = viewport.width > 6;
    const positionX = isDesktop ? 3.0 : 0;
    const overallScale = isDesktop ? 1.0 : 0.6;

    return (
        <group position={[positionX, 0, 0]} scale={[overallScale, overallScale, overallScale]}>
            <group ref={systemRef}>
                <CoreSystem />

                <group rotation={[Math.PI / 3, Math.PI / 4, 0]}>
                    <OrbitPath radius={2.0} />
                    <Trail width={1} color="#00e5ff" length={3} decay={1} local>
                        <AerospaceVehicle radius={2.0} speed={0.8} color="#00e5ff" offset={0} />
                    </Trail>
                </group>

                <group rotation={[Math.PI / 2.5, 0, Math.PI / 6]}>
                    <OrbitPath radius={2.8} />
                    <Trail width={1.5} color="#ff0055" length={4} decay={1.5} local>
                        <AerospaceVehicle radius={2.8} speed={0.4} color="#ff0055" offset={Math.PI} />
                    </Trail>
                </group>

                <group rotation={[-Math.PI / 6, -Math.PI / 4, 0]}>
                    <OrbitPath radius={3.8} />
                    <Trail width={2} color="#ffaa00" length={6} decay={1.5} local>
                        <AerospaceVehicle radius={3.8} speed={0.25} color="#ffaa00" offset={Math.PI / 2} />
                    </Trail>
                </group>
            </group>
        </group>
    );
}

export default function HeroScene() {
    const [canvasReady, setCanvasReady] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        const initTimer = setTimeout(() => {
            setCanvasReady(true);
            setTimeout(() => setFadeIn(true), 100);
        }, 800);
        return () => clearTimeout(initTimer);
    }, []);

    return (
        <div className="w-full h-full relative">
            <div
                className={`absolute inset-0 bg-[#0a0a0a] transition-opacity duration-1000 ${fadeIn ? "opacity-0" : "opacity-100"}`}
                style={{
                    backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "24px 24px"
                }}
            />

            {canvasReady && (
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 45 }}
                    gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
                    dpr={[1, 1.2]}
                    className="absolute inset-0 pointer-events-none"
                >
                    <ambientLight intensity={0.5} />
                    <Stars radius={20} depth={50} count={1200} factor={4} saturation={0} fade speed={0.6} />
                    <AvionicsWebArchitecture />
                </Canvas>
            )}
        </div>
    );
}
