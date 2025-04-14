export function formatNumberWithDots(input: string): string {
  const [integerPart] = input.split(".");
  const numStr = integerPart.replace(/^0+/, "") || "0";

  return numStr
    .split("")
    .reverse()
    .join("")
    .replace(/(\d{3})(?=\d)/g, "$1.")
    .split("")
    .reverse()
    .join("")
    .replace(/^\./, "");
}
