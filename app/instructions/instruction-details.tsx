import React from 'react'
import { CopyBlock, dracula } from 'react-code-blocks';
import { Instruction } from './instruction-table';

// This is the details component of an instruction when you uncollapse it.
function InstructionDetails({ instruction } : { instruction: Instruction }) {
  return (
    <div>
      <code>{instruction.syntax}</code>
      <CopyBlock text={instruction.function}
                 language="txt"
                 theme={dracula}
                 wrapLongLines
                 />
      <p>
        {instruction.description}
      </p>
    </div>
  )
}

export default InstructionDetails