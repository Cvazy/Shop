export const getDevicePerformance = () => {
  if (typeof window === "undefined")
    return {
      isLowPerformance: true,
      isMidPerformance: false,
      isHighPerformance: false,
      maxTextureSize: 1024,
      targetFPS: 30,
    };

  let maxTextureSize = 2048;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
    if (gl) {
      maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    }
  } catch (e) {
    // Fallback если WebGL недоступен
  }

  const cores = navigator.hardwareConcurrency || 2;
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  const hasHighRefreshRate =
    "matchMedia" in window &&
    window.matchMedia("(refresh-rate: 120hz)").matches;
  const isLowPower =
    "getBattery" in navigator &&
    (navigator as any).getBattery &&
    (navigator as any)
      .getBattery()
      .then((battery: any) => battery.dischargingTime < 7200);
  const isLowMemory =
    "deviceMemory" in navigator && (navigator as any).deviceMemory < 4;

  const isLowPerformance =
    isMobile ||
    cores <= 4 ||
    maxTextureSize < 4096 ||
    isLowMemory ||
    isLowPower ||
    window.innerWidth < 768;
  const isMidPerformance =
    !isLowPerformance &&
    (cores <= 8 || !hasHighRefreshRate || maxTextureSize < 8192);
  const isHighPerformance = !isLowPerformance && !isMidPerformance;

  const targetFPS = isLowPerformance ? 30 : isMidPerformance ? 60 : 120;

  return {
    isLowPerformance,
    isMidPerformance,
    isHighPerformance,
    maxTextureSize,
    targetFPS,
  };
};
