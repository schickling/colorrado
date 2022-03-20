import { PropsWithChildren, useState } from 'react'
import cn from 'classnames'
import ColorThief from 'colorthief'
import { useAppState } from '~/hooks/useAppState'

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
            const imageUrl = URL.createObjectURL(f)

            setImage(imageUrl)

            const img = document.createElement('img')
            img.src = imageUrl
            img.addEventListener('load', () => {
              const ct = new ColorThief()
              const palette = ct.getPalette(img)
              setColors(palette.map((color) => ({ type: 'rgb', value: color })))

              img.remove()
            })
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
