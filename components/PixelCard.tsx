import React, { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import gsap from 'gsap';
import { cn } from '../lib/utils'; // Assuming cn utility exists

// --- Shader Code ---
const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
varying vec2 vUv;
uniform vec2 uResolution;
uniform float uProgress;
uniform vec3 uColor;
uniform vec2 uContainerRes;
uniform float uGridSize;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

vec2 squaresGrid(vec2 vUv) {
    float imageAspectX = 1.;
    float imageAspectY = 1.;
    float containerAspectX = uResolution.x/uResolution.y;
    float containerAspectY = uResolution.y/uResolution.x;
    
    vec2 ratio = vec2(
        min(containerAspectX / imageAspectX, 1.0),
        min(containerAspectY / imageAspectY, 1.0)
    );

    vec2 squareUvs = vec2(
        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    return squareUvs;
}

void main() {
    vec2 newUvs = vUv;
    float imageAspectX = uResolution.x/uResolution.y;
    float imageAspectY = uResolution.y/uResolution.x;
    float containerAspectX = uContainerRes.x/uContainerRes.y;
    float containerAspectY = uContainerRes.y/uContainerRes.x;

    vec2 ratio = vec2(
        min(containerAspectX / imageAspectX, 1.0),
        min(containerAspectY / imageAspectY, 1.0)
    );

    vec2 coverUvs = vec2(
        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec2 squareUvs = squaresGrid(coverUvs);
    float gridSize = floor(uContainerRes.x/20.);
    vec2 grid = vec2(floor(squareUvs.x*gridSize)/gridSize, floor(squareUvs.y*gridSize)/gridSize);
    vec4 gridTexture = vec4(uColor, 0.);

    vec4 texture = texture2D(uTexture, coverUvs);
    float height = 0.2;
    float progress = (1.+height) - (uProgress * (1.+height+height));

    float dist = 1. - distance(grid.y, progress);
    float clampedDist = smoothstep(height, 0., distance(grid.y, progress));
    float randDist = step(1. - height * random(grid), dist);
    dist = step(1. - height, dist);
    float rand = random(grid); 

    float alpha = dist * (clampedDist + rand - 0.5 * (1. - randDist));
    alpha = max(0., alpha);
    gridTexture.a = alpha;

    texture.rgba *= step(progress, grid.y);
    gl_FragColor = vec4(mix(texture, gridTexture, gridTexture.a));
}
`;

// --- Scene Component ---
const PixelScene = ({ imageSrc, isHovered, containerSize }) => {
    const meshRef = useRef();
    const texture = useTexture(imageSrc);
    const { viewport } = useThree();

    const uniforms = useMemo(() => ({
        uTexture: { value: texture },
        uResolution: { value: new THREE.Vector2(0, 0) }, // Image resolution
        uContainerRes: { value: new THREE.Vector2(0, 0) }, // Container resolution
        uProgress: { value: 0 },
        uGridSize: { value: 20 },
        uColor: { value: new THREE.Color("#000000") }, // Default black, can be passed as prop
    }), [texture]);

    // Update texture resolution once loaded
    useEffect(() => {
        if (texture.image) {
            uniforms.uResolution.value.set(texture.image.naturalWidth, texture.image.naturalHeight);
        }
    }, [texture, uniforms]);

    // Update container resolution
    useEffect(() => {
        uniforms.uContainerRes.value.set(containerSize.width, containerSize.height);
    }, [containerSize, uniforms]);

    // Animate uProgress
    const progressRef = useRef(0); // Start at 0 (Pixelated)
    const [revealed, setRevealed] = useState(false);

    // Auto-reveal on mount
    useEffect(() => {
        const timer = setTimeout(() => setRevealed(true), 100 + Math.random() * 300); // Staggered reveal
        return () => clearTimeout(timer);
    }, []);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Logic:
            // 1. Start at 0 (Pixelated)
            // 2. Animate to 1 (Visible) when 'revealed' is true
            // 3. If Hovered, go back to 0 (Pixelated) or maybe 0.5?
            // Let's go to 0 on hover for the full effect.

            const target = isHovered ? 0 : (revealed ? 1 : 0);

            // Smooth lerp
            // Use a ref to track current value if we want more control, but direct access is fine
            meshRef.current.material.uniforms.uProgress.value = THREE.MathUtils.lerp(
                meshRef.current.material.uniforms.uProgress.value,
                target,
                delta * (isHovered ? 2.0 : 1.5) // Faster on hover
            );
        }
    });

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
};

// --- Main Component ---
export const PixelCard = ({ image, title, desc, tags, className }) => {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (containerRef.current) {
            setContainerSize({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight
            });
        }
    }, []);

    return (
        <div
            className={cn("group relative w-full h-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#111]", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={containerRef}
        >
            {/* Text Content Overlay */}
            <div className="absolute top-0 left-0 w-full h-full z-20 flex flex-col justify-end p-6 pointer-events-none">
                <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {/* Optional content that appears on hover */}
                </div>
            </div>

            {/* Fallback Image - Visible if Canvas fails or is transparent initially */}
            <img
                src={image}
                alt={title}
                className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                    // Hide fallback when we expect canvas to be working (optional, or keep generic)
                    // But if Shader 'uProgress' is 1, it renders the texture fully. 
                    // So we can hide this or keep it behind.
                    "opacity-0"
                )}
            />

            {/* Canvas Layer */}
            <div className="absolute inset-0 z-10 transition-opacity duration-500 opacity-100">
                {containerSize.width > 0 && (
                    <Canvas
                        camera={{ position: [0, 0, 1], fov: 75 }}
                        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
                        dpr={[1, 2]}
                    >
                        <React.Suspense fallback={null}>
                            <PixelScene
                                imageSrc={image}
                                isHovered={isHovered}
                                containerSize={containerSize}
                            />
                        </React.Suspense>
                    </Canvas>
                )}
            </div>
        </div>
    );
};
