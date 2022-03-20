import { PropsWithChildren } from 'react'
import { additiveGradientToCSS, simpleGradientToCSS } from 'src/utils/gradient'
import { Variant } from 'src/types'
import { useTime, useOscillate } from '~/hooks/useTime'

type VariantProps = PropsWithChildren<{
  variant: Variant
}>

export function Variant({ children, variant }: VariantProps) {
  const time = useTime()
  const offset = useOscillate(time * 0.005)

  if (variant.type === 'simple-gradient') {
    return <div style={{ background: simpleGradientToCSS(variant.gradient, offset * 5) }}>{children}</div>
  }

  if (variant.type === 'additive-gradient') {
    return <div style={{ background: additiveGradientToCSS(variant.gradients) }}>{children}</div>
  }

  return <div>Not implemented</div>
}
