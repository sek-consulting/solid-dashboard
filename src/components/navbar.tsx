import type { ComponentProps } from "solid-js"
import { Show, createSignal, splitProps } from "solid-js"

import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from "solid-icons/tb"

import { Toggle } from "~/components/ui/toggle"
import { cn } from "~/lib/utils"

export function Navbar(props: ComponentProps<"aside">) {
  const [, rest] = splitProps(props, ["class", "children"])
  const [expanded, setExpanded] = createSignal(true)
  return (
    <aside
      class={cn(
        "group min-h-screen w-[50px] bg-muted transition-all aria-expanded:w-[200px]",
        props.class
      )}
      {...rest}
      aria-expanded={expanded() ? "true" : "false"}
    >
      <span class="hidden group-aria-expanded:inline">Navbar</span>
      <Toggle pressed={expanded()} onChange={setExpanded}>
        {(state) => (
          <Show when={state.pressed()} fallback={<TbLayoutSidebarLeftExpand class="h-6 w-6" />}>
            <TbLayoutSidebarLeftCollapse class="h-6 w-6" />
          </Show>
        )}
      </Toggle>
      {props.children}
    </aside>
  )
}
