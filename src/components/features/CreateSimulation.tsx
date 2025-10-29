import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

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
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateSimulationMutation,
  useLazyGetSimulationsByModelIdQuery,
} from "@/store/simulationApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useInitializeSimulationSettings } from "@/hooks/useInitializeSimulationSettings";

const CreateSimulationSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  description: z.string().optional(),
});

type CreateSimulationData = z.infer<typeof CreateSimulationSchema>;

type CreateSimulationProps = {
  modelId: number;
};
export function CreateSimulation({ modelId }: CreateSimulationProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const form = useForm<CreateSimulationData>({
    resolver: zodResolver(CreateSimulationSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [createSimulation, { isLoading }] = useCreateSimulationMutation();
  const [getSimulationsByModelId] = useLazyGetSimulationsByModelIdQuery();
  const { initializeSettings } = useInitializeSimulationSettings();

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  const handleSubmit = async (data: CreateSimulationData) => {
    try {
      const result = await createSimulation({
        ...data,
        modelId,
        layerIdByMaterialId: {},
        solverSettings: {
          simulationSettings: {},
        },
      }).unwrap();

      await initializeSettings(result);

      await getSimulationsByModelId(modelId).unwrap();

      navigate(`/editor/${modelId}/${result.id}`);

      toast.success("Simulation created successfully. Setting initialized");

      setOpen(false);
    } catch {
      toast.error("Failed to create simulation");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="bg-choras-dark border border-choras-primary text-choras-primary hover:bg-white hover:text-choras-dark cursor-pointer"
        >
          Create Simulation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Create Simulation</DialogTitle>
              <DialogDescription>Create a new simulation for your project.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="Simulation name" {...field} />
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
                        disabled={isLoading}
                        placeholder="Short simulation description"
                        {...field}
                      />
                    </FormControl>
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
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
