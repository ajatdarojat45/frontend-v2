import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addCompareResult, initializeCompareResults } from "@/store/simulationSlice";
import type { RootState } from "@/store";
import { useEffect } from "react";
import { CompareResultItem } from "./CompareResultItem";

interface CompareResultProps {
  modelId: number;
}

const COLORS = [
  "bg-purple-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-pink-500",
];

export function CompareResult({ modelId }: CompareResultProps) {
  const dispatch = useDispatch();
  const compareResults = useSelector((state: RootState) => state.simulation.compareResults);
  const activeSimulation = useSelector((state: RootState) => state.simulation.activeSimulation);

  // Initialize with one result if empty, using activeSimulation
  useEffect(() => {
    if (compareResults.length === 0 && activeSimulation) {
      dispatch(
        initializeCompareResults([
          {
            id: "1",
            simulationId: activeSimulation.id,
            sourceId:
              activeSimulation.sources.length > 0
                ? activeSimulation.sources[0].id.toString()
                : null,
            receiverId:
              activeSimulation.receivers.length > 0
                ? activeSimulation.receivers[0].id.toString()
                : null,
            color: COLORS[0],
          },
        ]),
      );
    }
  }, [dispatch, compareResults.length, activeSimulation]);

  const handleAddResult = () => {
    const newId = (compareResults.length + 1).toString();
    const newColor = COLORS[compareResults.length % COLORS.length];
    dispatch(
      addCompareResult({
        id: newId,
        simulationId: null,
        sourceId: null,
        receiverId: null,
        color: newColor,
      }),
    );
  };

  return (
    <div>
      <h2 className="font-choras text-2xl p-4 font-semibold text-choras-accent">Results</h2>

      {compareResults.map((result) => (
        <CompareResultItem
          key={result.id}
          id={result.id}
          simulationId={result.simulationId}
          sourceId={result.sourceId}
          receiverId={result.receiverId}
          color={result.color}
          modelId={modelId}
          canRemove={compareResults.length > 1}
        />
      ))}

      <div className="m-4">
        <Button
          onClick={handleAddResult}
          variant="outline"
          className="w-full border-choras-accent text-choras-accent hover:bg-choras-accent hover:text-black"
        >
          <Plus size={20} className="mr-1" />
          Add result
        </Button>
      </div>
    </div>
  );
}
