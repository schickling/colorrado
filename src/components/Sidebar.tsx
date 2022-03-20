import cn from 'classnames'
import { RgbColorPicker, HexColorInput } from 'react-colorful'
import { useAppState } from 'src/hooks/useAppState'
import { hex, hexToRgb, rgb } from 'src/utils/color'
import { RGBColor } from '~/types'
import React from 'react'
import * as HoverCard from '@radix-ui/react-hover-card'

export const Sidebar: React.FC = () => {
  return (
    <aside
      className={cn(
        'w-96 flex flex-col overflow-y-auto',
        'p-4 space-y-8',
        'bg-neutral-900 ',
        'border-l border-neutral-800',
      )}
    >
      <AnimateCheckbox />
      <ImagePreview />
      {/* <ColorPickers /> */}
    </aside>
  )
}

const AnimateCheckbox: React.FC = () => {
  const { animate, setAnimate } = useAppState()

  return (
    <input
      type="checkbox"
      checked={animate}
      onChange={(e) => {
        console.log(e.currentTarget.value)
        setAnimate(e.currentTarget.value === 'true')
      }}
    />
  )
}

const ImagePreview: React.FC = () => {
  const { image, colors } = useAppState()

  if (!image) return null

  return (
    <section className={cn('space-y-4 pb-4 border-b border-neutral-800')}>
      <span className="text-sm text-neutral-50">Original Image</span>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="Preview" src={image} className="h-auto block w-auto object-scale-down max-h-40 rounded" />

      <div className="flex gap-2 flex-wrap">
        {colors.map((c, i) => (
          <PreviewColor key={i} color={c} colorIndex={i} />
        ))}
      </div>
    </section>
  )
}

const PreviewColor: React.FC<{ color: RGBColor; colorIndex: number }> = ({ color, colorIndex }) => {
  return (
    <>
      <HoverCard.Root openDelay={0} closeDelay={50}>
        <HoverCard.Trigger asChild>
          <div className="w-8 h-8 rounded-full shrink-0" style={{ backgroundColor: rgb(color) }}></div>
        </HoverCard.Trigger>
        <HoverCard.Content align="center" sideOffset={5}>
          <HoverCard.Arrow className="text-neutral-100" fill="currentColor" />
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
        color={hex(color)}
        prefixed
        onChange={(value) => setColor(colorIndex, hexToRgb({ type: 'hex', value }))}
      />
    </div>
  )
}
