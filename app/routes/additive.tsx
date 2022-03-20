import cn from "classnames";
import { PropsWithChildren, useMemo } from "react";
import { useAppState } from "~/hooks/useAppState";
import { cssGradient } from "~/utils/gradient";
import { AdditiveGradientVariant, Variant } from "~/types";
import { Dropzone } from "~/components/Dropzone";

export default function Index() {
  const { colors } = useAppState();
  const variants = useMemo(() => {
    const variant1: AdditiveGradientVariant = {
      type: "additive-gradient",
      gradients: [
        {
          type: "linear",
          angle: 45,
          stops: [{ color: colors[0] }, { color: colors[1] }],
        },
        {
          type: "linear",
          angle: 90,
          stops: [{ color: colors[0] }, { color: colors[1] }],
        },
        {
          type: "linear",
          angle: 135,
          stops: [{ color: colors[0] }, { color: colors[1] }],
        },
      ],
    };

    return [variant1];
  }, [colors]);

  return (
    <Dropzone>
      <div className={cn("grid grid-cols-2 grid-rows-2 gap-1", "flex-1")}>
        {variants.map((g, idx) => (
          <Variant key={idx} variant={g} />
        ))}
      </div>
    </Dropzone>
  );
}

type VariantProps = PropsWithChildren<{
  variant: Variant;
}>;

function Variant({ children, variant }: VariantProps) {
  if (variant.type === "simple-gradient") {
    return (
      <div
        style={{
          background: cssGradient(variant.gradient),
        }}
      >
        {children}
      </div>
    );
  }

  return <div>Not implemented</div>;
}
