"use client";

import dynamic from "next/dynamic";

export const DitherDynamic = dynamic(
  () =>
    import("../index")
      .then((mod) => mod.Dither)
      .catch(() => () => <div>Effect failed to load</div>),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-100">Loading effect...</div>
    ),
  },
);
