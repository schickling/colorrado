import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Color, Gradient, Variant } from "~/types";

type AppState = {
  colors: Color[];
  setColors: Dispatch<SetStateAction<Color[]>>;
};

const DEFAULT_STATE: AppState = {
  colors: [
    {
      type: "rgb",
      value: [178, 77, 80],
    },
    {
      type: "rgb",
      value: [35, 74, 143],
    },
  ],
  setColors: () => {},
};

const Context = createContext<AppState>(DEFAULT_STATE);

type ProviderProps = PropsWithChildren<{}>;

export function AppStateProvider({ children }: ProviderProps) {
  const [colors, setColors] = useState(DEFAULT_STATE.colors);

  return (
    <Context.Provider
      value={{
        colors,
        setColors,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useAppState() {
  const { colors, setColors } = useContext(Context);

  const setColor = (idx: number, color: Color) => {
    setColors(colors.map((c, i) => (i === idx ? color : c)));
  };

  const gradients: Gradient[] = [
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
    {
      type: "linear",
      angle: 225,
      stops: [{ color: colors[0] }, { color: colors[1] }],
    },
  ];

  const variants: Variant[] = [];

  return {
    colors,
    setColor,
    gradients,
    variants,
  };
}
