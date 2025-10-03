import type { Model } from "@/types/model";
import { Button } from "@/components/ui/button";
import { AudioLinesIcon } from "lucide-react";
import { useGetSimulationsByModelIdQuery } from "@/store/simulationApi";
import { Link } from "react-router";
import { useDeleteModelMutation } from "@/store/modelApi";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { projectApi } from "@/store/projectApi";
import { toast } from "sonner";

type ModelCardProps = {
  model: Model;
  projectId: string;
};

export function ModelCard({ model, projectId }: ModelCardProps) {
  const dispatch: AppDispatch = useDispatch();
  const { data: simulations } = useGetSimulationsByModelIdQuery(model.id);
  const [deleteModel] = useDeleteModelMutation();

  const handleDeleteModel = async () => {
    try {
      await deleteModel(model.id).unwrap();

      // Invalidate project tag so RTK Query will refetch any queries that provide this tag
      dispatch(projectApi.util.invalidateTags([{ type: "Projects", id: projectId }]));

      toast.success("Model deleted successfully");
    } catch {
      toast.error("Failed to delete model");
    }
  };

  return (
    <div
      key={model.id}
      className="w-full rounded-lg border border-teal-200 bg-white p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
    >
      {/* Left: waveform icon */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <AudioLinesIcon size={64} />
      </div>

      {/* Center: model name */}
      <div className="flex-1 flex flex-col items-center md:items-start">
        <h4 className="text-2xl font-semibold text-center md:text-left mb-2">{model.name}</h4>
      </div>

      {/* Center-right: meta info */}
      <div className="flex flex-col gap-2 items-center md:items-start text-slate-500 text-lg min-w-[220px]">
        <div className="flex items-center gap-2">
          <span>Contains {simulations?.length || 0} simulations</span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            Created in{" "}
            {new Date(model.createdAt).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-pink-400">Contains .geo file</span>
        </div>
      </div>

      {/* Right: CTA */}
      <div className="flex flex-col gap-3 items-center">
        <Button asChild variant="outline">
          <Link to={"/editor/" + model.id}>Open model</Link>
        </Button>
        <ConfirmDialog
          onConfirm={handleDeleteModel}
          title="Delete model"
          description="This action cannot be undone."
          confirmLabel="Delete model"
          confirmVariant="destructive"
        />
      </div>
    </div>
  );
}
