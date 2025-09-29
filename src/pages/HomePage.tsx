import { Button } from "@/components/ui/button"
import { http } from "@/libs/http"
import { useEffect } from "react"
import { Link } from "react-router"

export function HomePage() {

  useEffect(() => {
    http.get('/projects')
      .then(console.log)
  }, [])

  return (
    <div>
      Home Page
      <Button asChild>
        <Link to="/editor">Go to Editor</Link>
      </Button>
    </div>
  )
}