import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/style";

const loadingVariants = cva("animate-spin rounded-full border-b-2 border-gray-900", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface LoadingProps extends VariantProps<typeof loadingVariants> {
  message?: string;
}

export function Loading({ message = "Loading...", size }: LoadingProps) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className={cn(loadingVariants({ size }))} />
      <span className="text-sm text-gray-600">{message}</span>
    </div>
  );
}
