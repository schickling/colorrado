import cn from 'classnames'
import { useMemo } from 'react'
// import { Dropzone } from 'src/components/Dropzone'
import { Variant } from 'src/components/Variant'
import { useAppState } from 'src/hooks/useAppState'
import type { SimpleGradientVariant } from 'src/types'

const Index = () => {
  const { colors } = useAppState()
  const variants = useMemo(() => {
    const v1: SimpleGradientVariant = {
      type: 'simple-gradient',
      gradient: {
        type: 'radial',
        stops: [{ color: colors[0]! }, { color: colors[1]! }],
      },
    }
    const v2: SimpleGradientVariant = {
      type: 'simple-gradient',
      gradient: {
        type: 'radial',
        stops: [{ color: colors[2]! }, { color: colors[3]! }],
      },
    }
    const v3: SimpleGradientVariant = {
      type: 'simple-gradient',
      gradient: {
        type: 'radial',
        stops: [{ color: colors[6]! }, { color: colors[7]! }],
      },
    }
    const v4: SimpleGradientVariant = {
      type: 'simple-gradient',
      gradient: {
        type: 'radial',
        stops: [{ color: colors[4]! }, { color: colors[5]! }],
      },
    }

    return [v1, v2, v3, v4]
  }, [colors])

  return (
    <div className={cn('grid grid-cols-2 grid-rows-2 gap-1', 'flex-1')}>
      {variants.map((g, idx) => (
        <Variant key={idx} variant={g} />
      ))}
    </div>
  )
}

export default Index
