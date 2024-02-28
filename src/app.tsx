// @refresh reload
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start"
import { Suspense } from "solid-js"
import { isServer } from "solid-js/web"

import { ColorModeProvider, ColorModeScript, cookieStorageManagerSSR } from "@kobalte/core"
import { getCookie } from "vinxi/http"

import { Navbar } from "~/components/navbar"
import { Sidebar } from "~/components/sidebar"

import "./app.css"

function getServerCookies() {
  "use server"
  const colorMode = getCookie("kb-color-mode")
  return colorMode ? `kb-color-mode=${colorMode}` : ""
}

export default function Root() {
  const storageManager = cookieStorageManagerSSR(
    isServer ? getServerCookies() ?? "" : document.cookie
  )

  return (
    <Router
      root={(props) => (
        <Suspense>
          <ColorModeScript storageType={storageManager.type} />
          <ColorModeProvider storageManager={storageManager}>
            <main class="flex min-h-screen">
              <Sidebar />
              <div class="flex grow flex-col">
                <Navbar />
                <div class="grow rounded-tl-lg border-l border-t p-5">{props.children}</div>
              </div>
            </main>
          </ColorModeProvider>
        </Suspense>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
