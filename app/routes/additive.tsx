import cn from "classnames";
import { useMemo } from "react";
import { useAppState } from "~/hooks/useAppState";
import { AdditiveGradientVariant } from "~/types";
import { Dropzone } from "~/components/Dropzone";
import { Variant } from "~/components/Variant";

const Page: React.FC = () => {
  const { colors } = useAppState();

  const variants = useMemo(() => {
    const variant1: AdditiveGradientVariant = {
      type: "additive-gradient",
      gradients: [
        {
          type: "linear",
          angle: 336,
          stops: [
            // { color: { type: "rgba", value: [0, 0, 255, 1] } },
            // { color: { type: "rgba", value: [0, 0, 255, 0] } },
            { color: { type: "rgba", value: [...colors[0].value, 1] } },
            { color: { type: "rgba", value: [...colors[0].value, 0] } },
          ],
          hint: 100,
        },
        {
          type: "linear",
          angle: 217,
          stops: [
            // { color: { type: "rgba", value: [255, 0, 0, 1] } },
            // { color: { type: "rgba", value: [255, 0, 0, 0] } },
            { color: { type: "rgba", value: [...colors[1].value, 1] } },
            { color: { type: "rgba", value: [...colors[1].value, 0] } },
          ],
          hint: 100,
        },
        {
          type: "linear",
          angle: 127,
          stops: [
            // { color: { type: "rgba", value: [0, 255, 0, 1] } },
            // { color: { type: "rgba", value: [0, 255, 0, 0] } },
            { color: { type: "rgba", value: [...colors[2].value, 1] } },
            { color: { type: "rgba", value: [...colors[2].value, 0] } },
          ],
          hint: 100,
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
};

export default Page;
