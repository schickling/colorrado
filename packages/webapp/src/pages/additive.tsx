import cn from 'classnames'
import { useMemo } from 'react'
import { Variant } from 'src/components/Variant'
import { useAppState } from 'src/hooks/useAppState'
import type { AdditiveGradientVariant } from 'src/types'

// import { relativeLuminance } from '~/utils/contrast'

const Page: React.FC = () => {
  const { colors, enhance, enhancedColors } = useAppState()

  const variants = useMemo(() => {
    // const darkColors = colors.filter((c) => relativeLuminance(c) < 0.4)
    // const lightColors = colors.filter((c) => relativeLuminance(c) > 0.4)

    const colorCluster3 = enhance ? enhancedColors : colors

    const v1: AdditiveGradientVariant = {
      type: 'additive-gradient',
      gradients: [
        {
          type: 'radial',
          stops: [
            { color: { type: 'rgba', value: [...colorCluster3[0]!.value, 1] } },
            { color: { type: 'rgba', value: [...colorCluster3[0]!.value, 0] } },
          ],
          posX: 0,
          posY: 0,
        },
        {
          type: 'radial',
          stops: [
            { color: { type: 'rgba', value: [...colorCluster3[1]!.value, 1] } },
            { color: { type: 'rgba', value: [...colorCluster3[1]!.value, 0] } },
          ],
          posX: 100,
          posY: 0,
        },
        {
          type: 'radial',
          stops: [
            { color: { type: 'rgba', value: [...colorCluster3[2]!.value, 1] } },
            { color: { type: 'rgba', value: [...colorCluster3[2]!.value, 0] } },
          ],
          posX: 100,
          posY: 100,
        },
        // {
        //   type: 'radial',
        //   stops: [
        //     { color: { type: 'rgba', value: [...colorCluster3[3].value, 1] } },
        //     { color: { type: 'rgba', value: [...colorCluster3[3].value, 0] } },
        //   ],
        //   posX: 0,
        //   posY: 100,
        // },
      ],
    }

    const v2: AdditiveGradientVariant = {
      type: 'additive-gradient',
      gradients: [
        {
          type: 'linear',
          angle: 336,
          stops: [
            { color: { type: 'rgba', value: [...colorCluster3[0]!.value, 1] } },
            { color: { type: 'rgba', value: [...colorCluster3[0]!.value, 0] } },
          ],
        },
        {
          type: 'linear',
          angle: 217,
          stops: [
            { color: { type: 'rgba', value: [...colorCluster3[1]!.value, 1] } },
            { color: { type: 'rgba', value: [...colorCluster3[1]!.value, 0] } },
          ],
        },
        {
          type: 'linear',
          angle: 127,
          stops: [
            { color: { type: 'rgba', value: [...colorCluster3[2]!.value, 1] } },
            { color: { type: 'rgba', value: [...colorCluster3[2]!.value, 0] } },
          ],
        },
      ],
    }

    const v3: AdditiveGradientVariant = {
      type: 'additive-gradient',
      gradients: [
        {
          type: 'radial',
          stops: [
            { color: { type: 'rgba', value: [...colorCluster3[0]!.value, 1] } },
            { color: { type: 'rgba', value: [...colorCluster3[0]!.value, 0] } },
          ],
        },
        {
          type: 'linear',
          angle: 217,
          stops: [
            { color: { type: 'rgba', value: [...colorCluster3[1]!.value, 1] } },
            { color: { type: 'rgba', value: [...colorCluster3[1]!.value, 0] } },
          ],
        },
        {
          type: 'linear',
          angle: 127,
          stops: [
            { color: { type: 'rgba', value: [...colorCluster3[2]!.value, 1] } },
            { color: { type: 'rgba', value: [...colorCluster3[2]!.value, 0] } },
          ],
        },
      ],
    }

    return [v1, v2, v3]
  }, [colors, enhance, enhancedColors])

  return (
    <div className={cn('grid grid-cols-2 grid-rows-2 gap-1', 'flex-1')}>
      {variants.map((g, idx) => (
        <Variant key={idx} variant={g} />
      ))}
    </div>
  )
}

export default Page
