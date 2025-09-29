import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export function HomePage() {
  return (
    <div>
      Home Page
      <Button asChild>
        <Link to="/editor">Go to Editor</Link>
      </Button>
    </div>
  )
}