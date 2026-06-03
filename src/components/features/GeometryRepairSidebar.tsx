import {
  clearSelectedIssue,
  setIssueGroupExpanded,
  setRemainingIssues,
  setSelectedIssue,
  type GeometryIssue,
  type GeometryIssueInputs,
} from "@/store/geometryIssueSlice";
import { useGetModelQuery } from "@/store/modelApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import type { RootState } from "@/store";
import { SimulationForm } from "./SimulationForm";
import { Button } from "../ui/button";
import { GeometryIssueList } from "./GeometryIssueList";

type RepairSummaryItem = {
  category: string;
  fixed: number;
  remaining: number;
  unit: string;
};

const REPAIR_SUMMARY_EXAMPLE: RepairSummaryItem[] = [
  { category: "Deduplication", fixed: 100, remaining: 10, unit: "vertex" },
  { category: "T-Junction", fixed: 30, remaining: 0, unit: "issue" },
  { category: "Intersection", fixed: 8, remaining: 5, unit: "issue" },
];

const MODEL_DATA_EXAMPLE: {
  hasGeometryIssues: boolean;
  geometryIssues: GeometryIssueInputs;
} = {
  hasGeometryIssues: true,
  geometryIssues: {
    duplicate_vertices: [],
    non_coplanar_faces: [],
    "T-junctions": [],
    possible_holes: [],
    boundary_edges: [
      {
        elements: [
          {
            points: [
              [3.21057, -2.700256, -0.211772],
              [3.21057, 6.753312, -0.211774],
            ],
            type: "edge",
          },
        ],
        id: "eb737c768529",
        severity: "medium",
      },
      {
        elements: [
          {
            points: [
              [3.21057, -2.700256, -0.492757],
              [3.21057, -2.700256, -0.211772],
            ],
            type: "edge",
          },
        ],
        id: "ebbea5265441",
        severity: "medium",
      },
      {
        elements: [
          {
            points: [
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, -2.700256, -0.211772],
            ],
            type: "edge",
          },
        ],
        id: "61363bf62151",
        severity: "medium",
      },
      {
        elements: [
          {
            points: [
              [-2.409125, -2.700256, -0.211772],
              [-2.409125, 6.753312, -0.211774],
            ],
            type: "edge",
          },
        ],
        id: "8547a3ec5366",
        severity: "medium",
      },
      {
        elements: [
          {
            points: [
              [-3.27215, 3.305226, 0.596426],
              [4.073594, 3.305226, 0.596426],
            ],
            type: "edge",
          },
        ],
        id: "26dff7ee4529",
        severity: "medium",
      },
      {
        elements: [
          {
            points: [
              [-3.27215, 3.987619, 0.596426],
              [4.073594, 3.987619, 0.596426],
            ],
            type: "edge",
          },
        ],
        id: "27f19919d891",
        severity: "medium",
      },
      {
        elements: [
          {
            points: [
              [-3.27215, 1.82002, 0.596427],
              [4.073594, 1.82002, 0.596427],
            ],
            type: "edge",
          },
        ],
        id: "f63d736f8e1f",
        severity: "medium",
      },
      {
        elements: [
          {
            points: [
              [-3.27215, 2.502413, 0.596427],
              [4.073594, 2.502413, 0.596427],
            ],
            type: "edge",
          },
        ],
        id: "281b4d46b04d",
        severity: "medium",
      },
      {
        elements: [
          {
            points: [
              [-3.27215, -2.635593, 0.596427],
              [4.073594, -2.635593, 0.596427],
            ],
            type: "edge",
          },
        ],
        id: "33344b3b0171",
        severity: "medium",
      },
      {
        elements: [
          {
            points: [
              [-3.27215, -1.953202, 0.596427],
              [4.073594, -1.953202, 0.596427],
            ],
            type: "edge",
          },
        ],
        id: "52bb7889962f",
        severity: "medium",
      },
      {
        elements: [
          {
            points: [
              [-3.27215, -1.150388, 0.596427],
              [4.073594, -1.150388, 0.596427],
            ],
            type: "edge",
          },
        ],
        id: "b971e5c19dce",
        severity: "medium",
      },
      {
        elements: [
          {
            points: [
              [-3.27215, -0.467997, 0.596427],
              [4.073594, -0.467997, 0.596427],
            ],
            type: "edge",
          },
        ],
        id: "b339a074d311",
        severity: "medium",
      },
      {
        elements: [
          {
            points: [
              [-3.27215, 0.334816, 0.596427],
              [4.073594, 0.334816, 0.596427],
            ],
            type: "edge",
          },
        ],
        id: "7e8dc1c8c076",
        severity: "medium",
      },
      {
        elements: [
          {
            points: [
              [-3.27215, 1.017206, 0.596427],
              [4.073594, 1.017206, 0.596427],
            ],
            type: "edge",
          },
        ],
        id: "45f99f82b931",
        severity: "medium",
      },
      {
        elements: [
          {
            points: [
              [-3.27215, 4.791205, 0.596426],
              [4.073594, 4.791205, 0.596426],
            ],
            type: "edge",
          },
        ],
        id: "a11f01b63b04",
        severity: "medium",
      },
      {
        elements: [
          {
            points: [
              [-3.27215, 5.473595, 0.596426],
              [4.073594, 5.473595, 0.596426],
            ],
            type: "edge",
          },
        ],
        id: "73419dc12367",
        severity: "medium",
      },
      {
        elements: [
          {
            points: [
              [-3.27215, 6.275636, 0.596426],
              [4.073594, 6.275636, 0.596426],
            ],
            type: "edge",
          },
        ],
        id: "bff7776e656a",
        severity: "medium",
      },
    ],
    degenerate_faces: [],
    intersections: [],
  },
};

export default function GeometryRepairSidebar() {
  const { modelId } = useParams() as { modelId: string };
  useGetModelQuery(modelId);
  const dispatch = useDispatch();
  const { remainingIssues, selectedIssue, expandedIssueGroups } = useSelector(
    (state: RootState) => {
      return state.geometryIssue;
    },
  );

  useEffect(() => {
    dispatch(setRemainingIssues(MODEL_DATA_EXAMPLE.geometryIssues));
  }, []);

  const toggleIssueGroup = (groupKey: string) => {
    dispatch(clearSelectedIssue());
    dispatch(
      setIssueGroupExpanded({
        groupKey,
        isExpanded: !expandedIssueGroups[groupKey],
      }),
    );
  };

  const handleIssueClick = (isSelected: boolean, issue: GeometryIssue) => {
    if (isSelected) {
      dispatch(clearSelectedIssue());
      return;
    }

    dispatch(setSelectedIssue(issue));
  };

  return (
    <div className="h-container flex flex-col border border-slate-300 bg-[#DCDCDC] p-1">
      <div className="h-full flex flex-col rounded-md bg-white/65 text-slate-700 font-inter p-2">
        <div className="min-h-0 flex flex-1 flex-col pr-1">
          <div className="mb-4 rounded-md border border-slate-300 bg-gradient-to-b from-white to-slate-100 p-3 shadow-[0_8px_18px_rgba(15,23,42,0.12)]">
            <div className="mb-3 rounded-md border border-slate-300 bg-white/80 px-3 py-2">
              <h4 className="flex items-center gap-2 text-left text-sm font-semibold uppercase tracking-wide text-choras-primary">
                Possible Simulation
              </h4>
              <p className="mt-0.5 text-left text-[11px] text-slate-500">
                Choose algorithm then run a new simulation.
              </p>
            </div>
            <div className="mb-3 grid grid-cols-2 gap-2">
              <span className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-center text-xs font-semibold tracking-wide text-slate-600">
                DE
              </span>
              <span className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-center text-xs font-semibold tracking-wide text-slate-600">
                DG
              </span>
            </div>
            <div className="rounded-md border border-slate-300 bg-gradient-to-b from-white to-slate-100 p-2.5">
              <div className="mb-2 flex items-center justify-between rounded-md border border-slate-300 bg-white/80 px-2.5 py-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Quick Action
                </span>
              </div>
              <div className="mx-auto flex w-full max-w-md justify-center">
                <SimulationForm
                  modelId={Number(modelId)}
                  className="w-full border-choras-primary/45 bg-white text-choras-primary hover:bg-choras-primary/10"
                />
              </div>
              <div className="mx-auto mt-2 flex w-full max-w-md justify-center">
                <Button
                  variant="outline"
                  className="w-full border-red-400 bg-white text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  Undo Repair
                </Button>
              </div>
            </div>
          </div>
          <div className="mb-4 rounded-md border border-slate-300 bg-white/75 p-3">
            <div className="mb-2 rounded-md border border-slate-300 bg-white px-3 py-2">
              <h4 className="text-base font-semibold tracking-wide text-choras-primary">
                Repair Summary
              </h4>
            </div>
            <ul className="space-y-1.5 px-1">
              {REPAIR_SUMMARY_EXAMPLE.map((item) => (
                <li key={item.category} className="text-[12px] text-slate-600">
                  <span className="font-semibold text-slate-700">{item.category}:</span>{" "}
                  {item.fixed} {item.unit} removed &amp;
                  <span
                    className={
                      item.remaining > 0
                        ? "text-amber-600 font-semibold"
                        : "text-green-600 font-semibold"
                    }
                  >
                    {" "}
                    {item.remaining} remain
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <GeometryIssueList
            issues={remainingIssues}
            selectedIssue={selectedIssue}
            expandedIssueGroups={expandedIssueGroups}
            onToggleGroup={toggleIssueGroup}
            onIssueClick={handleIssueClick}
            label="Remaining Issue"
          />
        </div>
      </div>
    </div>
  );
}
