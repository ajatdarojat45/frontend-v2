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
  const opacity = isSelected ? 0.5 : 0.1;
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  // Fan triangulation: works for any n-gon
  const numVertices = issue.points.length;
  const indices: number[] = [];

  for (let i = 1; i < numVertices - 1; i++) {
    indices.push(0, i, i + 1);
  }

  geometry.setIndex(indices);
  if (!isSelected) {
    return null;
  }

  return (
    <mesh geometry={geometry} renderOrder={2}>
      <meshBasicMaterial
        color={issueColor}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthTest={false}
        // depthWrite={false}
        // polygonOffset={true}
        // polygonOffsetFactor={-1}
        // polygonOffsetUnits={-1}
      />
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
