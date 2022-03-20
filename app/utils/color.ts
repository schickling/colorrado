import { Color } from "~/types";

export function hex(color: Color) {
  if (color.type === "rgb") {
    return `#${color.value
      .map((c) => c.toString(16).padStart(2, "0"))
      .join("")}`;
  }

  throw new Error("Not implemented");
}

export function rgb(color: Color) {
  if (color.type === "rgb") {
    return `rgb(${color.value
      .map((c) => c.toString(16).padStart(2, "0"))
      .join("")})`;
  }

  throw new Error("Not implemented");
}
