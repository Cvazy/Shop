export interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  highPerformance?: boolean;
}

export interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  lowPerformance?: boolean;
  midPerformance?: boolean;
  maxTexSize?: number;
}
