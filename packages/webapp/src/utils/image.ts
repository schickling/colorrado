export const imageFromBlob = ({ blob }: { blob: Blob }) => resizeImage({ file: blob, maxSize: 400 })

export const imageFromImageUrl = ({ imageUrl }: { imageUrl: string }) =>
  fetch(imageUrl)
    .then((res) => res.blob())
    .then((blob) => imageFromBlob({ blob }))

interface IResizeImageOptions {
  maxSize: number
  file: Blob
}

const resizeImage = ({ file, maxSize }: IResizeImageOptions): Promise<string> => {
  const reader = new FileReader()
  const image = new Image()
  const canvas = document.createElement('canvas')
  const resize = () => {
    let width = image.width
    let height = image.height

    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width
        width = maxSize
      }
    } else {
      if (height > maxSize) {
        width *= maxSize / height
        height = maxSize
      }
    }

    canvas.width = width
    canvas.height = height
    canvas.getContext('2d')!.drawImage(image, 0, 0, width, height)
    const dataUrl = canvas.toDataURL('image/jpeg')

    return dataUrl
    // return dataURItoBlob(dataUrl)
  }

  return new Promise((resolve, reject) => {
    if (!/image.*/.test(file.type)) {
      reject(new Error('Not an image'))
      return
    }

    reader.addEventListener('load', (readerEvent: any) => {
      image.addEventListener('load', () => resolve(resize()))
      image.src = readerEvent.target.result
    })
    reader.readAsDataURL(file)
  })
}
