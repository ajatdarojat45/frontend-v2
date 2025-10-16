import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { SourceReceiversMenu } from "./SourceReceiversMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import type { Source, Receiver } from "@/types/simulation";
import type { RootState } from "@/store";
import {
  addSource,
  removeSource,
  removeAllSources,
  updateSource,
  addReceiver,
  removeReceiver,
  removeAllReceivers,
  updateReceiver,
  updateReceiverValidation,
  selectSource,
  selectReceiver,
  setSources,
  setReceivers,
} from "@/store/sourceReceiverSlice";
import { useSourceReceiverApi } from "@/hooks/useSourceReceiverApi";
import { toast } from "sonner";
import { useSurfaces } from "@/hooks/useSurfaces";
import { validateSourceOrReceiver, getModelBounds } from "@/helpers/sourceReceiverValidation";

export function SourceReceiversTab() {
  const dispatch = useDispatch();
  const sources = useSelector((state: RootState) => state.sourceReceiver.sources);
  const receivers = useSelector((state: RootState) => state.sourceReceiver.receivers);
  const selectedSource = useSelector((state: RootState) => state.sourceReceiver.selectedSource);
  const selectedReceiver = useSelector((state: RootState) => state.sourceReceiver.selectedReceiver);

  const { simulation, simulationError, updateSimulationData, updateReceiversData } =
    useSourceReceiverApi();
  const surfaces = useSurfaces();

  const validateReceiver = (receiver: Receiver): Receiver => {
    const modelBounds = getModelBounds(surfaces);
    const validation = validateSourceOrReceiver(
      { x: receiver.x, y: receiver.y, z: receiver.z },
      modelBounds,
      sources,
      surfaces,
    );

    return {
      ...receiver,
      isValid: validation.isValid,
      validationError: validation.validationError,
    };
  };

  useEffect(() => {
    if (simulation?.sources) {
      dispatch(setSources(simulation.sources));
    }
  }, [simulation?.sources, dispatch]);

  useEffect(() => {
    if (simulation?.receivers && surfaces.length > 0) {
      const validatedReceivers = simulation.receivers.map(validateReceiver);
      dispatch(setReceivers(validatedReceivers));
    }
  }, [simulation?.receivers, surfaces, dispatch]);

  useEffect(() => {
    if (simulationError) {
      toast.error("Cannot load simulation data. Source/Receiver changes will not be saved.");
    }
  }, [simulationError]);

  const handleAddSource = () => {
    if (sources.length >= 1) return;

    const newSource: Source = {
      id: crypto.randomUUID(),
      label: `Source ${sources.length + 1}`,
      orderNumber: sources.length + 1,
      x: 1,
      y: 1,
      z: 1,
    };
    dispatch(addSource(newSource));

    const updatedSources = [...sources, newSource];
    updateSimulationData(updatedSources);
  };

  const handleRemoveSource = (id: string) => {
    dispatch(removeSource(id));

    const updatedSources = sources.filter((source) => source.id !== id);
    updateSimulationData(updatedSources);
  };

  const handleRemoveAllSources = () => {
    dispatch(removeAllSources());

    updateSimulationData([]);
  };

  const handleUpdateSource = (id: string, field: "x" | "y" | "z", value: number) => {
    dispatch(updateSource({ id, field, value }));

    const updatedSources = sources.map((source) =>
      source.id === id ? { ...source, [field]: value } : source,
    );
    updateSimulationData(updatedSources);
  };

  const handleAddReceiver = () => {
    if (receivers.length >= 1) return;

    const newReceiver: Receiver = {
      id: crypto.randomUUID(),
      label: `Receiver ${receivers.length + 1}`,
      orderNumber: receivers.length + 1,
      x: 3,
      y: 3,
      z: 1,
      isValid: true,
    };

    const validatedReceiver = validateReceiver(newReceiver);
    dispatch(addReceiver(validatedReceiver));

    const updatedReceivers = [...receivers, validatedReceiver];
    updateReceiversData(updatedReceivers);
  };

  const handleRemoveReceiver = (id: string) => {
    dispatch(removeReceiver(id));

    const updatedReceivers = receivers.filter((receiver) => receiver.id !== id);
    updateReceiversData(updatedReceivers);
  };

  const handleRemoveAllReceivers = () => {
    dispatch(removeAllReceivers());

    updateReceiversData([]);
  };

  const handleUpdateReceiver = (id: string, field: "x" | "y" | "z", value: number) => {
    dispatch(updateReceiver({ id, field, value }));

    const currentReceiver = receivers.find((r) => r.id === id);
    if (currentReceiver) {
      const updatedReceiver = { ...currentReceiver, [field]: value };
      const validatedReceiver = validateReceiver(updatedReceiver);

      dispatch(
        updateReceiverValidation({
          id,
          isValid: validatedReceiver.isValid,
          validationError: validatedReceiver.validationError,
        }),
      );

      const updatedReceivers = receivers.map((receiver) =>
        receiver.id === id ? validatedReceiver : receiver,
      );
      updateReceiversData(updatedReceivers);
    }
  };

  const handleSourceClick = (sourceId: string) => {
    dispatch(selectSource(selectedSource === sourceId ? null : sourceId));
  };

  const handleReceiverClick = (receiverId: string) => {
    dispatch(selectReceiver(selectedReceiver === receiverId ? null : receiverId));
  };

  return (
    <>
      <div className="text-white border-b border-gray-600 pb-4">
        <div className="mb-4 flex justify-between items-center">
          <h4 className="text-lg font-semibold mb-2">Sources</h4>
          <SourceReceiversMenu
            onAddNew={handleAddSource}
            onRemoveAll={handleRemoveAllSources}
            canAdd={sources.length < 1}
          />
        </div>
        <div className="space-y-2">
          {sources.length === 0 ? (
            <div className="text-xs text-gray-500 italic py-2">Add new source to start editing</div>
          ) : (
            <>
              <div className="text-xs text-gray-500 italic py-2">
                Select Source/Receiver here to edit position
              </div>
              {sources.map((source) => {
                const isSelected = selectedSource === source.id;
                return (
                  <div
                    key={source.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSourceClick(source.id);
                    }}
                    className={`text-xs p-2 ${
                      isSelected
                        ? "bg-yellow-500/20 border border-yellow-500/30"
                        : "hover:bg-gray-700/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1 p-1 rounded cursor-pointer transition-colors">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex items-center justify-center w-6 h-6 ${
                              isSelected ? "bg-yellow-500" : "bg-cyan-500"
                            } text-black rounded-full text-xs font-medium`}
                          >
                            {source.orderNumber}
                          </div>
                          <span
                            className={`text-xs ${isSelected ? "text-yellow-200" : "text-gray-300"}`}
                          >
                            {source.label}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSource(source.id);
                          }}
                          className="p-1 h-6 w-6 text-gray-400 hover:text-red-400"
                        >
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-1 flex-1">
                        <span className="text-xs text-gray-400">X</span>
                        <Input
                          type="number"
                          step="0.01"
                          value={source.x}
                          onChange={(e) =>
                            handleUpdateSource(source.id, "x", parseFloat(e.target.value) || 0)
                          }
                          className="flex-1 h-6 text-xs bg-gray-800 border-gray-600 text-white px-1"
                        />
                      </div>
                      <div className="flex items-center gap-1 flex-1">
                        <span className="text-xs text-gray-400">Y</span>
                        <Input
                          type="number"
                          step="0.01"
                          value={source.y}
                          onChange={(e) =>
                            handleUpdateSource(source.id, "y", parseFloat(e.target.value) || 0)
                          }
                          className="flex-1 h-6 text-xs bg-gray-800 border-gray-600 text-white px-1"
                        />
                      </div>
                      <div className="flex items-center gap-1 flex-1">
                        <span className="text-xs text-gray-400">Z</span>
                        <Input
                          type="number"
                          step="0.01"
                          value={source.z}
                          onChange={(e) =>
                            handleUpdateSource(source.id, "z", parseFloat(e.target.value) || 0)
                          }
                          className="flex-1 h-6 text-xs bg-gray-800 border-gray-600 text-white px-1"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      <div className="text-white pt-4">
        <div className="mb-4 flex justify-between items-center">
          <h4 className="text-lg font-semibold mb-2">Receivers</h4>
          <SourceReceiversMenu
            onAddNew={handleAddReceiver}
            onRemoveAll={handleRemoveAllReceivers}
            canAdd={receivers.length < 1}
          />
        </div>
        <div className="space-y-2">
          {receivers.length === 0 ? (
            <div className="text-xs text-gray-500 italic py-2">
              Add new receiver to start editing
            </div>
          ) : (
            <>
              <div className="text-xs text-gray-500 italic py-2">
                Select Source/Receiver here to edit position
              </div>
              {receivers.map((receiver) => {
                const isSelected = selectedReceiver === receiver.id;
                const hasValidationError = !receiver.isValid && receiver.validationError;
                return (
                  <div
                    key={receiver.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReceiverClick(receiver.id);
                    }}
                    className={`text-xs p-2 ${
                      isSelected
                        ? "bg-yellow-500/20 border border-yellow-500/30"
                        : hasValidationError
                          ? "bg-red-500/20 border border-red-500/30"
                          : "hover:bg-gray-700/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1 p-1 rounded cursor-pointer transition-colors">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex items-center justify-center w-6 h-6 ${
                              isSelected ? "bg-yellow-500" : "bg-yellow-500"
                            } text-black rounded-full text-xs font-medium`}
                          >
                            {receiver.orderNumber}
                          </div>
                          <span
                            className={`text-xs ${isSelected ? "text-yellow-200" : "text-gray-300"}`}
                          >
                            {receiver.label}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveReceiver(receiver.id);
                          }}
                          className="p-1 h-6 w-6 text-gray-400 hover:text-red-400"
                        >
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-1 flex-1">
                        <span className="text-xs text-gray-400">X</span>
                        <Input
                          type="number"
                          step="0.01"
                          value={receiver.x}
                          onChange={(e) =>
                            handleUpdateReceiver(receiver.id, "x", parseFloat(e.target.value) || 0)
                          }
                          className="flex-1 h-6 text-xs bg-gray-800 border-gray-600 text-white px-1"
                        />
                      </div>
                      <div className="flex items-center gap-1 flex-1">
                        <span className="text-xs text-gray-400">Y</span>
                        <Input
                          type="number"
                          step="0.01"
                          value={receiver.y}
                          onChange={(e) =>
                            handleUpdateReceiver(receiver.id, "y", parseFloat(e.target.value) || 0)
                          }
                          className="flex-1 h-6 text-xs bg-gray-800 border-gray-600 text-white px-1"
                        />
                      </div>
                      <div className="flex items-center gap-1 flex-1">
                        <span className="text-xs text-gray-400">Z</span>
                        <Input
                          type="number"
                          step="0.01"
                          value={receiver.z}
                          onChange={(e) =>
                            handleUpdateReceiver(receiver.id, "z", parseFloat(e.target.value) || 0)
                          }
                          className="flex-1 h-6 text-xs bg-gray-800 border-gray-600 text-white px-1"
                        />
                      </div>
                    </div>
                    {hasValidationError && (
                      <div className="mt-2 text-xs text-red-400 px-1">
                        Error: {receiver.validationError}
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
