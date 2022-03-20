import { PropsWithChildren, useState } from 'react'
import cn from 'classnames'
import { SetImages, useAppState } from 'src/hooks/useAppState'
import { ImageB64String } from '~/types'

type Props = PropsWithChildren<{}>

export function Dropzone({ children }: Props) {
  const [isDropping, setIsDropping] = useState(false)
  const { setImages } = useAppState()

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
          .forEach((f) => addImageFromBlob({ setImages, blob: f }))
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

export const addImageFromB64String = ({
  b64String,
  setImages,
}: {
  b64String: ImageB64String
  setImages: SetImages
}) => {
  setImages((_) => [..._, b64String])
}

export const addImageFromBlob = ({ blob, setImages }: { blob: Blob; setImages: SetImages }) =>
  blobToBase64(blob).then((b64String) => addImageFromB64String({ b64String, setImages }))

export const addImageFromImageUrl = ({ imageUrl, setImages }: { imageUrl: string; setImages: SetImages }) =>
  fetch(imageUrl)
    .then((res) => res.blob())
    .then((blob) => addImageFromBlob({ blob, setImages }))
