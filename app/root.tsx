import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import cn from "classnames";
import { Sidebar } from "~/components/Sidebar";
import styles from "./styles.css";
import { AppStateProvider } from "./hooks/useAppState";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Colorrado",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  {
    rel: "shortcut icon",
    type: "image/png",
    href: "favicon.png",
  },
  { rel: "stylesheet", href: styles },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body
        className={cn(
          "flex h-screen w-screen overflow-hidden",
          "bg-neutral-900 text-neutral-50"
        )}
      >
        <AppStateProvider>
          <main className="flex-1 flex">
            <Outlet />
          </main>

          <Sidebar />
        </AppStateProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
