import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function EditorPage() {
  return (
    <div>
      EditorPage

      <Button variant="outline" asChild>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  )
}