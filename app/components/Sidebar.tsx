import cn from "classnames";
import { RgbColorPicker } from "react-colorful";
import { useAppState } from "~/hooks/useAppState";

export function Sidebar() {
  const { colors, setColor } = useAppState();

  return (
    <aside
      className={cn(
        "w-[32rem] flex flex-col",
        "p-4",
        "bg-neutral-900 ",
        "border-l border-neutral-800"
      )}
    >
      <div className="flex gap-8">
        {colors.map((c, idx) => (
          <RgbColorPicker
            key={idx}
            color={{
              r: c.value[0],
              g: c.value[1],
              b: c.value[2],
            }}
            onChange={(c) => {
              setColor(idx, { type: "rgb", value: [c.r, c.g, c.b] });
            }}
          />
        ))}
      </div>
    </aside>
  );
}
