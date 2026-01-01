"use client";

import { useEffect, useRef } from 'react';
import { Renderer, Camera, Program, Mesh, Plane, Texture, Vec2, Vec4 } from 'ogl';

// 1. The Helper Function (Exports to be used in your Footer)
export const parseLogoImage = async (file: File): Promise<{ imageData: ImageData } | null> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                resolve(null);
                return;
            }
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const data = ctx.getImageData(0, 0, img.width, img.height);
            resolve({ imageData: data });
        };
        img.src = URL.createObjectURL(file);
    });
};

interface MetallicPaintProps {
    imageData: ImageData;
    params: {
        edge: number;
        patternBlur: number;
        patternScale: number;
        refraction: number;
        speed: number;
        liquid: number;
    };
}

// 2. The Main Component
const MetallicPaint = ({ imageData, params }: MetallicPaintProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !imageData) return;

        // --- WebGL Setup (Standard OGL Boilerplate) ---
        const renderer = new Renderer({ alpha: true, dpr: 1 }); // Force pixel ratio 1 for performance
        const gl = renderer.gl;
        containerRef.current.appendChild(gl.canvas);

        const camera = new Camera(gl);
        camera.position.set(0, 0, 1);

        // --- Shaders (These typically come from the React Bits source) ---
        // Ensure you have the shaders from the website. 
        // Below is a standard liquid metal shader approximation if you lost the source.
        const vertex = `
            attribute vec2 uv;
            attribute vec3 position;
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragment = `
            precision highp float;
            uniform sampler2D tMap;
            uniform float uTime;
            uniform float uLiquid;
            varying vec2 vUv;

            void main() {
                vec2 p = vUv;
                
                // Liquid distortion effect
                // We distort the UV coordinates based on sine waves moving over time
                float t = uTime * 2.0;
                float distortionStrength = uLiquid * 0.2; // Adjust scaler for effect intensity
                
                p.x += sin(p.y * 10.0 + t) * distortionStrength;
                p.y += cos(p.x * 12.0 + t * 0.8) * distortionStrength;
                
                // Sample the texture with distorted UVs
                vec4 color = texture2D(tMap, p);
                
                // Simple Metallic/Chrome Highlight
                // We create a "shine" band that moves across the heavy alpha areas
                if (color.a > 0.1) {
                    float shine = sin(p.x * 20.0 + p.y * 10.0 + t) * 0.5 + 0.5;
                    shine = pow(shine, 4.0); // Sharpen the highlight
                    color.rgb += vec3(shine * 0.6); // Add shine to original color
                    
                    // Slight color shift for "oil slick" look (optional, keeping it silver/blue-ish here)
                    color.rgb = mix(color.rgb, vec3(0.8, 0.9, 1.0), 0.2); 
                }
                
                gl_FragColor = color;
            }
        `;

        // --- Texture Creation ---
        const texture = new Texture(gl, {
            // FIX: Cast imageData to 'any' or 'HTMLImageElement' to satisfy TypeScript.
            // OGL passes this to gl.texImage2D, which natively supports ImageData.
            image: imageData as unknown as HTMLImageElement,
            width: imageData.width,
            height: imageData.height,
            generateMipmaps: false,
        });

        const program = new Program(gl, {
            vertex,
            fragment, // Replace with the actual fragment shader from React Bits
            uniforms: {
                tMap: { value: texture },
                uTime: { value: 0 },
                uEdge: { value: params.edge },
                uPatternScale: { value: params.patternScale },
                uPatternBlur: { value: params.patternBlur },
                uRefraction: { value: params.refraction },
                uLiquid: { value: params.liquid },
            },
            transparent: true,
        });

        const mesh = new Mesh(gl, {
            geometry: new Plane(gl),
            program,
        });

        // --- Resize Handler ---
        function resize() {
            if (!containerRef.current) return;
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;
            renderer.setSize(width, height);

            // Handle aspect ratio to prevent stretching
            if (imageData) {
                const imgAspect = imageData.width / imageData.height;
                const canvasAspect = width / height;

                // Logic to cover/contain image (simplified)
                if (canvasAspect > imgAspect) {
                    mesh.scale.x = canvasAspect / imgAspect;
                    mesh.scale.y = 1;
                } else {
                    mesh.scale.x = 1;
                    mesh.scale.y = imgAspect / canvasAspect;
                }
            }
        }
        window.addEventListener('resize', resize);
        resize();

        // --- Animation Loop ---
        let animationId: number;
        function update(t: number) {
            animationId = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * params.speed * 0.001;
            renderer.render({ scene: mesh, camera });
        }
        animationId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
            if (containerRef.current && gl.canvas.parentNode) {
                containerRef.current.removeChild(gl.canvas);
            }
            // Optional: OGL cleanup
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
    }, [imageData, params]);

    return <div ref={containerRef} className="w-full h-full" />;
};

export default MetallicPaint;