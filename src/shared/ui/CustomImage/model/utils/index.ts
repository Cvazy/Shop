export function extractMediaPath(url: string): string {
  const mediaIndex = url.indexOf("/media");
  return mediaIndex !== -1 ? url.slice(mediaIndex) : "";
}
