import { ChevronRight } from "lucide-react";
import { Fragment } from "react";
import type { GeometryIssue, GeometryIssues } from "@/store/geometryIssueSlice";

type GeometryIssueListProps = {
  issues: GeometryIssues | null;
  selectedIssue: GeometryIssue | null;
  expandedIssueGroups: Record<string, boolean>;
  onToggleGroup: (groupKey: string) => void;
  onIssueClick: (isSelected: boolean, issue: GeometryIssue) => void;
  label?: string;
};

const formatIssuePoints = (points: number[][]) => {
  if (points.length === 0) return "No coordinates";

  const formatPoint = (point: number[]) =>
    `(${point.map((value) => Number(value.toFixed(3))).join(", ")})`;

  if (points.length === 1) return formatPoint(points[0]);

  const firstPoint = formatPoint(points[0]);
  const secondPoint = formatPoint(points[1]);
  const remainingPoints = points.length - 2;

  if (remainingPoints > 0) {
    return `${firstPoint} | ${secondPoint} | +${remainingPoints} more`;
  }

  return `${firstPoint} | ${secondPoint}`;
};

const getSeverityClassName = (severity: string) => {
  if (severity === "high") return "bg-red-500/15 text-red-300 border border-red-500/30";
  if (severity === "medium") return "bg-amber-500/15 text-amber-300 border border-amber-500/30";
  return "bg-sky-500/15 text-sky-300 border border-sky-500/30";
};

const formatIssueCategoryLabel = (category: string) => {
  return category.replace(/[_-]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const isSameIssue = (current: GeometryIssue | null, target: GeometryIssue) => {
  if (current?.id && target.id) {
    return current.id === target.id;
  }
  return (
    current?.type === target.type &&
    JSON.stringify(current?.points) === JSON.stringify(target.points)
  );
};

const getIssueRowClassName = (isSelected: boolean) => {
  const selectedClass =
    "bg-choras-primary/12 ring-1 ring-choras-primary/35 border-choras-primary/35";
  const defaultClass = "hover:bg-black/5 border-transparent";
  return `rounded-md border border-b border-choras-gray/60 transition-colors cursor-pointer ${isSelected ? selectedClass : defaultClass}`;
};

const getIssueCellClassName = (isSelected: boolean) => {
  const selectedClass = "rounded-md bg-choras-primary/12 ring-1 ring-choras-primary/35";
  const defaultClass = "rounded-md hover:bg-black/5";
  return `pr-3 pl-9 py-2.5 text-sm text-left transition-colors ${isSelected ? selectedClass : defaultClass}`;
};

export function GeometryIssueList({
  issues,
  selectedIssue,
  expandedIssueGroups,
  onToggleGroup,
  onIssueClick,
  label,
}: GeometryIssueListProps) {
  const hasExpandedIssueGroups = Object.values(expandedIssueGroups).some(Boolean);

  return (
    <div
      className={`rounded-md border border-slate-300 bg-white/75 p-2 ${hasExpandedIssueGroups ? "min-h-0 flex flex-1 flex-col" : ""}`}
    >
      {/* title */}
      <div className="mb-3 mt-1 flex items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2">
        <h4 className="text-lg font-semibold tracking-wide text-choras-primary">
          {label ? label : "Issue"}
        </h4>
        <span className="rounded-md bg-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
          Geometry
        </span>
      </div>
      {/* issue list */}
      <div className={hasExpandedIssueGroups ? "min-h-0 flex-1" : ""}>
        <div className={`relative ${hasExpandedIssueGroups ? "h-full" : ""}`}>
          <div
            className={
              hasExpandedIssueGroups
                ? "h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-400/80 scrollbar-track-transparent scrollbar-thumb-rounded-full"
                : "pr-2"
            }
          >
            <table className="w-full table-fixed">
              <tbody>
                {issues &&
                  Object.entries(issues).map((el) => {
                    const issueType = el[0];
                    const issueList = el[1];
                    const isExpanded = expandedIssueGroups[issueType];

                    const groupedIssues = issueList.reduce((acc, issue, index) => {
                      const key = issue.id ?? `no-id-${index}`;
                      const existingGroup = acc.get(key);
                      if (existingGroup) {
                        existingGroup.push(issue);
                      } else {
                        acc.set(key, [issue]);
                      }
                      return acc;
                    }, new Map<string, GeometryIssue[]>());

                    const issueRows = Array.from(groupedIssues.values()).map((group) => {
                      const primaryIssue = group[0];
                      const points = group.flatMap((groupIssue) => groupIssue.points);
                      const typeCounts = group.reduce(
                        (acc, groupIssue) => {
                          acc[groupIssue.type] = (acc[groupIssue.type] ?? 0) + 1;
                          return acc;
                        },
                        {} as Record<string, number>,
                      );

                      return {
                        issue: primaryIssue,
                        points,
                        issueForSelection: { ...primaryIssue, points },
                        types: Array.from(new Set(group.map((groupIssue) => groupIssue.type))),
                        elementSummary: Object.entries(typeCounts),
                      };
                    });

                    return (
                      <Fragment key={issueType}>
                        <tr className="border-b border-slate-200">
                          <td colSpan={2} className="px-3 py-2 text-sm text-left">
                            <button
                              type="button"
                              onClick={() => onToggleGroup(issueType)}
                              className="flex w-full items-center gap-2 rounded-md px-1 py-1 font-medium text-slate-700 transition-colors hover:bg-black/5"
                            >
                              <span
                                className={`transform transition-transform ${isExpanded ? "rotate-90" : "rotate-0"}`}
                              >
                                <ChevronRight size={16} />
                              </span>
                              <span>{formatIssueCategoryLabel(issueType)}</span>
                              <span className="ml-auto rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                                {issueRows.length}
                              </span>
                            </button>
                          </td>
                        </tr>
                        {isExpanded &&
                          issueRows.map((issueRow, index) => {
                            const isSelected = isSameIssue(selectedIssue, issueRow.issue);
                            return (
                              <tr
                                key={`${issueType}-${index}`}
                                onClick={() => onIssueClick(isSelected, issueRow.issueForSelection)}
                                className={getIssueRowClassName(isSelected)}
                              >
                                <td colSpan={2} className={getIssueCellClassName(isSelected)}>
                                  <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-2">
                                      <span className="shrink-0 text-[11px] font-semibold text-slate-500">
                                        #{index + 1}
                                      </span>
                                      <span className="shrink-0 rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                                        {issueRow.types.join(" + ")}
                                      </span>
                                      <span
                                        className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${getSeverityClassName(issueRow.issue.severity)}`}
                                      >
                                        {issueRow.issue.severity}
                                      </span>
                                    </div>
                                    <span
                                      className="block truncate font-mono text-xs text-slate-500"
                                      title={formatIssuePoints(issueRow.points)}
                                    >
                                      {formatIssuePoints(issueRow.points)}
                                    </span>
                                    <div className="mt-0.5 flex flex-wrap items-center gap-1">
                                      {issueRow.elementSummary.map(([elementType, count]) => (
                                        <span
                                          key={`${issueType}-${index}-${elementType}`}
                                          className="rounded-full border border-slate-300 bg-white/80 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500"
                                        >
                                          {elementType} x{count}
                                        </span>
                                      ))}
                                    </div>
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
  );
}
