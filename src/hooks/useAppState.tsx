import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'
import { ImageDataURI, RGBColor } from 'src/types'

type AppState = {
  image: ImageDataURI | null
  setImage: Dispatch<SetStateAction<ImageDataURI | null>>
  colors: RGBColor[]
  setColors: Dispatch<SetStateAction<RGBColor[]>>
}

const DEFAULT_STATE: AppState = {
  image: null,
  setImage: () => {},
  colors: [
    { type: 'rgb', value: [178, 77, 80] },
    { type: 'rgb', value: [35, 74, 143] },
    { type: 'rgb', value: [63, 182, 153] },
    { type: 'rgb', value: [41, 39, 55] },
    { type: 'rgb', value: [152, 147, 85] },
    { type: 'rgb', value: [178, 77, 80] },
    { type: 'rgb', value: [35, 74, 143] },
    { type: 'rgb', value: [63, 182, 153] },
    { type: 'rgb', value: [41, 39, 55] },
    { type: 'rgb', value: [152, 147, 85] },
  ],
  setColors: () => {},
}

const Context = createContext<AppState>(DEFAULT_STATE)

type ProviderProps = PropsWithChildren<{}>
export function AppStateProvider({ children }: ProviderProps) {
  const [colors, setColors] = useState(DEFAULT_STATE.colors)
  const [image, setImage] = useState(DEFAULT_STATE.image)

  return (
    <Context.Provider
      value={{
        image,
        setImage,
        colors,
        setColors,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useAppState() {
  const { image, setImage, colors, setColors } = useContext(Context)

  const setColor = (idx: number, color: RGBColor) => {
    setColors(colors.map((c, i) => (i === idx ? color : c)))
  }

  return {
    image,
    setImage,
    colors,
    setColor,
    setColors,
  }
}
