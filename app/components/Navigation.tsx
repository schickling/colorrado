import cn from "classnames";
import { PropsWithChildren } from "react";
import { useMatch } from "react-router";
import { Link } from "remix";

export function Navigation() {
  return (
    <aside
      className={cn(
        "w-[32rem] flex flex-col overflow-y-auto",
        "p-4 space-y-2",
        "bg-neutral-900 ",
        "border-r border-neutral-800"
      )}
    >
      <Item href="/simple">Simple Gradients</Item>
      <Item href="/additive">Additive Gradients</Item>
    </aside>
  );
}

type ItemProps = PropsWithChildren<{
  href: string;
}>;

function Item({ href, children }: ItemProps) {
  const match = useMatch(href);

  return (
    <Link
      to={href}
      className={cn("hover:text-neutral-50", {
        "text-neutral-50": !!match,
        "text-neutral-400": !match,
      })}
    >
      {children}
    </Link>
  );
}
