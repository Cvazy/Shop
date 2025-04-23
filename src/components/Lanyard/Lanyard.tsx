"use client";

import React, { useEffect, useState } from "react";
import { extend } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { LanyardProps } from "./model";
import { LanyardContent } from "@/components/Lanyard/ui";

extend({ MeshLineGeometry, MeshLineMaterial });

useGLTF.preload("/assets/card.glb");

const Placeholder = () => {
  return (
    <div className="relative z-0 w-full h-screen flex justify-center items-center bg-black animate-pulse" />
  );
};

export default function Lanyard(props: LanyardProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Placeholder />;
  }

  return <LanyardContent {...props} />;
}
