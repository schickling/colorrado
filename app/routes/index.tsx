import cn from "classnames";
import { PropsWithChildren } from "react";
import { useAppState } from "~/hooks/useAppState";
import { cssGradient } from "~/utils/gradient";
import { Gradient } from "~/types";

export default function Index() {
  const { gradients } = useAppState();

  return (
    <div className={cn("grid grid-cols-2 grid-rows-2 gap-1", "h-full w-full")}>
      {gradients.map((g, idx) => (
        <Variant key={idx} gradient={g} />
      ))}
    </div>
  );
}

type VariantProps = PropsWithChildren<{
  gradient: Gradient;
}>;

function Variant({ children, gradient }: VariantProps) {
  return (
    <div
      style={{
        background: cssGradient(gradient),
      }}
    >
      {children}
    </div>
  );
}
