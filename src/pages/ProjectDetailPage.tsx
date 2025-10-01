import { Alert, AlertTitle } from "@/components/ui/alert"
import { AppLayout } from "@/components/ui/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loading } from "@/components/ui/loading"
import type { AppDispatch } from "@/store"
import { useGetProjectQuery } from "@/store/projectApi"
import { simulationApi } from "@/store/simulationApi"
import { selectSimulationCountByProjectId } from "@/store/simulationSelector"
import { AlertCircleIcon, CalendarIcon, ClockIcon, FolderIcon, UsersIcon } from "lucide-react"
import type React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"

export function ProjectDetailPage() {
  const dispatch: AppDispatch = useDispatch()
  const { id } = useParams() as { id: string }
  const { data: project, isLoading, error } = useGetProjectQuery(id)
  const simulationCount = useSelector(selectSimulationCountByProjectId(Number(id)))

  console.log({ simulationCount, id: Number(id) });



  useEffect(() => {
    if (project && project.models.length > 0) {
      project.models.forEach(model => {
        dispatch(simulationApi.endpoints.getSimulationsByModelId.initiate(model.id))
      })
    }
  }, [project])


  let content: React.ReactNode = null;

  if (error) {
    content = (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
        <Alert variant="destructive" className="max-w-sm">
          <AlertCircleIcon />
          <AlertTitle>Error loading project</AlertTitle>
        </Alert>
      </div>
    );
  } else if (isLoading) {
    content = (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
        <Loading message="Loading project..." />
      </div>
    );
  } else if (!project) {
    content = <div>No project found</div>;
  } else {
    content = (
      <div className="space-y-6 p-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderIcon className="h-5 w-5" />
              {project.name}
            </CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Group:</span> {project.group}
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Created:</span> {new Date(project.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Updated:</span> {new Date(project.updatedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">ID:</span> {project.id}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5" />
              Models ({project.models?.length || 0})
            </CardTitle>
            <CardDescription>Associated models for this project</CardDescription>
          </CardHeader>
          <CardContent>
            {project.models && project.models.length > 0 ? (
              <div className="space-y-6">
                {project.models.map((model) => (
                  <div
                    key={model.id}
                    className="w-full rounded-lg border border-teal-200 bg-white p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
                  >
                    {/* Left: waveform icon */}
                    <div className="flex-shrink-0 flex items-center justify-center">
                      <svg width="84" height="48" viewBox="0 0 84 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id={`g-${model.id}`} x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor="#6366F1" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                          </linearGradient>
                        </defs>
                        <g stroke={`url(#g-${model.id})`} strokeWidth="6" strokeLinecap="round">
                          <path d="M6 24v-8m10 8v-16m10 16v-6m10 6v-20m10 20v-8m10 8v-12m10 12v-4" />
                        </g>
                      </svg>
                    </div>

                    {/* Center: model name */}
                    <div className="flex-1 flex flex-col items-center md:items-start">
                      <h4 className="text-2xl font-semibold text-center md:text-left mb-2">{model.name}</h4>
                    </div>

                    {/* Center-right: meta info */}
                    <div className="flex flex-col gap-2 items-center md:items-start text-slate-500 text-lg min-w-[220px]">
                      <div className="flex items-center gap-2">
                        <span>Contains {simulationCount} simulations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Created in {new Date(model.createdAt).toLocaleString(undefined, { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-400">Contains .geo file</span>
                      </div>
                    </div>

                    {/* Right: CTA */}
                    <div className="flex items-center">
                      <Button variant="outline">Open model</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No models associated with this project.</p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <AppLayout
      title={project ? project.name : "Project Detail"}
      sidebar={<h1>Sidebar</h1>}
    >
      {content}
    </AppLayout>
  );
}