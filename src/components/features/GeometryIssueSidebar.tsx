import {
  setGeometryIssues,
  setSelectedIssue,
  type GeometryIssues,
} from "@/store/geometryIssueSlice";
import { useGetModelQuery } from "@/store/modelApi";
import { ChevronRight } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import type { RootState } from "@/store";

const MODEL_DATA_EXAMPLE: {
  hasGeometryIssues: boolean;
  geometryIssues: GeometryIssues;
} = {
  hasGeometryIssues: true,
  geometryIssues: {
    degenerate_faces: [
      {
        type: "face",
        points: [
          [0, 1, 1],
          [0.8, 1.1, 1],
          [0.2, 1.5, 1],
        ],
        severity: "high",
      },
      {
        type: "face",
        points: [
          [0, 2, 2],
          [0.9, 2, 2],
          [0.2, 2.6, 2],
        ],
        severity: "medium",
      },
      {
        type: "face",
        points: [
          [0, 3, 3],
          [0.7, 3.2, 3],
          [0.1, 3.6, 3],
        ],
        severity: "low",
      },
    ],
    "t-junction": [
      {
        type: "edge",
        points: [
          [-1, 1, 1],
          [1, 0, 0],
        ],
        severity: "high",
      },
      {
        type: "edge",
        points: [
          [-2, 2, 2],
          [2, 0, 0],
        ],
        severity: "medium",
      },
      {
        type: "edge",
        points: [
          [-3, 3, 3],
          [3, 0, 0],
        ],
        severity: "low",
      },
    ],
    intersections: [
      {
        type: "face",
        points: [
          [1, 1, 1],
          [1, 0, 0],
          [0, 1, 0],
        ],
        severity: "high",
      },
      {
        type: "face",
        points: [
          [2, 2, 2],
          [2, 0, 0],
          [0, 2, 0],
        ],
        severity: "medium",
      },
      {
        type: "face",
        points: [
          [3, 3, 3],
          [3, 0, 0],
          [0, 3, 0],
        ],
        severity: "high",
      },
    ],
    duplicate_vertices: [
      {
        type: "vertex",
        points: [[4.112, -1.005, 0.0]],
        severity: "high",
      },
      {
        type: "vertex",
        points: [[4.114, -1.007, 0.0]],
        severity: "medium",
      },
    ],
  },
};

export default function GeometryIssueSidebar() {
  const { modelId } = useParams() as { modelId: string };
  useGetModelQuery(modelId);
  const [expandedIssueGroups, setExpandedIssueGroups] = useState<Record<string, boolean>>(() =>
    Object.keys(MODEL_DATA_EXAMPLE.geometryIssues).reduce(
      (acc, key, index) => {
        acc[key] = index === 0;
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );
  const dispatch = useDispatch();
  const { geometryIssues, selectedIssue } = useSelector((state: RootState) => {
    return state.geometryIssue;
  });

  useEffect(() => {
    dispatch(setGeometryIssues(MODEL_DATA_EXAMPLE.geometryIssues));
    const firstIssue = Object.values(MODEL_DATA_EXAMPLE.geometryIssues)[0]?.[0];
    if (firstIssue) dispatch(setSelectedIssue(firstIssue));
  }, []);

  const toggleIssueGroup = (groupKey: string) => {
    setExpandedIssueGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  const formatIssuePoints = (points: number[][]) => {
    return points.map((point) => `(${point.join(", ")})`).join(" | ");
  };

  const getSeverityClassName = (severity: string) => {
    if (severity === "high") return "bg-red-500/15 text-red-300 border border-red-500/30";
    if (severity === "medium") return "bg-amber-500/15 text-amber-300 border border-amber-500/30";
    return "bg-sky-500/15 text-sky-300 border border-sky-500/30";
  };

  const formatIssueCategoryLabel = (category: string) => {
    return category.replace(/[_-]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="h-container flex flex-col">
      <div className="h-full flex flex-col text-white/75 text-center text-2xl font-inter p-2">
        <div>
          {/* title */}
          <div className="mb-4 flex justify-between items-center mt-2">
            <h4 className="text-xl text-choras-primary">Issues</h4>
          </div>
          {/* issue list */}
          <div
          // className={`overflow-hidden transition-all duration-500 ${highlightedElement === "material-assignment"
          //   ? "ring-2 ring-yellow-400 shadow-lg animate-pulse bg-yellow-500/10 rounded-lg p-2"
          //   : ""
          //   }`}
          >
            <div className="relative">
              <div
                className="
                max-h-120 overflow-y-auto pr-4
                scrollbar-thin
                scrollbar-thumb-slate-700/60
                scrollbar-track-transparent
                scrollbar-thumb-rounded-full
              "
              >
                <table className="w-full table-fixed">
                  {/* <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-36">
                        Surface
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Material
                      </th>
                    </tr>
                  </thead> */}
                  <tbody>
                    {geometryIssues &&
                      Object.entries(geometryIssues).map((el) => {
                        const issueType = el[0];
                        const issues = el[1];
                        const isExpanded = expandedIssueGroups[issueType];

                        return (
                          <Fragment key={issueType}>
                            <tr className="border-b border-choras-gray">
                              <td colSpan={2} className="px-3 py-2 text-sm text-left">
                                <button
                                  type="button"
                                  onClick={() => toggleIssueGroup(issueType)}
                                  className="flex items-center gap-2 font-medium text-white hover:text-gray-300 transition-colors"
                                >
                                  <span
                                    className={`transform transition-transform ${isExpanded ? "rotate-90" : "rotate-0"}`}
                                  >
                                    <ChevronRight size={16} />
                                  </span>
                                  <span>{formatIssueCategoryLabel(issueType)}</span>
                                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/80">
                                    {issues.length}
                                  </span>
                                </button>
                              </td>
                            </tr>
                            {isExpanded &&
                              issues.map((issue, index) => {
                                const isSelected =
                                  selectedIssue?.type === issue.type &&
                                  JSON.stringify(selectedIssue?.points) ===
                                    JSON.stringify(issue.points);

                                return (
                                  <tr
                                    key={`${issueType}-${index}`}
                                    onClick={() => dispatch(setSelectedIssue(issue))}
                                    className={`border-b border-choras-gray/60 transition-colors cursor-pointer ${isSelected ? "bg-choras-primary/10" : "hover:bg-white/5"}`}
                                  >
                                    <td colSpan={2} className="pr-3 pl-9 py-2 text-sm text-left">
                                      <div className="flex items-center gap-3">
                                        <span className="shrink-0 text-[11px] font-semibold text-white/45">
                                          #{index + 1}
                                        </span>
                                        <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/80">
                                          {issue.type}
                                        </span>
                                        <span className="flex-1 min-w-0 font-mono text-xs text-white/70">
                                          {formatIssuePoints(issue.points)}
                                        </span>
                                        <span
                                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${getSeverityClassName(issue.severity)}`}
                                        >
                                          {issue.severity}
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </Fragment>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 p-4 border-t border-stone-600">
        <h2>Bottom</h2>
      </div>
    </div>
  );
}
