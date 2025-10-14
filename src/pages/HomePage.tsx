import { ProjectForm } from "@/components/features/ProjectForm";
import { ProjectCard } from "@/components/features/ProjectCard";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AppLayout } from "@/components/ui/app-layout";
import { Loading } from "@/components/ui/loading";
import { useGetProjectsQuery } from "@/store/projectApi";
import { selectProjectsByActiveGroup } from "@/store/projectSelector";
import { AlertCircleIcon } from "lucide-react";
import type React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { WelcomeSidebar } from "@/components/features/WelcomeSidebar";
import { GroupPicker } from "@/components/features/GroupPicker";

export function HomePage() {
  const { isLoading, error } = useGetProjectsQuery();
  const groupProjects = useSelector(selectProjectsByActiveGroup);

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
  } else if (!groupProjects || groupProjects.length === 0) {
    content = <div>No projects found</div>;
  } else {
    content = (
      <div className="p-6 relative">
        <div className="fixed right-8 top-20">
          <GroupPicker />
        </div>
        {groupProjects.map((groupProject) => (
          <>
            <h1 className="inline pb-2 text-lg font-inter font-light border-b text-choras-dark border-b-choras-dark">
              {groupProject.group}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b border-b-black/25 mt-5 pb-8 mb-6">
              {groupProject.projects.map((project) => (
                <Link key={project.id} to={`/projects/${project.id}`}>
                  <ProjectCard project={project} />
                </Link>
              ))}
            </div>
          </>
        ))}
      </div>
    );
  }

  return (
    <AppLayout title="Projects" right={<ProjectForm />} sidebar={<WelcomeSidebar />}>
      {content}
    </AppLayout>
  );
}
