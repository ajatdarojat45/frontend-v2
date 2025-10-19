import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router";

type EditorNavProps = {
  active: "geometry" | "results";
  modelId: number;
  simulationId: number;
};

export function EditorNav({ active, modelId, simulationId }: EditorNavProps) {
  return (
    <Tabs defaultValue={active}>
      <TabsList className="fixed h-8 top-16 p-0 w-100 z-10 bg-transparent">
        <TabsTrigger
          value="geometry"
          className="w-full h-full rounded-tl-none rounded-tr-none data-[state=active]:bg-choras-dark data-[state=active]:text-choras-primary text-choras-primary/50 flex items-center justify-center bg-choras-dark/50 cursor-pointer"
          style={{
            textOrientation: "mixed",
            clipPath: "polygon(0 0, 100% 0, 100% 1%, 85% 100%, 15% 100%, 0 1%)",
          }}
          asChild
        >
          <Link replace to={`/editor/${modelId}/${simulationId}`}>
            Geometry
          </Link>
        </TabsTrigger>
        <TabsTrigger
          value="results"
          className="w-full h-full rounded-tl-none rounded-tr-none data-[state=active]:bg-choras-dark data-[state=active]:text-[#F093FB] text-[#F093FB]/50 flex items-center justify-center bg-choras-dark/50 cursor-pointer"
          style={{
            textOrientation: "mixed",
            clipPath: "polygon(0 0, 100% 0, 100% 1%, 85% 100%, 15% 100%, 0 1%)",
          }}
          asChild
        >
          <Link replace to={`/editor/${modelId}/${simulationId}/results`}>
            Results
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
