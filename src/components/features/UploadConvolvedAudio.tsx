import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useUploadAudioFileMutation } from "@/store/auralizationApi";
import { cleanExt, formatBytes, getFileExt } from "@/helpers/file";

const UploadAudioSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  description: z.string().max(1000).optional(),
  file: z
    .instanceof(File, { message: "Please upload a file." })
    .refine((f: File) => f.size <= 20_000_000, { message: "Max file size is 20MB." })
    .refine((f: File) => /^audio\//.test(f.type), { message: "File must be an audio file." }),
});

type UploadAudioData = z.infer<typeof UploadAudioSchema>;

type UploadConvolvedAudioProps = {
  simulationId: number;
};

export function UploadConvolvedAudio({ simulationId }: UploadConvolvedAudioProps) {
  const [open, setOpen] = useState(false);
  const [uploadAudioFile, { isLoading }] = useUploadAudioFileMutation();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<UploadAudioData>({
    resolver: zodResolver(UploadAudioSchema),
    defaultValues: { name: "", description: "", file: undefined },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
      if (fileInputRef.current?.value) fileInputRef.current.value = "";
    }
  }, [open, form]);

  const handleSubmit = async (data: UploadAudioData) => {
    // UI-only for now. Implement actual upload logic later.
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("file", data.file);
      formData.append("simulation_id", simulationId.toString());
      formData.append("extension", getFileExt(data.file.name));
      await uploadAudioFile(formData).unwrap();
      toast.success("Audio uploaded (UI-only)");
      setOpen(false);
    } catch (error) {
      console.error("Failed to upload audio", error);
      toast.error("Failed to upload audio");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Audio</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Upload Audio</DialogTitle>
              <DialogDescription>Upload a convolved audio file (WAV, MP3, etc.).</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-6">
              <FormField
                control={form.control}
                name="file"
                render={({ field, fieldState: _fieldState }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="audio/*"
                        onChange={(e) => {
                          const f =
                            e.target.files && e.target.files.length > 0
                              ? e.target.files[0]
                              : undefined;
                          field.onChange(f);

                          form.setValue("name", cleanExt(f?.name ?? ""), {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          });
                        }}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />

                    {field.value && (
                      <div className="p-3 border rounded-md">
                        <div className="font-medium">{field.value.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatBytes(field.value.size)}
                        </div>
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Audio name" {...field} disabled={isLoading} />
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
                      <Textarea placeholder="Short description" {...field} disabled={isLoading} />
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Uploading..." : "Upload"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
