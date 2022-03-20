import ColorThief from 'colorthief'
import image from 'next/image'
import { createContext, useContext, useEffect, useState } from 'react'
import { ImageB64String, RGBColor } from 'src/types'
import { imageFromImageUrl } from '~/utils/image'
import { usePersistedState } from './usePersistedState'

export type AppState = {
  animate: boolean
  setAnimate: React.Dispatch<React.SetStateAction<boolean>>
  animateSpeedMultiplier: number
  setAnimateSpeedMultiplier: React.Dispatch<React.SetStateAction<number>>

  images: ImageB64String[]
  setImages: SetImages
  currentImageIndex: number
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>

  colors: RGBColor[]
  setColors: SetColors
}

export type SetImages = React.Dispatch<React.SetStateAction<ImageB64String[]>>
export type SetColors = React.Dispatch<React.SetStateAction<RGBColor[]>>

const DEFAULT_STATE: AppState = {
  animate: true,
  setAnimate: () => {},
  animateSpeedMultiplier: 1,
  setAnimateSpeedMultiplier: () => {},
  images: [],
  setImages: () => {},
  currentImageIndex: 0,
  setCurrentImageIndex: () => {},
  colors: [
    { type: 'rgb', value: [0, 0, 0] },
    { type: 'rgb', value: [0, 0, 0] },
    { type: 'rgb', value: [0, 0, 0] },
    { type: 'rgb', value: [0, 0, 0] },
    { type: 'rgb', value: [0, 0, 0] },
    { type: 'rgb', value: [0, 0, 0] },
    { type: 'rgb', value: [0, 0, 0] },
    { type: 'rgb', value: [0, 0, 0] },
    { type: 'rgb', value: [0, 0, 0] },
    { type: 'rgb', value: [0, 0, 0] },
  ],
  setColors: () => {},
}

const Context = createContext<AppState>(DEFAULT_STATE)

const colorCache = new Map<ImageB64String, RGBColor[]>()

type ProviderProps = React.PropsWithChildren<{}>
export function AppStateProvider({ children }: ProviderProps) {
  const [animate, setAnimate] = usePersistedState(DEFAULT_STATE.animate, 'animate')
  const [animateSpeedMultiplier, setAnimateSpeedMultiplier] = usePersistedState(
    DEFAULT_STATE.animateSpeedMultiplier,
    'animateSpeedMultiplier',
  )
  const [colors, setColors] = useState(DEFAULT_STATE.colors)
  const [images, setImages] = usePersistedState(DEFAULT_STATE.images, 'images')
  const [currentImageIndex, setCurrentImageIndex] = usePersistedState(
    DEFAULT_STATE.currentImageIndex,
    'currentImageIndex',
  )

  useEffect(() => {
    // just run the first time
    if (images.length > 0) return

    const imageUrl = 'https://source.unsplash.com/600x600'
    imageFromImageUrl({ imageUrl }).then((imageB64) => {
      setImages((_) => [..._, imageB64])
      setCurrentImageIndex((_) => _ + 1)
    })
  }, [images, setCurrentImageIndex, setImages])

  useEffect(() => {
    const imageUrl = images[currentImageIndex]

    if (imageUrl === undefined) return

    if (colorCache.has(imageUrl)) {
      setColors(colorCache.get(imageUrl)!)
      return
    }

    const img = document.createElement('img')
    img.src = imageUrl
    img.addEventListener('load', () => {
      const ct = new ColorThief()
      const palette = ct.getPalette(img)
      const colors = palette.map<RGBColor>((color) => ({ type: 'rgb', value: color }))

      setColors(colors)

      colorCache.set(imageUrl, colors)

      img.remove()
    })
  }, [images, currentImageIndex, setColors])

  return (
    <Context.Provider
      value={{
        animate,
        setAnimate,
        animateSpeedMultiplier,
        setAnimateSpeedMultiplier,
        images,
        setImages,
        currentImageIndex,
        setCurrentImageIndex,
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
