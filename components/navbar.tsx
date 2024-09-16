"use client"

import React from 'react'
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import CmdButton  from './cmd-button'
import { ModeToggle } from './dark-mode-toggle'
import Image from 'next/image'
import riscv_icon from '@/app/icon.png'
import GitHubButton from './github-button'


const Navbar = () => {
  return (
    <div className='w-full p-5'>
        <NavigationMenu className='flex w-full justify-between'>
            <NavigationMenuList>
                <NavigationMenuItem>
                    RISC-V <b>ISA Reference</b>
                </NavigationMenuItem>
                {/* ISA Portion. */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Instructions</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <ListItem href="/instructions" title="Instructions">
                              A list of available instructions, there's a lot.
                            </ListItem>
                            <ListItem href="/registers" title="Registers">
                              A list of all 32 available registers in a RISC-V system.
                            </ListItem>
                            <ListItem href="/extensions" title="Extensions">
                              A list of the extensions added on top of RISC-V.
                            </ListItem>
                            </ul>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                {/* References */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>References</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                <a
                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                    href="/"
                                >
                                    <Image src={riscv_icon} alt="icon"/>
                                    <div className="mb-2 mt-4 text-lg font-medium">
                                    RISC-V International.
                                    </div>
                                    <p className="text-sm leading-tight text-muted-foreground">
                                    The official page.
                                    </p>
                                </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="https://riscv.org/technical/specifications" title="RISC-V Specifications">
                              The complete specifications of the RISC-V architecture.
                            </ListItem>
                            <ListItem href="https://github.com/riscv/sail-riscv" target='_blank' title="RISC-V Sail Model">
                              This repository contains a formal specification of the RISC-V architecture, written in Sail.
                            </ListItem>
                            <ListItem href="https://github.com/ThinkOpenly/sail/tree/json" target='_blank' title="RISC-V Sail to JSON">
                              This repository contains the code in which
                            </ListItem>
                            </ul>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>

            {/* Search bar here */}
            <div className="flex gap-4">
              <CmdButton/>
              <GitHubButton/>
              <ModeToggle/>
            </div>
        </NavigationMenu>        
    </div>
  )
}

export default Navbar

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