import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import {
  useDeleteProjectsByGroupMutation,
  useUpdateProjectsByGroupMutation,
} from "@/store/projectApi";
import { toast } from "sonner";

type DeleteGroupProps = {
  group: string;
};

export function DeleteGroup({ group }: DeleteGroupProps) {
  const [open, setOpen] = useState(false);
  const [deleteProjectByGroup, { isLoading: isDeleting }] = useDeleteProjectsByGroupMutation();
  const [updateProjectsByGroup, { isLoading: isUpdating }] = useUpdateProjectsByGroupMutation();

  const handleUpdateProjects = async () => {
    try {
      console.log(`Update group: ${group}`);
      await updateProjectsByGroup({ group, newGroup: "" }).unwrap();
      setOpen(false);
    } catch (error) {
      console.error("Failed to delete group:", error);
      toast.error("Failed to delete group");
    }
  };
  const handleDeleteProjects = async () => {
    try {
      console.log(`Delete group and all projects: ${group}`);
      await deleteProjectByGroup(group === "NONE" ? "" : group).unwrap();
      setOpen(false);
    } catch (error) {
      console.error("Failed to delete group and projects:", error);
      toast.error("Failed to delete group and projects");
    }
  };

  return (
    <ConfirmDialog
      title="Delete Group"
      description={`Are you sure you want to delete "${group}"? You can also delete all projects in this group. This action cannot be undone.`}
      trigger={
        <Button variant="ghost" size="sm">
          <TrashIcon className="size-4 text-destructive" />
        </Button>
      }
      open={open}
      onOpenChange={setOpen}
      footer={
        <div className="flex gap-2 w-full justify-between">
          <Button variant="outline" disabled={isDeleting} onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-600"
              disabled={isUpdating}
              onClick={handleUpdateProjects}
              aria-busy={isUpdating}
            >
              {isUpdating ? "Deleting…" : "Delete Group Only"}
            </Button>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDeleteProjects}
              aria-busy={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Delete Group & Projects"}
            </Button>
          </div>
        </div>
      }
    />
  );
}
