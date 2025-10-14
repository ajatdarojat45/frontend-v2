import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetSimulationSettingsQuery } from "@/store/simulationSettingsApi";
import { setOptions, updateValue } from "@/store/simulationSettingsSlice";
import { DynamicSettingField } from "./DynamicSettingField";
import { ChevronRight } from "lucide-react";
import { useSimulationSettingsApi } from "@/hooks/useSimulationSettingsApi";
import type { RootState } from "@/store";
import type { SimulationSettingsState } from "@/types/simulationSettings";
import { SettingJsonEditor } from "./SettingJsonEditor";

export function SettingTab() {
  const dispatch = useDispatch();
  const { options, values } = useSelector((state: RootState) => state.simulationSettings);
  const [showGeneralSettings, setShowGeneralSettings] = useState(true);
  const [showExtendedSettings, setShowExtendedSettings] = useState(true);

  const { simulation, simulationError, updateSimulationSettings } = useSimulationSettingsApi();

  const { data: settingsData, error, isLoading } = useGetSimulationSettingsQuery("DE");

  useEffect(() => {
    if (settingsData?.options) {
      dispatch(setOptions(settingsData.options));
    }
  }, [settingsData, dispatch]);

  useEffect(() => {
    if (simulation?.solverSettings?.simulationSettings && settingsData?.options) {
      const existingSettings = simulation.solverSettings
        .simulationSettings as SimulationSettingsState["values"];

      const hasAnyValues = settingsData.options.some((option) => values[option.id] !== undefined);

      if (!hasAnyValues) {
        settingsData.options.forEach((option) => {
          if (existingSettings[option.id] !== undefined) {
            dispatch(updateValue({ id: option.id, value: existingSettings[option.id] }));
          }
        });
      }
    }
  }, [simulation?.solverSettings?.simulationSettings, settingsData?.options, dispatch, values]);

  const handleValueChange = (id: string, value: string | number) => {
    dispatch(updateValue({ id, value }));

    const updatedValues = { ...values, [id]: value };
    updateSimulationSettings(updatedValues);
  };

  const generalSettingsIds = ["de_c0", "de_ir_length", "sim_len_type"];
  const generalSettings = options.filter((option) => generalSettingsIds.includes(option.id));
  const extendedSettings = options.filter((option) => !generalSettingsIds.includes(option.id));

  if (isLoading) {
    return (
      <div className="text-white">
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Settings</h4>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-400">Loading settings...</div>
        </div>
      </div>
    );
  }

  if (error || simulationError) {
    return (
      <div className="text-white">
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Settings</h4>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-red-400">Failed to load simulation settings</div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <div className="mb-4 flex justify-between items-center">
        <h4 className="text-lg font-semibold mb-2">Settings</h4>
        <SettingJsonEditor />
      </div>

      <div className="space-y-8">
        <div>
          <button
            onClick={() => setShowGeneralSettings(!showGeneralSettings)}
            className="w-full flex items-center justify-between py-2 hover:text-gray-300 transition-colors"
          >
            <h5 className="text-md font-medium text-white">General Settings</h5>
            <span
              className={`transform transition-transform ${showGeneralSettings ? "rotate-90" : "rotate-0"}`}
            >
              <ChevronRight size={16} />
            </span>
          </button>
          {showGeneralSettings && (
            <div className="mt-4 space-y-6">
              {generalSettings.map((option) => (
                <DynamicSettingField
                  key={option.id}
                  option={option}
                  value={values[option.id] || option.default}
                  onChange={(value) => handleValueChange(option.id, value)}
                />
              ))}
              {generalSettings.length === 0 && (
                <div className="text-center py-4 text-gray-400 text-sm">
                  No general settings available
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setShowExtendedSettings(!showExtendedSettings)}
            className="w-full flex items-center justify-between py-2 hover:text-gray-300 transition-colors"
          >
            <h5 className="text-md font-medium text-white">Diffusion Equation Settings</h5>
            <span
              className={`transform transition-transform ${showExtendedSettings ? "rotate-90" : "rotate-0"}`}
            >
              <ChevronRight size={16} />
            </span>
          </button>
          {showExtendedSettings && (
            <div className="mt-4 space-y-6">
              {extendedSettings.map((option) => (
                <DynamicSettingField
                  key={option.id}
                  option={option}
                  value={values[option.id] || option.default}
                  onChange={(value) => handleValueChange(option.id, value)}
                />
              ))}
              {extendedSettings.length === 0 && (
                <div className="text-center py-4 text-gray-400 text-sm">
                  No diffusion settings available
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {options.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-400">No settings available</div>
      )}
    </div>
  );
}
