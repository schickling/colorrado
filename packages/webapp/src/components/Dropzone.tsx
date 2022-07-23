import { PropsWithChildren, useState } from 'react'
import cn from 'classnames'
import { useAppState } from 'src/hooks/useAppState'
import { imageFromBlob } from '~/utils/image'

type Props = PropsWithChildren<{}>

export function Dropzone({ children }: Props) {
  const [isDropping, setIsDropping] = useState(false)
  const { setImages, images, setCurrentImageIndex } = useAppState()

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
            imageFromBlob({ blob: f }).then((imageB64) => {
              setImages((_) => [..._, imageB64])
              setCurrentImageIndex(images.length)
            })
          })
      }}
    >
      {children}
    </section>
  )
}
