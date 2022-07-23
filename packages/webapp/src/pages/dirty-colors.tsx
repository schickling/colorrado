import { detectDirtyColors, toRgbString } from 'colorrado'
import cn from 'classnames'
import React from 'react'
import { useAppState } from '~/hooks/useAppState'
import { PreviewColor } from '~/components/Sidebar'

const Page: React.FC = () => {
  return (
    <section className="flex-1 p-4 space-y-8 overflow-y-auto">
      <span>TODO: Dirty Colors</span>
      <ColorList />
    </section>
  )
}

export default Page

const ColorList: React.FC<{}> = ({}) => {
  const { colors } = useAppState()
  const { dirty, nonDirty } = React.useMemo(() => detectDirtyColors(colors), [colors])

  return (
    <div className="flex flex-col gap-2">
      <div>
        <div>Dirty</div>
        <div className="flex gap-2">
          {dirty.map((color, i) => (
            // <div key={i} className={cn('rounded-full w-8 h-8')} style={{ background: toRgbString(color) }} />
            <PreviewColor key={i} {...{color, colorIndex: i}} />
          ))}
        </div>
      </div>
      <div>
        <div>Non-Dirty</div>
        <div className="flex gap-2">
          {nonDirty.map((color, i) => (
            <PreviewColor key={i} {...{color, colorIndex: i}} />
            // <div key={i} className={cn('rounded-full w-8 h-8')} style={{ background: toRgbString(color) }} />
          ))}
        </div>
      </div>
    </div>
  )
}
