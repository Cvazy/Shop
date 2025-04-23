import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { getDevicePerformance, LanyardProps } from "@/components/Lanyard/model";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  AdaptiveEvents,
  BakeShadows,
  Environment,
  Lightformer,
  Stats,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Band } from "../Band";

export const LanyardContent = memo(
  ({
    position = [0, 0, 30],
    gravity = [0, -40, 0],
    fov = 20,
    transparent = true,
    highPerformance = false,
  }: LanyardProps) => {
    const devicePerformance = useMemo(() => getDevicePerformance(), []);

    const lowPerformance = useMemo(
      () => !highPerformance && devicePerformance.isLowPerformance,
      [highPerformance, devicePerformance.isLowPerformance],
    );

    const midPerformance = useMemo(
      () => !highPerformance && devicePerformance.isMidPerformance,
      [highPerformance, devicePerformance.isMidPerformance],
    );

    const environmentConfig = useMemo(
      () => ({
        blur: lowPerformance ? 2.5 : midPerformance ? 1.5 : 0.75,
        resolution: lowPerformance ? 128 : midPerformance ? 256 : 512,
      }),
      [lowPerformance, midPerformance],
    );

    const physicsConfig = useMemo(
      () => ({
        timeStep: lowPerformance ? 1 / 30 : midPerformance ? 1 / 45 : 1 / 60,
      }),
      [lowPerformance, midPerformance],
    );

    const [isVisible, setIsVisible] = useState(true);
    const [isBatteryLow, setIsBatteryLow] = useState(false);

    useEffect(() => {
      if ("getBattery" in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          const checkBattery = () => {
            setIsBatteryLow(battery.level < 0.2 && !battery.charging);
          };

          battery.addEventListener("levelchange", checkBattery);
          battery.addEventListener("chargingchange", checkBattery);
          checkBattery();

          return () => {
            battery.removeEventListener("levelchange", checkBattery);
            battery.removeEventListener("chargingchange", checkBattery);
          };
        });
      }
    }, []);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible(entry.isIntersecting);
          });
        },
        { threshold: 0.1 },
      );

      const canvasContainer = document.querySelector(".lanyard-container");
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

    const frameloopValue = useMemo(() => {
      if (!isVisible || isBatteryLow) return "demand";
      return lowPerformance ? "demand" : "always";
    }, [isVisible, lowPerformance, isBatteryLow]) as "demand" | "always";

    const dprValue = useMemo(() => {
      if (lowPerformance || midPerformance || isBatteryLow) return 1;
      return [1, 2] as [number, number];
    }, [lowPerformance, midPerformance, isBatteryLow]);

    const canvasProps = useMemo(
      () => ({
        camera: { position, fov },
        gl: {
          alpha: transparent,
          powerPreference: "high-performance" as WebGLPowerPreference,
          antialias: true,
          precision: lowPerformance ? "mediump" : "highp",
          stencil: false,
          depth: true,
        },
        dpr: dprValue,
        frameloop: frameloopValue,
        performance: {
          max: devicePerformance.targetFPS,
        },
        className: "w-full h-full",
      }),
      [
        position,
        fov,
        transparent,
        lowPerformance,
        dprValue,
        frameloopValue,
        devicePerformance.targetFPS,
      ],
    );

    const onCreated = useCallback(
      ({ gl }: { gl: THREE.WebGLRenderer }) => {
        gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);

        // Оптимизации WebGL
        if (lowPerformance) {
          gl.shadowMap.enabled = false;
        } else {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }
      },
      [transparent, lowPerformance],
    );

    return (
      <div className="relative z-0 w-full h-screen flex justify-center items-center transform scale-100 origin-center lanyard-container">
        <Canvas {...canvasProps} onCreated={onCreated}>
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
            frames={lowPerformance ? 1 : undefined}
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

          {process.env.NODE_ENV === "development" && <Stats />}
        </Canvas>
      </div>
    );
  },
);
