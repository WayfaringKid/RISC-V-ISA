import React from 'react'
import { Github } from 'lucide-react'
import { Button } from './ui/button'

const GitHubButton = () => {
  return (
    <a href="https://github.com/BrianAnakPintar/RISC-V_ISA">
    <Button variant="outline" size="icon">
        <Github className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
    </Button>
    </a>
  )
}

export default GitHubButton