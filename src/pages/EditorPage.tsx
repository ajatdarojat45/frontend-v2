import { AppLayout } from "@/components/ui/app-layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function EditorPage() {
  return (
    <AppLayout
      title="Editor"
      action={
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      }
      sidebar={<h1>Tools</h1>}
    >
      <Button variant="outline" asChild>
        <Link to="/">Back to Home</Link>
      </Button>
    </AppLayout>
  )
}