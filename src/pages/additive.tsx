import cn from 'classnames'
import { useMemo } from 'react'
import { useAppState } from 'src/hooks/useAppState'
import { AdditiveGradientVariant } from 'src/types'
import { Dropzone } from 'src/components/Dropzone'
import { Variant } from 'src/components/Variant'
import { relativeLuminance } from '~/utils/contrast'

const Page: React.FC = () => {
  const { colors } = useAppState()

  const variants = useMemo(() => {
    const darkColors = colors.filter((c) => relativeLuminance(c) < 0.5)
    const lightColors = colors.filter((c) => relativeLuminance(c) > 0.5)

    console.log(darkColors, lightColors)

    const v1: AdditiveGradientVariant = {
      type: 'additive-gradient',
      gradients: [
        {
          type: 'radial',
          stops: [
            { color: { type: 'rgba', value: [...colors[0].value, 1] } },
            { color: { type: 'rgba', value: [...colors[0].value, 0] } },
          ],
          posX: 0,
          posY: 0,
        },
        {
          type: 'radial',
          stops: [
            { color: { type: 'rgba', value: [...colors[1].value, 1] } },
            { color: { type: 'rgba', value: [...colors[1].value, 0] } },
          ],
          posX: 100,
          posY: 0,
        },
        {
          type: 'radial',
          stops: [
            { color: { type: 'rgba', value: [...colors[2].value, 1] } },
            { color: { type: 'rgba', value: [...colors[2].value, 0] } },
          ],
          posX: 100,
          posY: 100,
        },
        {
          type: 'radial',
          stops: [
            { color: { type: 'rgba', value: [...colors[3].value, 1] } },
            { color: { type: 'rgba', value: [...colors[3].value, 0] } },
          ],
          posX: 0,
          posY: 100,
        },
      ],
    }

    const v2: AdditiveGradientVariant = {
      type: 'additive-gradient',
      gradients: [
        {
          type: 'linear',
          angle: 336,
          stops: [
            { color: { type: 'rgba', value: [...colors[0].value, 1] } },
            { color: { type: 'rgba', value: [...colors[0].value, 0] } },
          ],
        },
        {
          type: 'linear',
          angle: 217,
          stops: [
            { color: { type: 'rgba', value: [...colors[1].value, 1] } },
            { color: { type: 'rgba', value: [...colors[1].value, 0] } },
          ],
        },
        {
          type: 'linear',
          angle: 127,
          stops: [
            { color: { type: 'rgba', value: [...colors[2].value, 1] } },
            { color: { type: 'rgba', value: [...colors[2].value, 0] } },
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
            { color: { type: 'rgba', value: [...colors[0].value, 1] } },
            { color: { type: 'rgba', value: [...colors[0].value, 0] } },
          ],
        },
        {
          type: 'linear',
          angle: 217,
          stops: [
            { color: { type: 'rgba', value: [...colors[5].value, 1] } },
            { color: { type: 'rgba', value: [...colors[5].value, 0] } },
          ],
        },
        {
          type: 'linear',
          angle: 127,
          stops: [
            { color: { type: 'rgba', value: [...colors[2].value, 1] } },
            { color: { type: 'rgba', value: [...colors[2].value, 0] } },
          ],
        },
      ],
    }

    return [v1, v2, v3]
  }, [colors])

  return (
    <Dropzone>
      <div className={cn('grid grid-cols-2 grid-rows-2 gap-1', 'flex-1')}>
        {variants.map((g, idx) => (
          <Variant key={idx} variant={g} />
        ))}
      </div>
    </Dropzone>
  )
}

export default Page
