import { PropsWithChildren } from "react";
import { additiveGradientToCSS, simpleGradientToCSS } from "~/utils/gradient";
import { Variant } from "~/types";

type VariantProps = PropsWithChildren<{
  variant: Variant;
}>;

export function Variant({ children, variant }: VariantProps) {
  if (variant.type === "simple-gradient") {
    return (
      <div
        style={{
          background: simpleGradientToCSS(variant.gradient),
        }}
      >
        {children}
      </div>
    );
  }

  if (variant.type === "additive-gradient") {
    return (
      <div
        style={{
          background: additiveGradientToCSS(variant.gradients),
        }}
      >
        {children}
      </div>
    );
  }

  return <div>Not implemented</div>;
}
