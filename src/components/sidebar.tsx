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
        "group flex min-h-screen w-14 flex-col py-4 transition-size duration-300 aria-expanded:w-64",
        expanded() && "px-4",
        props.class
      )}
      {...rest}
      aria-expanded={expanded() ? "true" : "false"}
    >
      <div class={cn("flex", expanded() ? "justify-between" : "justify-center")}>
        <div class={cn("flex items-center", !expanded() && "hidden")}>
          <img src="logo.svg" class="mr-2 h-6 w-6" /> SOLID START
        </div>
        <Toggle pressed={expanded()} onChange={setExpanded}>
          {(state) => (
            <Show when={state.pressed()} fallback={<TbLayoutSidebarLeftExpand class="h-5 w-5" />}>
              <TbLayoutSidebarLeftCollapse class="h-5 w-5" />
            </Show>
          )}
        </Toggle>
      </div>
      <For each={NAV}>
        {(group) => (
          <div>
            <Separator class="my-3" />
            <h4
              class={cn(
                "mb-1 rounded-md py-1 text-sm font-semibold uppercase text-muted-foreground",
                !expanded() && "hidden"
              )}
            >
              {group.label}
            </h4>
            <div class="grid grid-flow-row auto-rows-max text-sm">
              <For each={group.items}>
                {(item) => (
                  <a class={cn(buttonVariants({ variant: "ghost" }), "justify-start")}>
                    <item.icon
                      class={cn("h-5 w-5 transition-spacing duration-300", expanded() && "mr-2")}
                    />{" "}
                    <span class={cn(!expanded() && "hidden")}>{item.label}</span>
                  </a>
                )}
              </For>
            </div>
          </div>
        )}
      </For>
      {props.children}
    </aside>
  )
}
