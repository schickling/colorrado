import cn from 'classnames'
import { PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export function Navigation() {
  return (
    <aside
      className={cn(
        'w-60 flex flex-col overflow-y-auto',
        'p-4 space-y-2',
        'bg-neutral-900 ',
        'border-r border-neutral-800',
      )}
    >
      <Item href="/simple">Simple Gradients</Item>
      <Item href="/additive">Additive Gradients</Item>
    </aside>
  )
}

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
