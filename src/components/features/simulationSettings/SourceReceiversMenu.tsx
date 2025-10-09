import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

interface SourceReceiversMenuProps {
  onAddNew: () => void;
  onRemoveAll: () => void;
  canAdd?: boolean;
}

export function SourceReceiversMenu({
  onAddNew,
  onRemoveAll,
  canAdd = true,
}: SourceReceiversMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical size={20} className="text-white hover:cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onAddNew} disabled={!canAdd}>
          Add new {!canAdd && "(Max 1)"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRemoveAll}>Remove all</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
