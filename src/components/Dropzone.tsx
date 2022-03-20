import { PropsWithChildren, useState } from 'react'
import cn from 'classnames'
import ColorThief from 'colorthief'
import { useAppState } from 'src/hooks/useAppState'
import { RGBColor } from '~/types'

type Props = PropsWithChildren<{}>

export function Dropzone({ children }: Props) {
  const [isDropping, setIsDropping] = useState(false)
  const { setImage, setColors } = useAppState()

  return (
    <section
      className={cn('flex flex-1', 'transition-all', {
        'scale-95': isDropping,
      })}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDropping(true)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        setIsDropping(false)
      }}
      onDrop={(e) => {
        e.preventDefault()
        setIsDropping(false)

        Array.from(e.dataTransfer.files)
          .filter((f) => f.type.startsWith('image/'))
          .slice(0, 1)
          .forEach((f) => {
            setImageAndColorsFromBlob({ setColors, setImage, blob: f })
          })
      }}
    >
      {children}
    </section>
  )
}

const blobToBase64 = (blob: Blob): Promise<string> => {
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  return new Promise<string>((resolve) => {
    reader.onloadend = () => resolve(reader.result as string)
  })
}

const setImageAndColorsFromBlob = ({
  blob,
  setImage,
  setColors,
}: {
  blob: Blob
  setImage: React.Dispatch<React.SetStateAction<string | null>>
  setColors: React.Dispatch<React.SetStateAction<RGBColor[]>>
}) => {
  const imageUrl = URL.createObjectURL(blob)

  setImage(imageUrl)

  const img = document.createElement('img')
  img.src = imageUrl
  img.addEventListener('load', () => {
    const ct = new ColorThief()
    const palette = ct.getPalette(img)
    setColors(palette.map((color) => ({ type: 'rgb', value: color })))

    img.remove()
  })
}

export const setImageAndColorsFromImageUrl = ({
  imageUrl,
  setImage,
  setColors,
}: {
  imageUrl: string
  setImage: React.Dispatch<React.SetStateAction<string | null>>
  setColors: React.Dispatch<React.SetStateAction<RGBColor[]>>
}) => {
  fetch(imageUrl)
    .then((res) => res.blob())
    .then((blob) => {
      setImageAndColorsFromBlob({ blob, setImage, setColors })
    })
}
