import React from 'react'
import { useAppState } from '~/hooks/useAppState'
import { Color } from '~/types'
import { rgb } from '~/utils/color'
import { contrastRatio } from '~/utils/contrast'

const Page: React.FC = () => {
  const { colors } = useAppState()

  return (
    <section className="flex-1 grid grid-flow-row grid-cols-2 p-4 gap-8 overflow-y-auto">
      <div className="text-sm font-bold uppercase text-neutral-400">Against black</div>
      <div className="text-sm font-bold uppercase text-neutral-400">Against white</div>

      {colors.map((c, i) => (
        <React.Fragment key={i}>
          <Contrast against={c} color={{ type: 'rgb', value: [0, 0, 0] }} />
          <Contrast against={c} color={{ type: 'rgb', value: [255, 255, 255] }} />
        </React.Fragment>
      ))}
    </section>
  )
}

type ContrastProps = {
  color: Color
  against: Color
}

const Contrast: React.FC<ContrastProps> = ({ color, against }) => {
  return (
    <div style={{ backgroundColor: rgb(against), color: rgb(color) }} className="flex flex-col p-4 rounded-md">
      <span className="text-2xl font-bold uppercase">Text</span>
      <span className="text-sm">{contrastRatio(against, color)}</span>
    </div>
  )
}

export default Page
