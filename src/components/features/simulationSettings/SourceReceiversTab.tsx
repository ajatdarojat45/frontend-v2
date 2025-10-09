import { useState } from "react";
import { SourceReceiversMenu } from "./SourceReceiversMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import type { Source, Receiver } from "@/types/simulation";

export function SourceReceiversTab() {
  const [sources, setSources] = useState<Source[]>([]);

  const [receivers, setReceivers] = useState<Receiver[]>([]);

  const addSource = () => {
    if (sources.length >= 1) return;

    const newSource: Source = {
      id: Date.now().toString(),
      label: `Source ${sources.length + 1}`,
      orderNumber: sources.length + 1,
      x: 1,
      y: 1,
      z: 1,
    };
    setSources([...sources, newSource]);
  };

  const removeSource = (id: string) => {
    setSources(sources.filter((source) => source.id !== id));
  };

  const removeAllSources = () => {
    setSources([]);
  };

  const updateSource = (id: string, field: "x" | "y" | "z", value: number) => {
    setSources(
      sources.map((source) => (source.id === id ? { ...source, [field]: value } : source)),
    );
  };

  const addReceiver = () => {
    if (receivers.length >= 1) return;

    const newReceiver: Receiver = {
      id: Date.now().toString(),
      label: `Receiver ${receivers.length + 1}`,
      orderNumber: receivers.length + 1,
      x: 1,
      y: 1,
      z: 1,
      isValid: true,
    };
    setReceivers([...receivers, newReceiver]);
  };

  const removeReceiver = (id: string) => {
    setReceivers(receivers.filter((receiver) => receiver.id !== id));
  };

  const removeAllReceivers = () => {
    setReceivers([]);
  };

  const updateReceiver = (id: string, field: "x" | "y" | "z", value: number) => {
    setReceivers(
      receivers.map((receiver) =>
        receiver.id === id ? { ...receiver, [field]: value } : receiver,
      ),
    );
  };

  return (
    <>
      <div className="text-white border-b border-gray-600 pb-4">
        <div className="mb-4 flex justify-between items-center">
          <h4 className="text-lg font-semibold mb-2">Sources</h4>
          <SourceReceiversMenu
            onAddNew={addSource}
            onRemoveAll={removeAllSources}
            canAdd={sources.length < 1}
          />
        </div>
        <div className="space-y-2">
          {sources.length === 0 ? (
            <div className="text-xs text-gray-500 italic py-2">Add new source to start editing</div>
          ) : (
            sources.map((source) => (
              <div key={source.id} className="text-xs">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 bg-cyan-500 text-black rounded-full text-xs font-medium">
                      {source.orderNumber}
                    </div>
                    <span className="text-xs text-gray-300">{source.label}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSource(source.id)}
                    className="p-1 h-6 w-6 text-gray-400 hover:text-red-400"
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1 flex-1">
                    <span className="text-xs text-gray-400">X</span>
                    <Input
                      type="number"
                      step="0.01"
                      value={source.x}
                      onChange={(e) =>
                        updateSource(source.id, "x", parseFloat(e.target.value) || 0)
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
                        updateSource(source.id, "y", parseFloat(e.target.value) || 0)
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
                        updateSource(source.id, "z", parseFloat(e.target.value) || 0)
                      }
                      className="flex-1 h-6 text-xs bg-gray-800 border-gray-600 text-white px-1"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="text-white pt-4">
        <div className="mb-4 flex justify-between items-center">
          <h4 className="text-lg font-semibold mb-2">Receivers</h4>
          <SourceReceiversMenu
            onAddNew={addReceiver}
            onRemoveAll={removeAllReceivers}
            canAdd={receivers.length < 1}
          />
        </div>
        <div className="space-y-2">
          {receivers.length === 0 ? (
            <div className="text-xs text-gray-500 italic py-2">
              Add new receiver to start editing
            </div>
          ) : (
            receivers.map((receiver) => (
              <div key={receiver.id} className="text-xs">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 bg-yellow-500 text-black rounded-full text-xs font-medium">
                      {receiver.orderNumber}
                    </div>
                    <span className="text-xs text-gray-300">{receiver.label}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeReceiver(receiver.id)}
                    className="p-1 h-6 w-6 text-gray-400 hover:text-red-400"
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1 flex-1">
                    <span className="text-xs text-gray-400">X</span>
                    <Input
                      type="number"
                      step="0.01"
                      value={receiver.x}
                      onChange={(e) =>
                        updateReceiver(receiver.id, "x", parseFloat(e.target.value) || 0)
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
                        updateReceiver(receiver.id, "y", parseFloat(e.target.value) || 0)
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
                        updateReceiver(receiver.id, "z", parseFloat(e.target.value) || 0)
                      }
                      className="flex-1 h-6 text-xs bg-gray-800 border-gray-600 text-white px-1"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
