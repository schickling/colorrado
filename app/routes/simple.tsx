import cn from "classnames";
import { PropsWithChildren, useMemo } from "react";
import { useAppState } from "~/hooks/useAppState";
import { cssGradient } from "~/utils/gradient";
import { Variant } from "~/types";
import { Dropzone } from "~/components/Dropzone";
import { SimpleGradientVariant } from "~/types";

export default function Index() {
  const { colors } = useAppState();
  const variants = useMemo(() => {
    const variant1: SimpleGradientVariant = {
      type: "simple-gradient",
      gradient: {
        type: "linear",
        angle: 45,
        stops: [{ color: colors[0] }, { color: colors[1] }],
      },
    };
    const variant2: SimpleGradientVariant = {
      type: "simple-gradient",
      gradient: {
        type: "linear",
        angle: 90,
        stops: [{ color: colors[2] }, { color: colors[3] }],
      },
    };
    const variant3: SimpleGradientVariant = {
      type: "simple-gradient",
      gradient: {
        type: "linear",
        angle: 135,
        stops: [{ color: colors[4] }, { color: colors[5] }],
      },
    };
    const variant4: SimpleGradientVariant = {
      type: "simple-gradient",
      gradient: {
        type: "linear",
        angle: 225,
        stops: [{ color: colors[6] }, { color: colors[7] }],
      },
    };

    return [variant1, variant2, variant3, variant4];
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
