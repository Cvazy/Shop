import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { ReactThreeFiber } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: ReactThreeFiber.Object3DNode<
        MeshLineGeometry,
        typeof MeshLineGeometry
      >;
      meshLineMaterial: ReactThreeFiber.MaterialNode<
        MeshLineMaterial,
        typeof MeshLineMaterial
      >;
    }
  }
}
