import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react'
import { ImageDataURI, RGBColor } from 'src/types'
import { setImageAndColorsFromImageUrl } from '~/components/Dropzone'

type AppState = {
  animate: boolean
  setAnimate: Dispatch<SetStateAction<boolean>>
  animateSpeedMultiplier: number
  setAnimateSpeedMultiplier: Dispatch<SetStateAction<number>>
  image: ImageDataURI | null
  setImage: Dispatch<SetStateAction<ImageDataURI | null>>
  colors: RGBColor[]
  setColors: Dispatch<SetStateAction<RGBColor[]>>
}

const DEFAULT_STATE: AppState = {
  animate: true,
  setAnimate: () => {},
  animateSpeedMultiplier: 1,
  setAnimateSpeedMultiplier: () => {},
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
  const [animate, setAnimate] = useState(DEFAULT_STATE.animate)
  const [animateSpeedMultiplier, setAnimateSpeedMultiplier] = useState(DEFAULT_STATE.animateSpeedMultiplier)
  const [colors, setColors] = useState(DEFAULT_STATE.colors)
  const [image, setImage] = useState(DEFAULT_STATE.image)

  useEffect(() => {
    // don't run in SSR
    if (typeof window === 'undefined') return

    const imageUrl = 'https://source.unsplash.com/600x600'
    setImageAndColorsFromImageUrl({ setColors, setImage, imageUrl })
  }, [])

  return (
    <Context.Provider
      value={{
        animate,
        setAnimate,
        animateSpeedMultiplier,
        setAnimateSpeedMultiplier,
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
  const { colors, setColors, ...state } = useContext(Context)

  const setColor = (idx: number, color: RGBColor) => {
    setColors(colors.map((c, i) => (i === idx ? color : c)))
  }

  return {
    ...state,
    colors,
    setColor,
    setColors,
  }
}
