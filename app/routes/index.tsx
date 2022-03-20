import cn from "classnames";
import { PropsWithChildren } from "react";
import { useAppState } from "~/hooks/useAppState";
import { cssGradient } from "~/utils/gradient";
import { Gradient } from "~/types";
import { Dropzone } from "~/components/Dropzone";

export default function Index() {
  const { gradients } = useAppState();

  return (
    <Dropzone>
      <div className={cn("grid grid-cols-2 grid-rows-2 gap-1", "flex-1")}>
        {gradients.map((g, idx) => (
          <Variant key={idx} gradient={g} />
        ))}
      </div>
    </Dropzone>
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
