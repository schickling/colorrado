import cn from 'classnames'
import { PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import * as Icons from './Icons'

export function Navigation() {
  return (
    <div className="flex flex-col justify-between">
      <aside
        className={cn(
          'w-60 flex flex-col overflow-y-auto',
          'p-4 space-y-2',
          'bg-neutral-900 ',
          'border-r border-neutral-800',
        )}
      >
        <div className="flex py-4">
          <Image
            src="/colorrado.png"
            className="hover:animate-spin"
            width={447 / 7}
            height={363 / 7}
            alt="Candy. Yummy!"
          />
        </div>
        <Item href="/contrasts">Contrasts</Item>
        <Item href="/color-clusters">Color Clusters</Item>
        <Item href="/dirty-colors">Dirty Colors</Item>
        <Item href="/linear">Linear Gradients</Item>
        <Item href="/radial">Radial Gradients</Item>
        <Item href="/additive">Additive Gradients</Item>
      </aside>
      <div className="text-xs p-4 text-neutral-600 leading-5">
        <a
          href="https://github.com/schickling/colorrado"
          target="_blank"
          className="mb-3 block text-neutral-400 hover:text-neutral-100"
          rel="noreferrer"
        >
          <Icons.GitHub className="w-4 h-4" />
        </a>
        Made with <span className="hover:animate-spin inline-block">🍬</span> <br />
        by <TwitterLink handle="unsafecreds" color="pink" /> and <TwitterLink handle="schickling" color="yellow" />
      </div>
    </div>
  )
}

const TwitterLink: React.FC<{ handle: string; color: 'yellow' | 'pink' }> = ({ handle, color }) => (
  <a
    href={`https://twitter.com/${handle}`}
    target="_blank"
    className={cn(
      'text-neutral-500 font-semibold',
      color === 'yellow' ? 'hover:text-yellow-500' : 'hover:text-pink-500',
    )}
    rel="noreferrer"
  >
    @{handle}
  </a>
)

type ItemProps = PropsWithChildren<{
  href: string
}>

function Item({ href, children }: ItemProps) {
  const router = useRouter()
  const isActive = router.pathname === href

  return (
    <Link href={href}>
      <a className={cn('hover:text-neutral-50', isActive ? 'text-neutral-50' : 'text-neutral-400')}>{children}</a>
    </Link>
  )
}
