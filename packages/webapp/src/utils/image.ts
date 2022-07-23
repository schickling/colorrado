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
    let dataUrl = canvas.toDataURL('image/jpeg')

    return dataUrl
    // return dataURItoBlob(dataUrl)
  }

  return new Promise((resolve, reject) => {
    if (!file.type.match(/image.*/)) {
      reject(new Error('Not an image'))
      return
    }

    reader.onload = (readerEvent: any) => {
      image.onload = () => resolve(resize())
      image.src = readerEvent.target.result
    }
    reader.readAsDataURL(file)
  })
}
