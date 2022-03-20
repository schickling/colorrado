import React from 'react'
import cn from 'classnames'
import { useAppState } from '~/hooks/useAppState'
import { getMostSimilarColors } from '~/utils/color-clusters'
import { rgb } from '~/utils/color'

const Page: React.FC = () => {
  return (
    <section className="flex-1 p-4 space-y-8 overflow-y-auto">
      <span>Color Clusters</span>
      <div className="space-y-4">
        <ColorList size={2} />
        <ColorList size={3} />
        <ColorList size={4} />
        <ColorList size={5} />
      </div>
    </section>
  )
}

const ColorList: React.FC<{ size: number }> = ({ size }) => {
  const { colors } = useAppState()
  const mostSimilarColors = React.useMemo(() => getMostSimilarColors(colors, size), [colors, size])

  return (
    <div className="flex gap-2">
      {mostSimilarColors.map((color, i) => (
        <div key={i} className={cn('rounded-full w-8 h-8')} style={{ background: rgb(color) }} />
      ))}
    </div>
  )
}

export default Page
