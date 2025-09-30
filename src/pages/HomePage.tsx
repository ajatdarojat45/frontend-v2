import { AppLayout } from "@/components/ui/app-layout"
import { Button } from "@/components/ui/button"
import { useCreateProjectMutation, useGetProjectsQuery } from "@/store/projectApi"
import { Link } from "react-router"

export function HomePage() {
  const { data: projects, isLoading, error } = useGetProjectsQuery()
  const [createProject] = useCreateProjectMutation()

  console.log({ projects, isLoading, error });

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading projects</div>
  if (!projects) return <div>No projects found</div>

  return (
    <AppLayout
      title="Home"
      action={
        <Button asChild>
          <Link to="/editor">Go to Editor</Link>
        </Button>
      }
      sidebar={
        <h1>Sidebar</h1>
      }
    >
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
      <Button onClick={() => {
        createProject({ name: "New Project " + Date.now(), group: "Default", description: "A new project" })
      }}>
        New Project
      </Button>
      <Button asChild>
        <Link to="/editor">Go to Editor</Link>
      </Button>
    </AppLayout>
  )
}