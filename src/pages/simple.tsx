import cn from 'classnames'
import { useMemo } from 'react'
import { useAppState } from 'src/hooks/useAppState'
import { Dropzone } from 'src/components/Dropzone'
import { Variant } from 'src/components/Variant'
import { SimpleGradientVariant } from 'src/types'

export default function Index() {
  const { colors } = useAppState()
  const variants = useMemo(() => {
    const v1: SimpleGradientVariant = {
      type: 'simple-gradient',
      gradient: {
        type: 'linear',
        angle: 45,
        stops: [{ color: colors[0] }, { color: colors[1] }],
      },
    }
    const v2: SimpleGradientVariant = {
      type: 'simple-gradient',
      gradient: {
        type: 'radial',
        stops: [{ color: colors[2] }, { color: colors[3] }],
      },
    }
    const v3: SimpleGradientVariant = {
      type: 'simple-gradient',
      gradient: {
        type: 'radial',
        stops: [
          { color: colors[6], pos: 10 },
          { color: colors[7], pos: 20 },
        ],
      },
    }
    const v4: SimpleGradientVariant = {
      type: 'simple-gradient',
      gradient: {
        type: 'linear',
        angle: 135,
        stops: [{ color: colors[4] }, { color: colors[5] }],
      },
    }

    return [v1, v2, v3, v4]
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
