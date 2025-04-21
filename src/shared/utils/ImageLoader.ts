export const imageLoader = ({
  src,
  quality = 75,
  width,
}: {
  src: string;
  quality?: number;
  width: number;
}) => {
  return `${process.env.NEXT_PUBLIC_SERVER_URL}${src}?q=${quality}&w=${width}`;
};
