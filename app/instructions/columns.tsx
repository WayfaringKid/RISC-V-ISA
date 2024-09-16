"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from 'next-themes';
import { toast } from "sonner"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ArrowUpDown } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CopyBlock, atomOneDark, atomOneLight } from "react-code-blocks"
import { ScrollArea } from "@/components/ui/scroll-area"



type Operand = {
    name: string,
    type: string,
  }
  type Field = {
    field: string,
    size: number,
  }
  
export type Instruction = {
    mnemonic: string,
    name: string,
    operands: Operand[],
    syntax: string,
    format: string,
    fields: Field[],
    extensions: string[],
    function: string,
    description: string,
}

function displayBitScale(layout: Field[], width: number) {
  let all = [];
  for (let i = width-1; i >= 0; i--) {
      all.push(<td className="instruction-bit-number border" key={i}>{("0" + i.toString()).slice(-2)}</td>);
  }
  return all;
}

function displayField(layout: Field, key: number) {
  if(layout.field.startsWith("0b")){
      const binaryValue = layout.field.substring(2);
      const binaryDigits = binaryValue.split("");

      return binaryDigits.map((digit, index) => (
          <td className="instruction-field border text-center" key={key + "-" + index} colSpan={1}>{digit}</td>
      ));
  }
  else{
      return(<td className="instruction-field border text-center" key={key} colSpan={layout.size}>{layout.field}</td>);
  }
}

function displayFields(layout: Field[]) {
  let all = [];
  for (let i = 0; i < layout.length; i++) {
      all.push(displayField(layout[i],i));
  }
  return all;
}

function displayLayoutRows(layout: Field[] ,width: number) {
  let all = [];
  let bits = 0;
  let start = 0;
  for (let i = 0; i < layout.length; i++) {
      bits += layout[i].size;
      if (bits >= width) {
          all.push(<tr key={start}>{displayFields(layout.slice(start,i+1))}</tr>);
          start = i+1;
          bits = 0;
      }
  }
  return all;
}

function displayLayout(layout: Field[]) {
	  let all = [];
    let width = 0;
    for (let i = 0; i < layout.length; i++) {
        width += layout[i].size;
    }
    if (width > 32) width = 32;
    all.push(displayLayoutRows(layout,width));
    all.push(<tr key="bitScale">{displayBitScale(layout,width)}</tr>);
    return (all);
}

function formatExtension(exts: string[]) {
    let out: string = exts.join(", ");
    return out;
}

function copyToClipboard(str: string) {
  navigator.clipboard.writeText(str);
  toast.success("Successfully copied to clipboard", {
    description: str,
  })
}

export const columns: ColumnDef<Instruction>[] = [
  {
    accessorKey: "mnemonic",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="font-bold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mnemonic
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "name",
    header: () => <div className="font-bold">Instruction Name</div>,
  },
  {
    accessorKey: "syntax",
    header: () => <div className="font-bold">Syntax</div>,
    cell: ({ row }) => {
        return <button onClick={() => copyToClipboard(row.original.mnemonic + ' ' + row.original.syntax)}>
                       <code className="inline-code">{row.original.mnemonic} {row.original.syntax}</code>
                </button>
    }
  },
  {
    accessorKey: "extensions",
    header: () => <div className="font-bold">Extensions</div>,
    cell: ({ row }) => {
      let exts: string[]  = row.original.extensions;
      let out: string = formatExtension(exts)
      return <div className="font-medium">{out}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      let instr = row.original
      const { theme } = useTheme(); // Get current theme

      const codeTheme = theme === 'dark' ? atomOneDark : atomOneLight; // Select theme based on the mode
      return (
        <div className="text-right">
            <Dialog>
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Instr: {row.getValue("mnemonic")}</DropdownMenuLabel>
                  <DropdownMenuItem
                  onClick={() => copyToClipboard(instr.mnemonic + ' ' + instr.syntax)}
                  >
                  Copy syntax
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DialogTrigger>
                    <DropdownMenuItem>View instruction</DropdownMenuItem>
                  </DialogTrigger>
              </DropdownMenuContent>
              </DropdownMenu>

              {/* The instruction details: */}
              <DialogContent>
              <DialogHeader>
                <DialogTitle> Instruction: {row.getValue("mnemonic")} </DialogTitle>
                <DialogDescription>
                  <ScrollArea className="h-[32rem] rounded-md border p-4">
                    <div className="">
                      <b>Instruction Name:</b> {row.original.name}<br/>
                      <b>Syntax:</b> 
                      <button onClick={() => copyToClipboard(instr.mnemonic + ' ' + instr.syntax)}>
                        <code className="inline-code">{row.original.mnemonic} {row.original.syntax}</code>
                      </button><br/>
                      <b>Extensions:</b> {formatExtension(row.original.extensions)}<br/>
                      <b>Description:</b> {row.original.description}<br/><br/>
                      <table>
                        <tbody>
                            <tr>
                                <td>
                                    <table className="instruction-layout">
                                        <tbody>
                                            {displayLayout(row.original.fields)}
                                        </tbody>
                                    </table>
                                </td>
                                <td style={{textAlign: 'right'}}>{row.original.format}-type</td>
                            </tr>
                        </tbody>
                    </table><br/><br/>
                      <Collapsible>
                      <CollapsibleTrigger className="text-blue-500">View Sail Function.</CollapsibleTrigger>
                        <CollapsibleContent>
                          <CopyBlock text={row.original.function}
                                      language="txt"
                                      theme={codeTheme}
                                      wrapLongLines/>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </ScrollArea>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
            </Dialog>
        </div>
      )
    },
  },
]