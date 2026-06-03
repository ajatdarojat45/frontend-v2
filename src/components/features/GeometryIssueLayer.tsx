import type { GeometryIssue } from "@/store/geometryIssueSlice";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const severityColor = {
  low: "yellow",
  medium: "orange",
  high: "red",
};

function VertexIssue({ issue, isSelected }: { issue: GeometryIssue; isSelected: boolean }) {
  const [x, y, z] = issue.points[0];
  const issueColor = isSelected ? "green" : severityColor[issue.severity];

  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[0.05]} />
      <meshBasicMaterial color={issueColor} />
    </mesh>
  );
}

function EdgeIssue({ issue, isSelected }: { issue: GeometryIssue; isSelected: boolean }) {
  const issueColor = isSelected ? "green" : severityColor[issue.severity];

  return (
    <Line points={issue.points as [number, number, number][]} color={issueColor} lineWidth={2} />
  );
}

function FaceIssue({ issue, isSelected }: { issue: GeometryIssue; isSelected: boolean }) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(issue.points.flat());
  const issueColor = isSelected ? "green" : severityColor[issue.severity];

  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  // triangulate sederhana (anggap triangle dulu)
  geometry.setIndex([0, 1, 2]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={issueColor} transparent opacity={0.4} side={THREE.DoubleSide} />
    </mesh>
  );
}

function IssueRenderer({
  issue,
  selectedIssue,
}: {
  issue: GeometryIssue;
  selectedIssue: GeometryIssue | null;
}) {
  const isSelected =
    selectedIssue?.id && issue.id
      ? selectedIssue.id === issue.id
      : selectedIssue?.type === issue.type &&
        JSON.stringify(selectedIssue?.points) === JSON.stringify(issue.points);

  switch (issue.type) {
    case "vertex":
      return <VertexIssue issue={issue} isSelected={isSelected} />;
    case "edge":
      return <EdgeIssue issue={issue} isSelected={isSelected} />;
    case "face":
      return <FaceIssue issue={issue} isSelected={isSelected} />;
    default:
      return null;
  }
}

export function GeometryIssueLayer({ isRepair = false }: { isRepair: boolean }) {
  const { geometryIssues, selectedIssue, expandedIssueGroups, remainingIssues } = useSelector(
    (state: RootState) => {
      return state.geometryIssue;
    },
  );

  const issuesToRender = isRepair ? remainingIssues : geometryIssues;

  return (
    <>
      {issuesToRender &&
        Object.entries(issuesToRender).map(([issueType, issues]) => {
          if (!expandedIssueGroups[issueType]) return null;

          return issues.map((issue, index) => {
            return (
              <IssueRenderer
                key={`${issueType}-${index}`}
                issue={issue}
                selectedIssue={selectedIssue}
              />
            );
          });
        })}
    </>
  );
}
