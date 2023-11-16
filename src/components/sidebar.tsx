import type { ComponentProps } from "solid-js"
import { For, Show, createSignal, splitProps } from "solid-js"

import type { IconTypes } from "solid-icons"
import {
  TbCalendar,
  TbCertificate,
  TbFileText,
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
  TbLifebuoy,
  TbPresentation
} from "solid-icons/tb"

import { buttonVariants } from "./ui/button"
import { Separator } from "./ui/separator"
import { ModeToggle } from "~/components/mode-toggle"
import { Toggle } from "~/components/ui/toggle"
import { cn } from "~/lib/utils"

type Group = {
  label: string
  items: Item[]
}

type Item = {
  label: string
  icon: IconTypes
}

const NAV: Group[] = [
  {
    label: "Learn",
    items: [
      { label: "Courses", icon: TbPresentation },
      { label: "Docs", icon: TbFileText },
      { label: "Certifications", icon: TbCertificate }
    ]
  },
  {
    label: "Engage",
    items: [
      { label: "Support", icon: TbLifebuoy },
      { label: "Events", icon: TbCalendar }
    ]
  }
]

export function Sidebar(props: ComponentProps<"aside">) {
  const [, rest] = splitProps(props, ["class", "children"])
  const [expanded, setExpanded] = createSignal(true)
  return (
    <aside
      class={cn(
        "group flex min-h-screen w-[50px] flex-col justify-between border-r transition-all duration-300 aria-expanded:w-[200px]",
        props.class
      )}
      {...rest}
      aria-expanded={expanded() ? "true" : "false"}
    >
      <div class={cn(expanded() ? "p-4" : "")}>
        <For each={NAV}>
          {(group) => (
            <div class="pb-4">
              <h4
                class={cn(
                  "mb-1 rounded-md py-1 text-sm font-semibold uppercase text-muted-foreground transition-opacity duration-200",
                  expanded() ? "opacity-100" : "opacity-0"
                )}
              >
                {group.label}
              </h4>
              <div class="grid grid-flow-row auto-rows-max text-sm">
                <For each={group.items}>
                  {(item) => (
                    <a class={cn(buttonVariants({ variant: "ghost" }), "justify-start")}>
                      <item.icon
                        class={cn(
                          "transition-spacing h-5 w-5 duration-300",
                          expanded() ? "mr-2" : ""
                        )}
                      />{" "}
                      <span
                        class={cn(
                          "transition-opacity duration-200",
                          expanded() ? "opacity-100" : "opacity-0"
                        )}
                      >
                        {item.label}
                      </span>
                    </a>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
      <div
        class={cn(
          "flex items-center justify-evenly border-t",
          expanded() ? "flex-row" : "flex-col"
        )}
      >
        <ModeToggle />
        <Separator orientation={expanded() ? "vertical" : "horizontal"} />
        <Toggle pressed={expanded()} onChange={setExpanded}>
          {(state) => (
            <Show when={state.pressed()} fallback={<TbLayoutSidebarLeftExpand class="h-5 w-5" />}>
              <TbLayoutSidebarLeftCollapse class="h-5 w-5" />
            </Show>
          )}
        </Toggle>
      </div>
      {props.children}
    </aside>
  )
}
