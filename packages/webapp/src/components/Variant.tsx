import { PropsWithChildren } from 'react'
import { additiveGradientToCSS, simpleGradientToCSS } from 'src/utils/gradient'
import { Variant } from 'src/types'
import { toRgbString } from 'colorrado'
import { unique } from '~/utils/misc'
// import { useTime, useOscillate } from '~/hooks/useTime'

type VariantProps = PropsWithChildren<{
  variant: Variant
}>

export function Variant({ children, variant }: VariantProps) {
  // const time = useTime()
  // const offset = useOscillate(time * 0.005)

  if (variant.type === 'simple-gradient') {
    return <div style={{ background: simpleGradientToCSS(variant.gradient) }}>{children}</div>
  }

  if (variant.type === 'additive-gradient') {
    return (
      <div className="relative">
        <div className="w-full h-full" style={{ background: additiveGradientToCSS(variant.gradients) }}>
          {children}
        </div>
        <div className="gap-1 flex absolute bottom-1 right-1">
          {unique(
            variant.gradients
              .flatMap((g) => (g.type === 'linear' || g.type === 'radial' ? g.stops : []))
              .map((_) => _.color)
              .filter((_) => (_.type === 'rgba' ? _.value[3] !== 0 : true))
              .map(toRgbString),
          ).map((color) => (
            <div
              className="w-10 h-10 border-[3px] border-neutral-900 rounded-full"
              key={color}
              style={{ background: color }}
            />
          ))}
        </div>
      </div>
    )
  }

  return <div>Not implemented</div>
}
