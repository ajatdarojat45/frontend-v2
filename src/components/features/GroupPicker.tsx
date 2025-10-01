import { selectActiveGroup, selectGroupsFromProjects } from "@/store/projectSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setActiveGroup } from "@/store/projectSlice";

export function GroupPicker() {
  const groups = useSelector(selectGroupsFromProjects);
  const dispatch = useDispatch();
  const activeGroup = useSelector(selectActiveGroup);

  return (
    <Select onValueChange={(value) => dispatch(setActiveGroup(value))} value={activeGroup}>
      <SelectTrigger className="bg-white">
        <SelectValue placeholder="Select a group" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">All Groups</SelectItem>
        {groups.map((group) => (
          <SelectItem key={group} value={group}>
            {group}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
