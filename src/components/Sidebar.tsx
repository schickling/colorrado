import cn from 'classnames'
import { RgbColorPicker } from 'react-colorful'
import { useAppState } from 'src/hooks/useAppState'
import { rgb } from 'src/utils/color'

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
      <ColorPickers />
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
    <section className={cn('flex flex-col space-y-2', 'pb-4 border-b border-neutral-800')}>
      <span className="text-sm text-neutral-50">Original Image</span>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="Preview" src={image} className="h-auto w-auto object-scale-down max-h-40 rounded" />

      <div className="flex gap-2 flex-wrap">
        {colors.map((c, i) => (
          <div key={i} className="w-8 h-8 rounded-full shrink-0" style={{ backgroundColor: rgb(c) }} />
        ))}
      </div>
    </section>
  )
}

const ColorPickers: React.FC = () => {
  const { colors, setColor } = useAppState()

  return (
    <section className="flex flex-col space-y-4">
      <span className="text-sm text-neutral-50">Derived Colors</span>

      {colors.map((c, idx) => (
        <RgbColorPicker
          key={idx}
          color={{
            r: c.value[0],
            g: c.value[1],
            b: c.value[2],
          }}
          onChange={(c) => {
            setColor(idx, { type: 'rgb', value: [c.r, c.g, c.b] })
          }}
        />
      ))}
    </section>
  )
}
