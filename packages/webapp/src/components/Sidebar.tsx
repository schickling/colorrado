import * as Heroicons from '@heroicons/react/solid'
import * as HoverCard from '@radix-ui/react-hover-card'
import cn from 'classnames'
import React from 'react'
import { HexColorInput, RgbColorPicker } from 'react-colorful'
import { useAppState } from 'src/hooks/useAppState'
import { toHexString, hexToRgb, toRgbString } from 'colorrado'

import type { RGBColor } from '~/types'
import { imageFromImageUrl } from '~/utils/image'

export const Sidebar: React.FC = () => {
  const { colors } = useAppState()

  return (
    <aside
      className={cn(
        'w-96 flex flex-col overflow-y-auto',
        'p-4 space-y-8',
        'bg-neutral-900 ',
        'border-l border-neutral-800',
      )}
    >
      {/* <AnimateCheckbox /> */}
      <ImagesPreview />
      <div className="flex gap-2 flex-wrap">
        {colors.map((c, i) => (
          <PreviewColor key={i} color={c} colorIndex={i} />
        ))}
      </div>
      <EnhanceCheckbox />
    </aside>
  )
}

const EnhanceCheckbox: React.FC = () => {
  const { enhance, setEnhance } = useAppState()
  return <div>
      <label className="flex items-center">
        <input type="checkbox" checked={enhance} onChange={(e) => setEnhance(e.currentTarget.checked)} />
        <span className="ml-2 text-sm text-neutral-50">Enhance</span>
      </label>
  </div>
}

const AnimateCheckbox: React.FC = () => {
  const { animate, animateSpeedMultiplier, setAnimate, setAnimateSpeedMultiplier } = useAppState()

  const multiplierToValue = (multiplier: number) => {
    if (multiplier > 1) return multiplier
    if (multiplier === 1) return 0
    return multiplier * 10 - 11
  }

  const valueToMultiplier = (value: number) => {
    if (value > 0) return value
    if (value === 0) return 1
    return (value + 11) / 10
  }

  return (
    <>
      <label className="flex items-center">
        <input type="checkbox" checked={animate} onChange={(e) => setAnimate(e.currentTarget.checked)} />
        <span className="ml-2 text-sm text-neutral-50">Animate</span>
      </label>

      <label className="flex items-center">
        <input
          type="range"
          min={-11}
          max={10}
          value={multiplierToValue(animateSpeedMultiplier)}
          onChange={(e) => setAnimateSpeedMultiplier(valueToMultiplier(e.currentTarget.valueAsNumber))}
        />
        <span className="ml-2 text-sm text-neutral-50">Speed Multiplier: {animateSpeedMultiplier}</span>
      </label>
    </>
  )
}

const ImagesPreview = () => {
  const { images, setImages, setCurrentImageIndex } = useAppState()

  if (images.length === 0) return null

  return (
    <section className={cn('space-y-4 pb-4 border-b border-neutral-800')}>
      <span className="text-sm text-neutral-50">Original Image</span>
      <div className="flex flex-wrap gap-2">
        {images.map((image, imageIndex) => (
          <ImagePreview key={imageIndex} image={image} imageIndex={imageIndex} />
        ))}
        <div>
          <Heroicons.PlusCircleIcon
            onClick={() => {
              const imageUrl = 'https://source.unsplash.com/600x600'
              imageFromImageUrl({ imageUrl }).then((imageB64) => {
                setImages((_) => [..._, imageB64])
                setCurrentImageIndex(images.length)
              })
            }}
            className="w-10 h-10 opacity-30 hover:opacity-100 cursor-pointer"
          />
        </div>
      </div>
    </section>
  )
}

const ImagePreview: React.FC<{ image: string; imageIndex: number }> = ({ image, imageIndex }) => {
  const { setCurrentImageIndex, currentImageIndex, setImages } = useAppState()

  return (
    <div className="relative group">
      <div className="absolute top-2 right-2 flex gap-1">
        <Heroicons.RefreshIcon
          onClick={() => {
            const imageUrl = 'https://source.unsplash.com/600x600'
            imageFromImageUrl({ imageUrl }).then((imageB64) => {
              setImages((_) => _.map((_, i) => (i === imageIndex ? imageB64 : _)))
              setCurrentImageIndex(imageIndex)
            })
          }}
          className="text-gray-100 p-1.5 w-6 h-6 group-hover:opacity-70 hover:!opacity-100 opacity-0 cursor-pointer bg-neutral-900/80 rounded-full"
        />
        <Heroicons.XIcon
          onClick={() => {
            setImages((images) => images.filter((_, i) => i !== imageIndex))
            setCurrentImageIndex(Math.max(currentImageIndex - 1, 0))
          }}
          className="text-gray-100 p-1.5 w-6 h-6 group-hover:opacity-70 hover:!opacity-100 opacity-0 cursor-pointer bg-neutral-900/80 rounded-full"
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Preview"
        src={image}
        className={cn(
          'h-auto block w-auto object-scale-down max-h-40 rounded',
          currentImageIndex === imageIndex ? 'opacity-100' : 'opacity-20 group-hover:opacity-100',
        )}
        onClick={() => setCurrentImageIndex(imageIndex)}
      />
    </div>
  )
}

export const PreviewColor: React.FC<{ color: RGBColor; colorIndex: number }> = ({ color, colorIndex }) => {
  return (
    <>
      <HoverCard.Root openDelay={0} closeDelay={50}>
        <HoverCard.Trigger asChild>
          <div className="w-8 h-8 rounded-full shrink-0" style={{ backgroundColor: toRgbString(color) }}></div>
        </HoverCard.Trigger>
        <HoverCard.Content align="center" sideOffset={5}>
          <HoverCard.Arrow offset={10} className="text-neutral-100" fill="currentColor" />
          <ColorPicker {...{ color, colorIndex }} />
        </HoverCard.Content>
      </HoverCard.Root>
    </>
  )
}

const ColorPickers: React.FC = () => {
  const { colors } = useAppState()

  return (
    <section className="flex flex-col space-y-4">
      <span className="text-sm text-neutral-50">Derived Colors</span>

      {colors.map((c, idx) => (
        <ColorPicker key={idx} color={c} colorIndex={idx} />
      ))}
    </section>
  )
}

const ColorPicker: React.FC<{ color: RGBColor; colorIndex: number }> = ({ color, colorIndex }) => {
  const { setColor } = useAppState()

  return (
    <div className="space-y-3 bg-neutral-100 p-3 rounded-md">
      <RgbColorPicker
        color={{ r: color.value[0], g: color.value[1], b: color.value[2] }}
        onChange={(c) => setColor(colorIndex, { type: 'rgb', value: [c.r, c.g, c.b] })}
      />
      <HexColorInput
        className="bg-transparent w-full border border-gray-300 p-2 rounded outline-none text-gray-400 focus:text-gray-700"
        color={toHexString(color)}
        prefixed
        onChange={(value) => setColor(colorIndex, hexToRgb({ type: 'hex', value }))}
      />
    </div>
  )
}
