import { ProjectForm } from "@/components/features/ProjectForm";
import { ProjectCard } from "@/components/features/ProjectCard";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AppLayout } from "@/components/ui/app-layout";
import { Loading } from "@/components/ui/loading";
import { useGetProjectsQuery } from "@/store/projectApi";
import { selectProjectsByActiveGroup } from "@/store/projectSelector";
import { AlertCircleIcon } from "lucide-react";
import plusIcon from "@/assets/plus-icon.png";
import type React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { WelcomeSidebar } from "@/components/features/WelcomeSidebar";
import { GroupPicker } from "@/components/features/GroupPicker";
import { DeleteGroup } from "@/components/features/DeleteGroup";
import { syncGroupsFromProjects } from "@/store/projectSlice";
import { useEffect } from "react";

export function HomePage() {
  const { data: projects, isLoading, error } = useGetProjectsQuery();
  const groupProjects = useSelector(selectProjectsByActiveGroup);
  const dispatch = useDispatch();

  // Sync groups from projects to Redux state when projects load
  useEffect(() => {
    if (projects) {
      const groupsFromProjects = projects.filter((p) => p.group).map((p) => p.group as string);

      if (groupsFromProjects.length > 0) {
        dispatch(syncGroupsFromProjects(groupsFromProjects));
      }
    }
  }, [projects, dispatch]);

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
    content = (
      <div className="p-6 h-container relative">
        <div className="fixed right-8 top-20">
          <GroupPicker />
        </div>

        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-inter font-light text-choras-dark">No projects found</h2>
            <p className="text-black/75">Create your first project to get started</p>
          </div>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="p-6 relative">
        <div className="fixed right-8 top-20">
          <GroupPicker />
        </div>
        {groupProjects.map((groupProject) => (
          <div key={groupProject.group}>
            <h1 className="inline pb-2 text-lg font-inter font-light border-b text-choras-dark border-b-choras-dark">
              {groupProject.group === "NONE" ? "Ungrouped" : groupProject.group}

              <DeleteGroup
                projectsCount={groupProject.projects.length}
                group={groupProject.group}
              />
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b border-b-black/25 mt-5 pb-8 mb-6">
              {groupProject.projects.map((project) => (
                <Link key={project.id} to={`/projects/${project.id}`}>
                  <ProjectCard project={project} />
                </Link>
              ))}

              <ProjectForm
                defaultValues={{
                  name: "",
                  description: "",
                  group: groupProject.group === "NONE" ? "" : groupProject.group,
                }}
                trigger={
                  <div className="min-h-[192px] border border-transparent bg-gradient-to-r from-choras-primary from-50% to-choras-secondary bg-clip-border p-0.5 rounded-xl">
                    <div className="bg-[#e7e7e7] w-full min-h-[190px] py-6 rounded-lg h-full flex-1 flex items-center justify-center">
                      <img src={plusIcon} alt="Plus" className="w-16 h-16" />
                    </div>
                  </div>
                }
              />
            </div>
          </div>
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
