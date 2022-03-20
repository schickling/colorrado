import { PropsWithChildren, useState } from "react";
import cn from "classnames";
import ColorThief from "colorthief";
import { useAppState } from "~/hooks/useAppState";

type Props = PropsWithChildren<{}>;

export function Dropzone({ children }: Props) {
  const [isDropping, setIsDropping] = useState(false);
  const { setColor } = useAppState();

  return (
    <section
      className={cn("flex-1 flex", "transition-all", {
        "scale-95": isDropping,
      })}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDropping(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDropping(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDropping(false);

        Array.from(e.dataTransfer.files)
          .filter((f) => f.type.startsWith("image/"))
          .slice(0, 1)
          .forEach((f) => {
            const reader = new FileReader();
            reader.addEventListener("load", (e) => {
              const img = document.createElement("img");
              img.src = e.target?.result as string;
              const ct = new ColorThief();
              const palette = ct.getPalette(img);
              console.log(palette);
              // setColor(0, { type: "rgb", value: x });

              img.remove();
            });

            reader.addEventListener("error", (e) => {
              alert(`File processing failed: ${e.toString()}`);
            });

            reader.readAsDataURL(f);
          });
      }}
    >
      {children}
    </section>
  );
}
