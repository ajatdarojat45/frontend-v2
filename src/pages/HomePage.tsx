import { ProjectCard } from "@/components/features/ProjectCard"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { AppLayout } from "@/components/ui/app-layout"
import { Button } from "@/components/ui/button"
import { Loading } from "@/components/ui/loading"
import { useCreateProjectMutation, useGetProjectsQuery } from "@/store/projectApi"
import { AlertCircleIcon } from "lucide-react"
import type React from "react"
import { Link } from "react-router"

export function HomePage() {
  const { data: projects, isLoading, error } = useGetProjectsQuery()
  const [createProject] = useCreateProjectMutation()


  let content: React.ReactNode = null;

  if (error) {
    content = (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
        <Alert variant="destructive" className="max-w-sm">
          <AlertCircleIcon />
          <AlertTitle>Error loading projects</AlertTitle>
        </Alert>
      </div>
    );
  } else if (isLoading) {
    content = (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
        <Loading message="Loading projects..." />
      </div>
    );
  } else if (!projects || projects.length === 0) {
    content = <div>No projects found</div>;
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {projects.map(project => (
          <Link key={project.id} to={`/projects/${project.id}`}>
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
    );
  }

  return (
    <AppLayout
      title="Projects"
      action={
        <Button onClick={() => createProject({ name: "New Project", description: "Project Description", group: "Project Group" })} variant='secondary'>
          Create new project
        </Button>
      }
      sidebar={<h1>Sidebar</h1>}
    >
      {content}
    </AppLayout>
  );
}