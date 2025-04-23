import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
  RigidBodyProps,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { useGLTF, useTexture } from "@react-three/drei";
import { Vector2 } from "three";
import { useFrame } from "@react-three/fiber";
import { BandProps } from "@/components/Lanyard/model";

export const Band = memo(
  ({
    maxSpeed = 50,
    minSpeed = 0,
    lowPerformance = false,
    midPerformance = false,
    maxTexSize = 2048,
  }: BandProps) => {
    const band = useRef<any>(null);
    const fixed = useRef<any>(null);
    const j1 = useRef<any>(null);
    const j2 = useRef<any>(null);
    const j3 = useRef<any>(null);
    const card = useRef<any>(null);

    const vec = useMemo(() => new THREE.Vector3(), []);
    const ang = useMemo(() => new THREE.Vector3(), []);
    const rot = useMemo(() => new THREE.Vector3(), []);
    const dir = useMemo(() => new THREE.Vector3(), []);

    const segmentProps: any = useMemo(
      () => ({
        type: "dynamic" as RigidBodyProps["type"],
        canSleep: true,
        colliders: false,
        angularDamping: 4,
        linearDamping: 4,
      }),
      [],
    );

    const modelPath = useMemo(() => "/assets/card.glb", []);

    const { nodes } = useGLTF(modelPath) as any;

    const texturePath = useMemo(() => "/assets/lanyard.png", []);
    const texture = useTexture(texturePath);

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

    useEffect(() => {
      if (!hovered) return;

      document.body.style.cursor = dragged ? "grabbing" : "grab";

      return () => {
        document.body.style.cursor = "auto";
      };
    }, [hovered, dragged]);

    const frameCounter = useRef(0);
    const lastUpdateTime = useRef(0);
    const UPDATE_INTERVAL = lowPerformance ? 33.33 : midPerformance ? 16.66 : 0;

    useFrame((state, delta) => {
      if (lowPerformance || midPerformance) {
        const now = performance.now();
        if (now - lastUpdateTime.current < UPDATE_INTERVAL) {
          return;
        }
        lastUpdateTime.current = now;
      }

      if (dragged && typeof dragged !== "boolean") {
        vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
        dir.copy(vec).sub(state.camera.position).normalize();
        vec.add(dir.multiplyScalar(state.camera.position.length()));

        // Пробуждаем только когда нужно
        if (
          state.pointer.x !== (state.pointer as any).prev?.x ||
          state.pointer.y !== (state.pointer as any).prev?.y
        ) {
          [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
        }

        card.current?.setNextKinematicTranslation({
          x: vec.x - dragged.x,
          y: vec.y - dragged.y,
          z: vec.z - dragged.z,
        });
      }

      if (fixed.current) {
        [j1, j2].forEach((ref) => {
          if (!ref.current.lerped)
            ref.current.lerped = new THREE.Vector3().copy(
              ref.current.translation(),
            );
          const clampedDistance = Math.max(
            0.1,
            Math.min(
              1,
              ref.current.lerped.distanceTo(ref.current.translation()),
            ),
          );

          const lerpFactor =
            delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed));
          const optimizedLerpFactor = lowPerformance
            ? Math.min(lerpFactor * 2, 1)
            : lerpFactor;

          ref.current.lerped.lerp(
            ref.current.translation(),
            optimizedLerpFactor,
          );
        });

        curve.points[0].copy(j3.current.translation());
        curve.points[1].copy(j2.current.lerped);
        curve.points[2].copy(j1.current.lerped);
        curve.points[3].copy(fixed.current.translation());

        band.current.geometry.setPoints(curve.getPoints(curvePointsCount));

        ang.copy(card.current.angvel());
        rot.copy(card.current.rotation());

        if (lowPerformance) {
          frameCounter.current = (frameCounter.current + 1) % 2;
          if (frameCounter.current === 0) {
            card.current.setAngvel({
              x: ang.x,
              y: ang.y - rot.y * 0.25,
              z: ang.z,
            });
          }
        } else {
          card.current.setAngvel({
            x: ang.x,
            y: ang.y - rot.y * 0.25,
            z: ang.z,
          });
        }
      }
    });

    curve.curveType = "chordal";

    useEffect(() => {
      if (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

        if (!lowPerformance && !midPerformance) {
          texture.anisotropy = 4;
        }
      }
    }, [texture, lowPerformance, midPerformance]);

    const curvePointsCount = useMemo(
      () => (lowPerformance ? 12 : midPerformance ? 24 : 32),
      [lowPerformance, midPerformance],
    );

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
  },
);
