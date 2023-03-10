import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./styles/app.css"

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Blog website",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-100">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV !== 'production' && <LiveReload />}
      </body>
    </html>
  );
}
