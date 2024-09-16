import { ClipboardCheck } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function ClipboardAlert() {
  return (
    <div className="fixed bottom-4 right-4">
      <Alert>
        <ClipboardCheck className="h-4 w-4" />
        <AlertTitle className="text-green-600">Success!</AlertTitle>
        <AlertDescription>
          Item successfully copied to clipboard.
        </AlertDescription>
      </Alert>
    </div>
  )
}