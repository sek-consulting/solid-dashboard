// @refresh reload
import { Suspense, useContext } from "solid-js"
import { isServer } from "solid-js/web"
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  ServerContext,
  Title
} from "solid-start"

import { ColorModeProvider, ColorModeScript, cookieStorageManagerSSR } from "@kobalte/core"

import { Sidebar } from "~/components/sidebar"

import "./root.css"

export default function Root() {
  const event = useContext(ServerContext)

  const storageManager = cookieStorageManagerSSR(
    isServer ? event?.request.headers.get("cookie") ?? "" : document.cookie
  )

  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <ErrorBoundary>
          <ColorModeScript storageType={storageManager.type} />
          <Suspense>
            <ColorModeProvider storageManager={storageManager}>
              <main class="flex">
                <Sidebar />
                <Routes>
                  <FileRoutes />
                </Routes>
              </main>
            </ColorModeProvider>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  )
}
