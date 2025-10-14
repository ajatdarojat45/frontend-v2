import type { Model } from "@/types/model";
import { TrashIcon } from "lucide-react";
import { useGetSimulationsByModelIdQuery } from "@/store/simulationApi";
import { useDeleteModelMutation } from "@/store/modelApi";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { projectApi } from "@/store/projectApi";
import { toast } from "sonner";
import modelImg from "@/assets/model.png";

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
    <div className="min-h-[200px] border border-transparent bg-gradient-to-r from-choras-primary to-choras-secondary bg-clip-border p-0.5 rounded-xl">
      <div className="bg-[#e7e7e7] min-h-[198px] p-4 rounded-lg h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h3 className="font-inter font-bold text-sm text-choras-secondary">{model.name}</h3>
          <ConfirmDialog
            onConfirm={handleDeleteModel}
            title="Delete model"
            description="This action cannot be undone."
            confirmLabel="Delete model"
            confirmVariant="destructive"
            trigger={<TrashIcon className="size-4 text-destructive z-50" />}
          />
        </div>

        <div className="flex items-end justify-between relative">
          <div className="text-black/50 text-xs space-y-1">
            <p>{simulations?.length || 0} simulations</p>
          </div>

          <img
            className="w-32 h-24 object-cover rounded-lg"
            src={modelImg}
            alt="Model Illustration"
          />
        </div>
      </div>
    </div>
  );
}
