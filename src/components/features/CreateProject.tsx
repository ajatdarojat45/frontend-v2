import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { CreateGroup } from "./CreateGroup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { selectGroupsFromProjects } from "@/store/projectSelector";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useCreateProjectMutation } from "@/store/projectApi";
import { Textarea } from "@/components/ui/textarea";

const CreateProjectSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  description: z.string().optional(),
  group: z.string().optional(),
});

type CreateProjectData = z.infer<typeof CreateProjectSchema>;

export function CreateProject() {
  const form = useForm<CreateProjectData>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      group: "",
    },
  });
  const [open, setOpen] = useState(false);
  const [createProject, { isLoading }] = useCreateProjectMutation();

  // Controlling the Select open state to close it when a new group is created
  const [selectOpen, setSelectOpen] = useState(false);

  // We need to manage groups state here because we want to update it when a new group is created
  // So we can't just use the selector directly in the Select component
  const [groups, setGroups] = useState<string[]>([]);

  // Fill groups state with unique groups from projects
  const groupAggregates = useSelector(selectGroupsFromProjects);
  useEffect(() => {
    setGroups(groupAggregates);
  }, [groupAggregates]);

  // Reset form when dialog is closed
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  const handleSubmit = async (data: CreateProjectData) => {
    try {
      await createProject(data).unwrap();
      toast.success("Project created successfully");
      setOpen(false);
    } catch (_) {
      toast.error("Failed to create project");
    }
  };

  const handleCreateGroup = (data: { name: string }) => {
    setSelectOpen(false);

    // Add the new group to the groups state
    if (!groups.includes(data.name)) {
      setGroups([...groups, data.name]);
    }
    toast.success(`Group "${data.name}" selected`);

    // Delay setting the form value to ensure the Select has closed
    setTimeout(() => {
      form.setValue("group", data.name);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Project</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Create Project</DialogTitle>
              <DialogDescription>
                Create a new project to organize your models and simulations.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="Project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Short project description"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="group"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(val === "NONE" ? "" : val)}
                      value={field.value}
                      disabled={isLoading}
                      open={selectOpen}
                      onOpenChange={setSelectOpen}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NONE">No group</SelectItem>
                        {groups.map((group) => (
                          <SelectItem key={group} value={group}>
                            {group}
                          </SelectItem>
                        ))}

                        {/* Create Group */}
                        <CreateGroup onCreate={handleCreateGroup} />
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button disabled={isLoading} variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isLoading} type="submit">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
