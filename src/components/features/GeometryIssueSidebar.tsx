import {
  clearSelectedIssue,
  setGeometryIssues,
  setIssueGroupExpanded,
  setSelectedIssue,
  type GeometryIssue,
} from "@/store/geometryIssueSlice";
import { useFetchModelIssuesQuery, useGetModelQuery } from "@/store/modelApi";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import type { RootState } from "@/store";
import { SimulationForm } from "./SimulationForm";
import { Button } from "../ui/button";
import { GeometryIssueList } from "./GeometryIssueList";
import { PossibleSimulation } from "./PossibleSimulation";

interface IProps {
  showPossibleSimulation?: boolean;
  showQuickAction?: boolean;
  showIssueList?: boolean;
  showRepairButton?: boolean;
}

export default function GeometryIssueSidebar({
  showPossibleSimulation = true,
  showIssueList = true,
  showQuickAction = true,
  showRepairButton = true,
}: IProps) {
  const { modelId } = useParams() as { modelId: string };
  const { data: model } = useGetModelQuery(modelId);
  const dispatch = useDispatch();
  const { geometryIssues, selectedIssue, expandedIssueGroups } = useSelector((state: RootState) => {
    return state.geometryIssue;
  });

  // Pick the issue report for this model (prefer the post-upload detection stage).
  const modelIssue = useMemo(() => {
    if (!model?.issues?.length) return undefined;
    return model.issues.find((issue) => issue.detectionStage === "AfterUpload") ?? model.issues[0];
  }, [model]);

  const hasGeometryIssues = (modelIssue?.issueCount ?? 0) > 0;

  // Only fetch the issue report when there are issues to display.
  const { data: fetchedIssues } = useFetchModelIssuesQuery(modelIssue?.fileUrl ?? "", {
    skip: !modelIssue || !hasGeometryIssues,
  });

  useEffect(() => {
    if (fetchedIssues) {
      dispatch(setGeometryIssues(fetchedIssues));
    }
  }, [fetchedIssues, dispatch]);

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
          {(showPossibleSimulation || showQuickAction) && (
            <div className="mb-4 rounded-md border border-slate-300 bg-gradient-to-b from-white to-slate-100 p-3 shadow-[0_8px_18px_rgba(15,23,42,0.12)]">
              {showPossibleSimulation && <PossibleSimulation />}
              {showQuickAction && (
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
                </div>
              )}
            </div>
          )}
          {showIssueList && (
            <GeometryIssueList
              issues={geometryIssues}
              selectedIssue={selectedIssue}
              expandedIssueGroups={expandedIssueGroups}
              onToggleGroup={toggleIssueGroup}
              onIssueClick={handleIssueClick}
            />
          )}
        </div>
        {showRepairButton && (
          <div className="mt-3 border-t border-slate-300 pt-3">
            <Button className="w-full border border-choras-primary/40 bg-white text-choras-primary hover:bg-choras-primary/10">
              Repair
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
