import React from 'react'
import { DataTable } from './instruction-table'
import { Instruction } from './columns'
import { columns } from './columns'
import ISA from '@/data/ISA.json'

const InstructionsPage = () => {
  let instr: any[] = ISA.instructions
  return (
    <div>
      <DataTable columns={columns} data={instr}></DataTable>
    </div>
  )
}

export default InstructionsPage