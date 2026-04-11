"use client";

import { useEffect, useRef, useState } from "react";
import { Renderer, Camera, Transform, Plane, Mesh, Program, Texture } from "ogl";

interface LiquidImageWebGLProps {
  src: string;
  alt: string;
}

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec3 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D tMap;
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    
    // Create liquid distortion based on noise and time
    float noise = snoise(uv * 3.0 + uTime * 0.2);
    float distortion = noise * uIntensity * 0.05;
    
    // Apply distortion to UVs
    vec2 distortedUv = uv + vec2(distortion);
    
    vec4 color = texture2D(tMap, distortedUv);
    
    // Add a slight brightness boost on hover
    color.rgb *= 1.0 + (uIntensity * 0.1);
    
    gl_FragColor = color;
  }
`;

export default function LiquidImageWebGL({ src, alt }: LiquidImageWebGLProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const intensityRef = useRef(0);
  const programRef = useRef<Program | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const renderer = new Renderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      dpr: window.devicePixelRatio,
    });
    const gl = renderer.gl;

    const camera = new Camera(gl);
    camera.position.z = 1;

    const scene = new Transform();

    const texture = new Texture(gl, {
      generateMipmaps: false,
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      texture.image = img;
    };

    const geometry = new Plane(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        tMap: { value: texture },
        uTime: { value: 0 },
        uIntensity: { value: 0 },
      },
      transparent: true,
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    let animationId: number;
    const update = (time: number) => {
      animationId = requestAnimationFrame(update);

      // Smoothly interpolate intensity
      const targetIntensity = isHovered ? 1 : 0;
      intensityRef.current += (targetIntensity - intensityRef.current) * 0.1;
      
      program.uniforms.uIntensity.value = intensityRef.current;
      program.uniforms.uTime.value = time * 0.001;

      renderer.render({ scene, camera });
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    animationId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      // Clean up WebGL resources if needed (ogl handles some automatically)
    };
  }, [src, isHovered]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
        style={{ filter: isHovered ? "drop-shadow(0 20px 50px rgba(0,0,0,0.3))" : "none", transition: "filter 0.5s ease" }}
      />
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />
    </div>
  );
}
