import { Gradient } from "~/types";
import { hex } from "./color";

export function cssGradient(gradient: Gradient): string {
  if (gradient.type === "linear") {
    const angle = `${gradient.angle}deg`;
    const stops = gradient.stops.map((s) => `${hex(s.color)}`).join(", ");
    const colorHint = gradient.hint ? `${gradient.hint}%` : "";

    return `linear-gradient(${angle}, ${stops} ${colorHint})`;
  }

  return "";
}
