import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

interface SourceReceiversMenuProps {
  onRemoveAll: () => void;
}

export function SourceReceiversMenu({ onRemoveAll }: SourceReceiversMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical size={20} className="text-white hover:cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onRemoveAll}>Remove all</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
