import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { PlusIcon } from "lucide-react";

const CreateGroupSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
});

type CreateGroupData = z.infer<typeof CreateGroupSchema>;

type CreateGroupProps = {
  onCreate: (data: CreateGroupData) => void;
};
export function CreateGroup({ onCreate }: CreateGroupProps) {
  // Managing the dialog open state
  const [open, setOpen] = useState(false);

  const form = useForm<CreateGroupData>({
    resolver: zodResolver(CreateGroupSchema),
    defaultValues: { name: "" },
  });

  // Reset form when dialog is closed
  useEffect(() => {
    if (!open) form.reset();
  }, [open]);

  const onSubmit = (data: CreateGroupData) => {
    onCreate(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mt-2">
          <PlusIcon />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              // Prevent parent dialog from submitting and closing automatically
              e.stopPropagation();

              // Call the form submit handler
              form.handleSubmit(onSubmit)(e);
            }}
          >
            <DialogHeader>
              <DialogTitle>Create Group</DialogTitle>
              <DialogDescription>Create a new group to organize projects.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Group name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
