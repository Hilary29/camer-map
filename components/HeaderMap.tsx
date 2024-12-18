"use client"

import * as React from "react"
import logo from '../public/img/C@merMap.png'

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import CountDown from "./CountDown"
import LanguageSwitcher from "./LanguageSwitcher"
import { useTranslations } from "next-intl"

const targetDate="2024-12-19T07:20:00";


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Election Senatoriale",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Election Legislative",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  }
]

export function HeaderMap() {
const t = useTranslations("NavBarLinks") 
  return (
    <header className=" fixed top-0 left-0 w-full  z-50">
      <div className=" mx-auto flex justify-between items-center px-16 py-1.5">
      
        <div className="flex items-center gap-2">     
             <Image
             src={logo}
             width={126}
             height={126}
             alt="logo"
             />                   
        </div>

        <nav className="hidden lg:flex font-inter text-paragraph-md">
          <NavigationMenu className=" text-black-100 ">
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white-50 font-inter p-2 bg-[#093B14] rounded-sm ">{t("elections_Presidentielles")}</NavigationMenuTrigger>
                <NavigationMenuContent>
                <ul className="grid w-[300px] gap-3 p-4">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-[18px] font-inter text-paragraph-md">
            <CountDown targetDate={targetDate} />
            <LanguageSwitcher/>
        </div>
      </div>
   </header>

  )
}

