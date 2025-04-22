/* eslint-disable react/no-unknown-property */
"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
  Stats,
  AdaptiveDpr,
  AdaptiveEvents,
  BakeShadows,
  useFBO,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import { Vector2 } from "three";

extend({ MeshLineGeometry, MeshLineMaterial });

// Предзагрузка модели в малом разрешении
useGLTF.preload("/assets/card.glb");

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  highPerformance?: boolean;
}

// Создаем компонент для показа при загрузке
const Placeholder = () => {
  return (
    <div className="relative z-0 w-full h-screen flex justify-center items-center bg-black" />
  );
};

// Исправленное определение производительности устройства
const getDevicePerformance = () => {
  if (typeof window === 'undefined') return { 
    isLowPerformance: true, 
    isMidPerformance: false, 
    isHighPerformance: false,
    maxTextureSize: 1024,
    targetFPS: 30
  };
  
  // Определение доступных графических возможностей
  let maxTextureSize = 2048;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') as WebGLRenderingContext | null; 
    if (gl) {
      maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    }
  } catch (e) {
    // Fallback если WebGL недоступен
  }
  
  // Остальной код без изменений
  const cores = navigator.hardwareConcurrency || 2;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const hasHighRefreshRate = 'matchMedia' in window && window.matchMedia('(refresh-rate: 120hz)').matches;
  const isLowPower = 'getBattery' in navigator && (navigator as any).getBattery && 
                    (navigator as any).getBattery().then((battery: any) => battery.dischargingTime < 7200);
  const isLowMemory = 'deviceMemory' in navigator && (navigator as any).deviceMemory < 4;
  
  const isLowPerformance = isMobile || cores <= 4 || maxTextureSize < 4096 || isLowMemory || isLowPower || window.innerWidth < 768;
  const isMidPerformance = !isLowPerformance && (cores <= 8 || !hasHighRefreshRate || maxTextureSize < 8192);
  const isHighPerformance = !isLowPerformance && !isMidPerformance;
  
  const targetFPS = isLowPerformance ? 30 : (isMidPerformance ? 60 : 120);
  
  return { 
    isLowPerformance, 
    isMidPerformance, 
    isHighPerformance,
    maxTextureSize,
    targetFPS
  };
};

// Компонент с адаптивным рендерингом
function LanyardContent({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  highPerformance = false,
}: LanyardProps) {
  // Определяем производительность устройства
  const devicePerformance = useMemo(() => getDevicePerformance(), []);
  
  // Игнорируем devicePerformance, если передан highPerformance=true
  const lowPerformance = useMemo(() => 
    !highPerformance && devicePerformance.isLowPerformance, 
  [highPerformance, devicePerformance.isLowPerformance]);
  
  const midPerformance = useMemo(() =>
    !highPerformance && devicePerformance.isMidPerformance,
  [highPerformance, devicePerformance.isMidPerformance]);
  
  // Настройки окружения в зависимости от производительности
  const environmentConfig = useMemo(() => ({
    blur: lowPerformance ? 2.5 : midPerformance ? 1.5 : 0.75,
    resolution: lowPerformance ? 128 : midPerformance ? 256 : 512,
  }), [lowPerformance, midPerformance]);
  
  // Настройки физики в зависимости от производительности
  const physicsConfig = useMemo(() => ({
    timeStep: lowPerformance ? 1/30 : midPerformance ? 1/45 : 1/60,
  }), [lowPerformance, midPerformance]);
  
  // Состояние для оптимизации видимости
  const [isVisible, setIsVisible] = useState(true);
  const [isBatteryLow, setIsBatteryLow] = useState(false);
  
  // Проверка уровня батареи
  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const checkBattery = () => {
          // Уровень ниже 20% считается низким
          setIsBatteryLow(battery.level < 0.2 && !battery.charging);
        };
        
        battery.addEventListener('levelchange', checkBattery);
        battery.addEventListener('chargingchange', checkBattery);
        checkBattery();
        
        return () => {
          battery.removeEventListener('levelchange', checkBattery);
          battery.removeEventListener('chargingchange', checkBattery);
        };
      });
    }
  }, []);
  
  // Определяем видимость компонента для экономии ресурсов
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    
    const canvasContainer = document.querySelector('.lanyard-container');
    if (canvasContainer) {
      observer.observe(canvasContainer);
    }
    
    return () => {
      if (canvasContainer) {
        observer.unobserve(canvasContainer);
      }
      observer.disconnect();
    };
  }, []);
  
  // Исправленное использование frameloop для совместимости с типами
  const frameloopValue = useMemo(() => {
    if (!isVisible || isBatteryLow) return 'demand';
    return lowPerformance ? 'demand' : 'always';
  }, [isVisible, lowPerformance, isBatteryLow]) as 'demand' | 'always';
  
  // Определение DPR в зависимости от производительности
  const dprValue = useMemo(() => {
    if (lowPerformance || midPerformance || isBatteryLow) return 1;
    return [1, 2] as [number, number]; // Адаптивный DPR для высокопроизводительных устройств
  }, [lowPerformance, midPerformance, isBatteryLow]);
  
  const canvasProps = useMemo(() => ({
    camera: { position, fov },
    gl: { 
      alpha: transparent,
      powerPreference: 'high-performance' as WebGLPowerPreference,
      antialias: true,
      precision: lowPerformance ? 'mediump' : 'highp',
      stencil: false,
      depth: true,
    },
    dpr: dprValue,
    frameloop: frameloopValue,
    performance: {
      max: devicePerformance.targetFPS,
    },
    className: "w-full h-full",
  }), [position, fov, transparent, lowPerformance, dprValue, frameloopValue, devicePerformance.targetFPS]);
  
  const onCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
    
    // Оптимизации WebGL
    if (lowPerformance) {
      gl.shadowMap.enabled = false;
    } else {
      gl.shadowMap.enabled = true;
      gl.shadowMap.type = THREE.PCFSoftShadowMap;
    }
  }, [transparent, lowPerformance]);
  
  return (
    <div className="relative z-0 w-full h-screen flex justify-center items-center transform scale-100 origin-center lanyard-container">
      <Canvas
        {...canvasProps}
        onCreated={onCreated}
      >
        {/* Оптимизационные компоненты */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        {!lowPerformance && <BakeShadows />}
        
        <ambientLight intensity={Math.PI} />
        
        <Physics gravity={gravity} timeStep={physicsConfig.timeStep}>
          <Band 
            lowPerformance={lowPerformance} 
            midPerformance={midPerformance} 
            maxTexSize={devicePerformance.maxTextureSize}
          />
        </Physics>
        
        <Environment 
          blur={environmentConfig.blur}
          resolution={environmentConfig.resolution}
          frames={lowPerformance ? 1 : undefined} // Только 1 кадр для низкопроизводительных устройств
        >
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          {!lowPerformance && (
            <>
              <Lightformer
                intensity={3}
                color="white"
                position={[1, 1, 1]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={10}
                color="white"
                position={[-10, 0, 14]}
                rotation={[0, Math.PI / 2, Math.PI / 3]}
                scale={[100, 10, 1]}
              />
            </>
          )}
        </Environment>
        
        {process.env.NODE_ENV === 'development' && <Stats />}
      </Canvas>
    </div>
  );
}

// Применяем оптимизацию с React.memo
const LanyardMemo = React.memo(LanyardContent);

// Обертка с адаптивной загрузкой
export default function Lanyard(props: LanyardProps) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return <Placeholder />;
  }
  
  return <LanyardMemo {...props} />;
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  lowPerformance?: boolean;
  midPerformance?: boolean;
  maxTexSize?: number;
}

// Оптимизируем компонент Band
const Band = React.memo(function Band({ 
  maxSpeed = 50, 
  minSpeed = 0,
  lowPerformance = false,
  midPerformance = false,
  maxTexSize = 2048,
}: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  // Оптимизация объектов для повторного использования
  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  // Оптимизированные настройки для сегментов
  const segmentProps: any = useMemo(() => ({
    type: "dynamic" as RigidBodyProps["type"],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  }), []);

  // Низкое или высокое качество модели в зависимости от производительности -> Всегда высокое
  const modelPath = useMemo(() => 
    "/assets/card.glb", // Всегда используем модель высокого разрешения
  [/*lowPerformance*/]); // Убираем зависимость
  
  // Загружаем оптимизированную модель
  const { nodes } = useGLTF(modelPath) as any;

  // Оптимизируем текстуру: Используем _low модель, но всегда hires текстуру
  const texturePath = useMemo(() => 
    "/assets/lanyard.png", // Всегда используем текстуру высокого разрешения
  [/*lowPerformance*/]); // Убираем зависимость
  const texture = useTexture(texturePath);
  
  // Оптимизируем кривую с адаптивным количеством точек
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  // Вычисляем оптимальное разрешение текстуры
  const textureResolution = useMemo(() => {
    const baseSize = Math.min(1000, maxTexSize / 2);
    return new Vector2(baseSize, baseSize);
  }, [maxTexSize]);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  // Оптимизируем эффект курсора
  useEffect(() => {
    if (!hovered) return;
    
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  // Оптимизация обновления кадров
  const frameCounter = useRef(0);
  const lastUpdateTime = useRef(0);
  const UPDATE_INTERVAL = lowPerformance ? 33.33 : midPerformance ? 16.66 : 0;

  useFrame((state, delta) => {
    // Пропускаем кадры для низкой производительности
    if (lowPerformance || midPerformance) {
      const now = performance.now();
      if (now - lastUpdateTime.current < UPDATE_INTERVAL) {
        return;
      }
      lastUpdateTime.current = now;
    }
    
    // Оптимизированная обработка перемещения
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      
      // Пробуждаем только когда нужно
      if (state.pointer.x !== (state.pointer as any).prev?.x || state.pointer.y !== (state.pointer as any).prev?.y) {
        [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      }
      
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    
    if (fixed.current) {
      // Оптимизированная интерполяция
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation(),
          );
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
        );
        
        // Оптимизация для слабых устройств
        const lerpFactor = delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed));
        const optimizedLerpFactor = lowPerformance ? Math.min(lerpFactor * 2, 1) : lerpFactor;
        
        ref.current.lerped.lerp(
          ref.current.translation(),
          optimizedLerpFactor
        );
      });
      
      // Обновление кривой с оптимизацией
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      
      // Установка точек для геометрии с оптимальным количеством
      band.current.geometry.setPoints(curve.getPoints(curvePointsCount));
      
      // Оптимизация вращения
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      
      // Уменьшаем частоту обновления для слабых устройств
      if (lowPerformance) {
        frameCounter.current = (frameCounter.current + 1) % 2;
        if (frameCounter.current === 0) {
          card.current.setAngvel({ 
            x: ang.x, 
            y: ang.y - rot.y * 0.25, 
            z: ang.z 
          });
        }
      } else {
        card.current.setAngvel({ 
          x: ang.x, 
          y: ang.y - rot.y * 0.25, 
          z: ang.z 
        });
      }
    }
  });

  // Установка типа кривой и настроек текстуры
  curve.curveType = "chordal";
  
  // Оптимизация настроек текстуры
  useEffect(() => {
    if (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      
      // Только для высокопроизводительных устройств
      if (!lowPerformance && !midPerformance) {
        texture.anisotropy = 4;
      }
    }
  }, [texture, lowPerformance, midPerformance]);

  // Адаптивное обновление кривой
  const curvePointsCount = useMemo(() => 
    lowPerformance ? 12 : midPerformance ? 24 : 32,
  [lowPerformance, midPerformance]);

  // Рендеринг сцены с оптимизациями
  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody
          ref={fixed}
          {...segmentProps}
          type={"fixed" as RigidBodyProps["type"]}
        />
        <RigidBody
          position={[0.5, 0, 0]}
          ref={j1}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} density={1} />
        </RigidBody>
        <RigidBody
          position={[1, 0, 0]}
          ref={j2}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} density={1} />
        </RigidBody>
        <RigidBody
          position={[1.5, 0, 0]}
          ref={j3}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} density={1} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={
            dragged
              ? ("kinematicPosition" as RigidBodyProps["type"])
              : ("dynamic" as RigidBodyProps["type"])
          }
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} density={1} />
          <group
            scale={0.7}
            position={[0, -1.6, 0.05]}
            rotation={[-Math.PI / 2, 0, 0]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation())),
              );
            }}
          >
            {/* Убираем условный рендеринг, всегда используем загруженную модель */}
            <mesh
              geometry={nodes.Object_2.geometry}
              material={nodes.Object_2.material}
              frustumCulled={true}
            />
            <mesh
              geometry={nodes.Object_3.geometry}
              material={nodes.Object_3.material}
              frustumCulled={true}
            />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />

        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={textureResolution}
          useMap={1}
          map={texture}
          repeat={new THREE.Vector2(-4, 1)}
          lineWidth={lowPerformance ? 0.75 : 1}
        />
      </mesh>
    </>
  );
});
