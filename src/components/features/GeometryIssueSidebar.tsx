import {
  clearSelectedIssue,
  setGeometryIssues,
  setIssueGroupExpanded,
  setSelectedIssue,
  type GeometryIssue,
  type GeometryIssueInputs,
} from "@/store/geometryIssueSlice";
import { useGetModelQuery } from "@/store/modelApi";
import { ChevronRight } from "lucide-react";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import type { RootState } from "@/store";

const MODEL_DATA_EXAMPLE: {
  hasGeometryIssues: boolean;
  geometryIssues: GeometryIssueInputs;
} = {
  hasGeometryIssues: true,
  geometryIssues: {
    duplicate_vertices: [
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 4.790432, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 4.790432, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 5.472823, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 5.472823, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 4.790432, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 4.790432, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 5.472823, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 5.472823, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -1.150388, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -1.150388, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -0.467998, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -0.467998, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -0.467998, -1.499663]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -0.467998, -1.499663]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -1.150388, -1.191857]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -1.150388, -1.191857]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 3.305226, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 3.305226, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 3.987619, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 3.987619, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 3.305226, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 3.305226, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 3.987619, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 3.987619, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 1.820019, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 1.820019, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 2.502413, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 2.502413, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 1.820019, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 1.820019, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 2.502413, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 2.502413, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.275636, -0.693462]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.275636, -0.693462]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.753312, -0.693462]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.753312, -0.693462]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.275636, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.275636, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.753312, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21004, 6.753312, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.753312, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 4.790432, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 4.790432, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 5.472823, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 5.472823, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 4.790432, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 4.790432, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 5.472823, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 5.472823, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 3.305226, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 3.305226, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 3.987619, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 3.987619, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 3.305226, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 3.305226, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 3.987619, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 3.987619, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 1.820019, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 1.820019, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 2.502413, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 2.502413, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 1.820019, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 1.820019, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 2.502413, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 2.502413, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.753312, 0.596425]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.753312, 0.596425]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.753312, 0.596425]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.753312, 0.596425]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.753312, 0.596425]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.753312, -0.492759]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.753312, -0.492759]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.753312, -0.492759]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 1.798466, 0.596427]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 1.798466, 0.596427]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 1.798465, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 1.798465, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, -3.156486, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, -3.156486, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, -3.156486, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, 6.753312, 1.829379]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, 6.753312, 1.829379]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, 6.753312, 1.829379]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, 6.753312, -0.492759]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, 6.753312, -0.492759]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, 6.753312, -0.492759]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, 1.798355, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, 1.798355, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, 1.798356, 0.596427]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, 1.798356, 0.596427]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, -3.156486, 0.596427]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, -3.156486, 0.596427]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -1.953159, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -1.953159, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -1.953159, -0.829751]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -1.953159, -0.829751]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -2.255307, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -2.255307, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -1.150345, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -1.150345, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -0.467998, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -0.467998, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -0.467998, -1.499663]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -0.467998, -1.499663]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -1.150345, -1.191876]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -1.150345, -1.191876]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 0.334816, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 0.334816, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 1.017206, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 1.017206, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 1.017206, -2.169596]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 1.017206, -2.169596]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 0.334816, -1.861789]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 0.334816, -1.861789]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.753312, -0.492759]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.753312, -0.492759]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.753312, -0.492759]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.753312, -0.492759]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.753312, -0.693462]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.753312, -0.693462]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.753312, -0.492759]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.753312, -0.492759]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.753312, -0.492759]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.753312, -0.492759]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -2.255307, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -2.255307, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -1.953202, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -1.953202, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -1.953202, -0.829731]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, -1.953202, -0.829731]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.275636, -0.693462]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.275636, -0.693462]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.275636, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.275636, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.753312, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.753312, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.753312, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -1.953202, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -1.953202, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -1.953202, 0.596427]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -1.953202, 0.596427]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -1.953202, 0.596427]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -3.156377, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -3.156377, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -3.156377, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -3.156378, 0.596427]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -3.156378, 0.596427]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 0.334816, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 0.334816, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 1.017206, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 1.017206, -0.693461]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 1.017206, -2.169596]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 1.017206, -2.169596]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 0.334816, -1.861789]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 0.334816, -1.861789]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.753312, 1.829379]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.753312, 1.829379]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.753312, 0.596425]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.753312, 0.596425]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.753312, 0.596425]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 6.753312, 0.596425]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.753312, 1.829379]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.753312, 1.829379]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.753312, 0.596425]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.753312, 0.596425]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.753312, 0.596425]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 6.753312, 0.596425]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.753312, 1.829379]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.753312, 1.829379]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.753312, 1.829379]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.275636, 1.829379]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.275636, 1.829379]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.275636, 0.596426]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.275636, 0.596426]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.275636, 0.596426]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.275636, 1.227269]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 6.275636, 1.227269]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -1.953202, 1.227271]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -1.953202, 1.227271]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 5.472823, 1.829379]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 5.472823, 1.829379]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 5.472823, 1.22727]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 5.472823, 1.22727]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 4.791205, 1.829379]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 4.791205, 1.829379]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 4.791205, 1.22727]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 4.791205, 1.22727]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 3.988392, 1.82938]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 3.988392, 1.82938]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 3.988391, 1.22727]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 3.988391, 1.22727]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 3.305226, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 3.305226, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 3.305226, 1.22727]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 3.305226, 1.22727]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 2.502413, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 2.502413, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 2.502413, 1.227271]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 2.502413, 1.227271]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 1.82002, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 1.82002, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 1.82002, 1.227271]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 1.82002, 1.227271]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 1.017206, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 1.017206, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 1.017206, 1.227271]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 1.017206, 1.227271]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 0.334816, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 0.334816, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 0.334816, 1.227271]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, 0.334816, 1.227271]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, 6.753312, 0.596425]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, 6.753312, 0.596425]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, 6.753312, 0.596425]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -0.467997, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -0.467997, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -0.467997, 1.227271]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -0.467997, 1.227271]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -1.150388, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -1.150388, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -1.150388, 1.227271]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -1.150388, 1.227271]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.765861, -3.518803, 0.430479]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.765861, -3.518803, 0.430479]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.765861, -3.518803, -0.211772]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.765861, -3.518803, -0.211772]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.043329, -3.518803, 0.430479]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.043329, -3.518803, 0.430479]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.043329, -3.518803, -0.211772]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.043329, -3.518803, -0.211772]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -3.156378, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -3.156378, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -3.156378, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.767945, -3.396895, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.767945, -3.396895, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.767945, -3.396895, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.767945, -3.396895, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.767945, -3.396895, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.767945, -3.396895, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.2733, -3.592237, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.2733, -3.592237, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.2733, -3.592237, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.2733, -3.592237, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.2733, -3.592237, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.2733, -3.592237, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.766713, -3.754105, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.766713, -3.754105, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.766713, -3.754105, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.766713, -3.754105, 0.303729]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.766713, -3.754105, 0.303729]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.766713, -3.754105, 0.303729]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.250446, -3.881776, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.250446, -3.881776, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.250446, -3.881776, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.250446, -3.881776, 0.361317]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.250446, -3.881776, 0.361317]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.250446, -3.881776, 0.361317]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.726804, -3.974676, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.726804, -3.974676, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.726804, -3.974676, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.726804, -3.974676, 0.403222]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.726804, -3.974676, 0.403222]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.726804, -3.974676, 0.403222]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.198126, -4.032395, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.198126, -4.032395, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.198126, -4.032395, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.198126, -4.032395, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.198126, -4.032395, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.198126, -4.032395, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.375643, -4.013014, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.375643, -4.013014, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.375643, -4.013014, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.424492, -4.007681, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.424492, -4.007681, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.424492, -4.007681, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.424492, -4.007681, 0.41811]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.424492, -4.007681, 0.41811]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.424492, -4.007681, 0.41811]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.375643, -4.013014, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.375643, -4.013014, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.375643, -4.013014, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.333226, -4.054675, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.333226, -4.054675, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.333226, -4.054675, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.333226, -4.054675, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.333226, -4.054675, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.333226, -4.054675, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.510528, -4.054203, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.510528, -4.054203, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.510528, -4.054203, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.510528, -4.054203, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.510528, -4.054203, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.510528, -4.054203, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.041754, -4.029099, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.041754, -4.029099, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.041754, -4.029099, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.041754, -4.029099, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.041754, -4.029099, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.041754, -4.029099, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.570118, -3.96857, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.570118, -3.96857, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.570118, -3.96857, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.093258, -3.872885, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.093258, -3.872885, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.093258, -3.872885, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.093258, -3.872885, 0.357307]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.093258, -3.872885, 0.357307]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.093258, -3.872885, 0.357307]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.570118, -3.96857, 0.400467]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.570118, -3.96857, 0.400467]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.570118, -3.96857, 0.400467]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.60884, -3.742472, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.60884, -3.742472, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.60884, -3.742472, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.60884, -3.742472, 0.298482]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.60884, -3.742472, 0.298482]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.60884, -3.742472, 0.298482]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.114559, -3.577914, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.114559, -3.577914, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.114559, -3.577914, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.114559, -3.577914, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.114559, -3.577914, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.114559, -3.577914, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, -3.703412, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, -3.703412, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, -3.703412, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, -3.703412, 0.280862]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, -3.703412, 0.280862]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, -3.703412, 0.280862]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.608159, -3.379944, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.608159, -3.379944, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.608159, -3.379944, 1.829381]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.608159, -3.379944, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.608159, -3.379944, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.608159, -3.379944, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, -3.156486, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, -3.156486, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, -3.156486, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, -3.70275, 0.280564]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, -3.70275, 0.280564]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, -3.70275, 0.280564]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, -3.70275, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, -3.70275, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, -3.70275, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.281824, -4.001596, 0.415365]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.281824, -4.001596, 0.415365]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.281824, -4.001596, 0.415365]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.215362, -4.009211, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.215362, -4.009211, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.215362, -4.009211, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.215362, -4.009211, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.215362, -4.009211, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.215362, -4.009211, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.281824, -4.001596, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.281824, -4.001596, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.281824, -4.001596, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.424492, -2.700256, -0.171632]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.424492, -2.700256, -0.171632]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.424492, -2.700256, -0.171632]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.424492, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.424492, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.424492, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.281824, -2.700256, -0.171632]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.281824, -2.700256, -0.171632]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.281824, -2.700256, -0.171632]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.281824, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.281824, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.281824, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, -2.700256, -0.171632]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, -2.700256, -0.171632]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, -2.700256, -0.171632]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, -2.700256, -0.171632]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, -2.700256, -0.171632]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, -2.700256, -0.171632]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, -2.700256, -0.171632]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, -2.700256, -0.171632]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, 0.687219, -1.699622]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, 0.687219, -1.699622]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, 0.687219, -1.699622]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, 0.687218, -2.020748]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, 0.687218, -2.020748]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, 0.687218, -2.020748]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, 0.687219, -1.699622]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, 0.687219, -1.699622]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, 0.687219, -1.699622]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, 0.687218, -2.020748]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, 0.687218, -2.020748]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, 0.687218, -2.020748]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 1.126304, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 1.126304, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-2.409125, 1.126304, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, 1.126304, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-1.927437, 1.126304, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, 1.126304, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[2.728881, 1.126304, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 1.126304, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21004, 1.126304, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[3.21057, 1.126304, -2.218807]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[4.073594, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-3.27215, -2.700256, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.215362, -3.518803, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.215362, -3.518803, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.215362, -3.518803, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.375643, -3.518803, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.375643, -3.518803, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.375643, -3.518803, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.043329, -3.518803, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.043329, -3.518803, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.043329, -3.518803, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.765861, -3.518803, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.765861, -3.518803, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.765861, -3.518803, -0.492757]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.215362, -3.518803, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.215362, -3.518803, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[1.215362, -3.518803, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.375643, -3.518803, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.375643, -3.518803, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[-0.375643, -3.518803, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.765861, -3.518803, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.765861, -3.518803, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.043329, -3.518803, 0.550901]],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "vertex",
          points: [[0.043329, -3.518803, 0.550901]],
        },
        severity: "medium",
      },
    ],
    non_coplanar_faces: [],
    "T-junctions": [
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, -1.953202, 1.829381],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 6.275636, 1.829379],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 5.472823, 1.829379],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 4.791205, 1.829379],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 3.988392, 1.82938],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 3.305226, 1.829381],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 2.502413, 1.829381],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 1.82002, 1.829381],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 1.017206, 1.829381],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 0.334816, 1.829381],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, -0.467997, 1.829381],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, -1.150388, 1.829381],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 1.798356, 0.596427],
              [4.073594, -3.156486, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [4.073594, -2.635593, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 1.798356, 0.596427],
              [4.073594, -3.156486, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [4.073594, -1.953202, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 1.798356, 0.596427],
              [4.073594, -3.156486, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [4.073594, -1.150388, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 1.798356, 0.596427],
              [4.073594, -3.156486, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [4.073594, -0.467997, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 1.798356, 0.596427],
              [4.073594, -3.156486, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [4.073594, 0.334816, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 1.798356, 0.596427],
              [4.073594, -3.156486, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [4.073594, 1.017206, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.275636, 1.227269],
              [-3.27215, -1.953202, 1.227271],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 5.472823, 1.22727],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.275636, 1.227269],
              [-3.27215, -1.953202, 1.227271],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 4.791205, 1.22727],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.275636, 1.227269],
              [-3.27215, -1.953202, 1.227271],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 3.988391, 1.22727],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.275636, 1.227269],
              [-3.27215, -1.953202, 1.227271],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 3.305226, 1.22727],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.275636, 1.227269],
              [-3.27215, -1.953202, 1.227271],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 2.502413, 1.227271],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.275636, 1.227269],
              [-3.27215, -1.953202, 1.227271],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 1.82002, 1.227271],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.275636, 1.227269],
              [-3.27215, -1.953202, 1.227271],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 1.017206, 1.227271],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.275636, 1.227269],
              [-3.27215, -1.953202, 1.227271],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 0.334816, 1.227271],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.275636, 1.227269],
              [-3.27215, -1.953202, 1.227271],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, -0.467997, 1.227271],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.275636, 1.227269],
              [-3.27215, -1.953202, 1.227271],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, -1.150388, 1.227271],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [2.728881, -2.700256, -0.492757],
              [2.728881, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [2.728881, 0.687218, -2.020748],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [2.728881, -2.700256, -0.492757],
              [2.728881, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [2.728881, 0.90676, -2.119777],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [2.728881, -2.700256, -0.492757],
              [4.073594, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, -2.700256, -0.492757],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, -3.156378, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, -1.953202, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, -3.156378, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, -2.635593, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, -3.156378, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, -1.150388, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, -3.156378, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, -0.467997, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, -3.156378, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 0.334816, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, -3.156378, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 1.017206, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -0.492759],
              [3.21057, 6.753312, 0.596425],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 6.753312, -0.211774],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.765861, -3.518803, -0.492757],
              [0.765861, -3.518803, 0.550901],
            ],
          },
          {
            type: "vertex",
            points: [0.765861, -3.518803, 0.430479],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.765861, -3.518803, -0.492757],
              [0.765861, -3.518803, 0.550901],
            ],
          },
          {
            type: "vertex",
            points: [0.765861, -3.518803, -0.211772],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.753312, 0.596425],
              [4.073594, 6.753312, 0.596425],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 6.753312, 0.596425],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.753312, 0.596425],
              [4.073594, 6.753312, 0.596425],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 6.753312, 0.596425],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -2.218807],
              [-2.409125, 6.753312, 0.596425],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 6.753312, -0.492759],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -2.218807],
              [-2.409125, 6.753312, 0.596425],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 6.753312, -0.693462],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -2.218807],
              [-2.409125, 6.753312, 0.596425],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 6.753312, -0.211774],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.700256, -0.492757],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, -0.467998, -1.499663],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.700256, -0.492757],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, -1.150388, -1.191857],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.700256, -0.492757],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, -2.255307, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.700256, -0.492757],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, -1.953202, -0.829731],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.700256, -0.492757],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 1.017206, -2.169596],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.700256, -0.492757],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 0.334816, -1.861789],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -2.218807],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 6.275636, -2.218807],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -2.218807],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 4.790432, -2.218807],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -2.218807],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 5.472823, -2.218807],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -2.218807],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 3.305226, -2.218807],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -2.218807],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 3.987619, -2.218807],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -2.218807],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 1.820019, -2.218807],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -2.218807],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 2.502413, -2.218807],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, -1.953159, -0.829751],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, -2.255307, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, -0.467998, -1.499663],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, -1.150345, -1.191876],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 1.017206, -2.169596],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 0.334816, -1.861789],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [2.728881, -2.700256, -0.171632],
              [-1.927437, -2.700256, -0.171632],
            ],
          },
          {
            type: "vertex",
            points: [-0.424492, -2.700256, -0.171632],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [2.728881, -2.700256, -0.171632],
              [-1.927437, -2.700256, -0.171632],
            ],
          },
          {
            type: "vertex",
            points: [1.281824, -2.700256, -0.171632],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.798465, -0.492757],
              [-3.27215, -3.156378, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, -2.700256, -0.492757],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 0.596427],
              [-3.27215, 6.275636, 0.596426],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 1.798466, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 0.596427],
              [-3.27215, 6.275636, 0.596426],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 3.305226, 0.596426],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 0.596427],
              [-3.27215, 6.275636, 0.596426],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 3.987619, 0.596426],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 0.596427],
              [-3.27215, 6.275636, 0.596426],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 1.82002, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 0.596427],
              [-3.27215, 6.275636, 0.596426],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 2.502413, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 0.596427],
              [-3.27215, 6.275636, 0.596426],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, -1.150388, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 0.596427],
              [-3.27215, 6.275636, 0.596426],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, -0.467997, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 0.596427],
              [-3.27215, 6.275636, 0.596426],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 0.334816, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 0.596427],
              [-3.27215, 6.275636, 0.596426],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 1.017206, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 0.596427],
              [-3.27215, 6.275636, 0.596426],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 4.791205, 0.596426],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 0.596427],
              [-3.27215, 6.275636, 0.596426],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 5.473595, 0.596426],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.255307, -0.693461],
              [-2.409125, 6.753312, -0.693462],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 4.790432, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.255307, -0.693461],
              [-2.409125, 6.753312, -0.693462],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 5.472823, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.255307, -0.693461],
              [-2.409125, 6.753312, -0.693462],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 3.305226, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.255307, -0.693461],
              [-2.409125, 6.753312, -0.693462],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 3.987619, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.255307, -0.693461],
              [-2.409125, 6.753312, -0.693462],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 1.820019, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.255307, -0.693461],
              [-2.409125, 6.753312, -0.693462],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 2.502413, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.255307, -0.693461],
              [-2.409125, 6.753312, -0.693462],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, -1.953159, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.255307, -0.693461],
              [-2.409125, 6.753312, -0.693462],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, -1.150345, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.255307, -0.693461],
              [-2.409125, 6.753312, -0.693462],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, -0.467998, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.255307, -0.693461],
              [-2.409125, 6.753312, -0.693462],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 0.334816, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.255307, -0.693461],
              [-2.409125, 6.753312, -0.693462],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 1.017206, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.255307, -0.693461],
              [-2.409125, 6.753312, -0.693462],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 6.275636, -0.693462],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.510528, -4.054203, 1.829381],
              [1.041754, -4.029099, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [0.776141, -4.04165, 1.829381],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.114559, -3.577914, 1.829381],
              [3.608159, -3.379944, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [3.361358, -3.47893, 1.829381],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.753312, -0.492759],
              [-3.27215, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 1.798465, -0.492757],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, -3.156486, 1.829381],
              [4.073594, -3.156486, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [4.073594, -3.156486, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 1.126304, -2.218807],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [-1.927437, 1.126304, -2.218807],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 1.126304, -2.218807],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [2.728881, 1.126304, -2.218807],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [1.215362, -3.518803, 0.550901],
              [-0.375643, -3.518803, 0.550901],
            ],
          },
          {
            type: "vertex",
            points: [0.765861, -3.518803, 0.550901],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [1.215362, -3.518803, 0.550901],
              [-0.375643, -3.518803, 0.550901],
            ],
          },
          {
            type: "vertex",
            points: [0.043329, -3.518803, 0.550901],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.753312, 0.596425],
              [-3.27215, 1.798466, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 6.275636, 0.596426],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.753312, 0.596425],
              [-3.27215, 1.798466, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 3.305226, 0.596426],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.753312, 0.596425],
              [-3.27215, 1.798466, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 3.987619, 0.596426],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.753312, 0.596425],
              [-3.27215, 1.798466, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 2.502413, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.753312, 0.596425],
              [-3.27215, 1.798466, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 4.791205, 0.596426],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.753312, 0.596425],
              [-3.27215, 1.798466, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 5.473595, 0.596426],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -2.218807],
              [3.21057, 6.753312, 0.596425],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 6.753312, -0.693462],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -2.218807],
              [3.21057, 6.753312, 0.596425],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 6.753312, -0.492759],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -2.218807],
              [3.21057, 6.753312, 0.596425],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 6.753312, -0.211774],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 0.596427],
              [-3.27215, -3.156378, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, -2.635593, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 1.798355, -0.492757],
              [4.073594, -3.156486, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [4.073594, -2.700256, -0.492757],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 6.753312, 1.829379],
              [-3.27215, 6.753312, 1.829379],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 6.753312, 1.829379],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 6.753312, 1.829379],
              [-3.27215, 6.753312, 1.829379],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 6.753312, 1.829379],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 6.753312, -0.492759],
              [4.073594, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [4.073594, 1.798355, -0.492757],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.043329, -3.518803, -0.492757],
              [0.043329, -3.518803, 0.550901],
            ],
          },
          {
            type: "vertex",
            points: [0.043329, -3.518803, 0.430479],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.043329, -3.518803, -0.492757],
              [0.043329, -3.518803, 0.550901],
            ],
          },
          {
            type: "vertex",
            points: [0.043329, -3.518803, -0.211772],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 1.829381],
              [-3.27215, -1.953202, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, -1.953202, 1.227271],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-1.927437, -2.700256, -0.492757],
              [-3.27215, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, -2.700256, -0.492757],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, -3.156378, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, -3.156378, 0.596427],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 6.753312, 1.829379],
              [4.073594, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [4.073594, 6.753312, 0.596425],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.114559, -3.577914, -0.492757],
              [3.608159, -3.379944, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [3.361358, -3.47893, -0.492757],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.275636, 1.829379],
              [-3.27215, 6.275636, 0.596426],
            ],
          },
          {
            type: "vertex",
            points: [-3.27215, 6.275636, 1.227269],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-1.927437, -2.700256, -0.492757],
              [-1.927437, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [-1.927437, 0.687218, -2.020748],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-1.927437, -2.700256, -0.492757],
              [-1.927437, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [-1.927437, 0.90676, -2.119777],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -0.693462],
              [3.21057, -2.255307, -0.693461],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, -1.150388, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -0.693462],
              [3.21057, -2.255307, -0.693461],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, -0.467998, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -0.693462],
              [3.21057, -2.255307, -0.693461],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 6.275636, -0.693462],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -0.693462],
              [3.21057, -2.255307, -0.693461],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 4.790432, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -0.693462],
              [3.21057, -2.255307, -0.693461],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 5.472823, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -0.693462],
              [3.21057, -2.255307, -0.693461],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 3.305226, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -0.693462],
              [3.21057, -2.255307, -0.693461],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 3.987619, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -0.693462],
              [3.21057, -2.255307, -0.693461],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 1.820019, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -0.693462],
              [3.21057, -2.255307, -0.693461],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 2.502413, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -0.693462],
              [3.21057, -2.255307, -0.693461],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, -1.953202, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -0.693462],
              [3.21057, -2.255307, -0.693461],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 0.334816, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -0.693462],
              [3.21057, -2.255307, -0.693461],
            ],
          },
          {
            type: "vertex",
            points: [3.21057, 1.017206, -0.693461],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -0.492759],
              [-2.409125, 6.753312, 0.596425],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 6.753312, -0.211774],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-0.424492, -4.007681, 0.41811],
              [-0.424492, -2.700256, -0.171632],
            ],
          },
          {
            type: "vertex",
            points: [-0.424492, -3.353969, 0.123239],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -2.218807],
              [-2.409125, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 4.790432, -2.218807],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -2.218807],
              [-2.409125, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 5.472823, -2.218807],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -2.218807],
              [-2.409125, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 3.305226, -2.218807],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -2.218807],
              [-2.409125, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 3.987619, -2.218807],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -2.218807],
              [-2.409125, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 1.820019, -2.218807],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -2.218807],
              [-2.409125, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 2.502413, -2.218807],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -2.218807],
              [-2.409125, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [-2.409125, 6.275636, -2.218807],
          },
        ],
        severity: "high",
      },
    ],
    possible_holes: [
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.114559, -3.577914, -0.492757],
              [3.608159, -3.379944, -0.492757],
            ],
          },
          {
            type: "edge",
            points: [
              [3.608159, -3.379944, -0.492757],
              [3.361358, -3.47893, -0.492757],
            ],
          },
          {
            type: "edge",
            points: [
              [3.361358, -3.47893, -0.492757],
              [3.114559, -3.577914, -0.492757],
            ],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.510528, -4.054203, 1.829381],
              [0.776141, -4.04165, 1.829381],
            ],
          },
          {
            type: "edge",
            points: [
              [0.776141, -4.04165, 1.829381],
              [1.041754, -4.029099, 1.829381],
            ],
          },
          {
            type: "edge",
            points: [
              [1.041754, -4.029099, 1.829381],
              [0.510528, -4.054203, 1.829381],
            ],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.114559, -3.577914, 1.829381],
              [3.361358, -3.47893, 1.829381],
            ],
          },
          {
            type: "edge",
            points: [
              [3.361358, -3.47893, 1.829381],
              [3.608159, -3.379944, 1.829381],
            ],
          },
          {
            type: "edge",
            points: [
              [3.608159, -3.379944, 1.829381],
              [3.114559, -3.577914, 1.829381],
            ],
          },
        ],
        severity: "high",
      },
    ],
    boundary_edges: [
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 4.790432, -0.693461],
            [-2.409125, 5.472823, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 4.790432, -2.218807],
            [-2.409125, 5.472823, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, -1.150388, -0.693461],
            [3.21057, -0.467998, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, -1.150388, -1.191857],
            [3.21057, -0.467998, -1.499663],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 3.305226, -0.693461],
            [-2.409125, 3.987619, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 3.305226, -2.218807],
            [-2.409125, 3.987619, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 1.820019, -0.693461],
            [-2.409125, 2.502413, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 1.820019, -2.218807],
            [-2.409125, 2.502413, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 6.275636, -0.693462],
            [3.21057, 6.753312, -0.693462],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 6.753312, -2.218807],
            [3.21057, 6.753312, -0.693462],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 6.275636, -2.218807],
            [3.21057, 6.753312, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 4.790432, -0.693461],
            [3.21057, 5.472823, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 4.790432, -2.218807],
            [3.21057, 5.472823, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 3.305226, -0.693461],
            [3.21057, 3.987619, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 3.305226, -2.218807],
            [3.21057, 3.987619, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 1.820019, -0.693461],
            [3.21057, 2.502413, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 1.820019, -2.218807],
            [3.21057, 2.502413, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 1.798466, 0.596427],
            [-3.27215, 6.753312, 0.596425],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 1.798465, -0.492757],
            [-3.27215, 6.753312, -0.492759],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [4.073594, -3.156486, 0.596427],
            [4.073594, -3.156486, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [4.073594, 6.753312, -0.492759],
            [4.073594, 6.753312, 1.829379],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [4.073594, 1.798355, -0.492757],
            [4.073594, 6.753312, -0.492759],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, -2.255307, -0.693461],
            [-2.409125, -1.953159, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, -2.255307, -0.693461],
            [-2.409125, -1.953159, -0.829751],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, -1.150345, -0.693461],
            [-2.409125, -0.467998, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, -1.150345, -1.191876],
            [-2.409125, -0.467998, -1.499663],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 0.334816, -1.861789],
            [-2.409125, 1.017206, -2.169596],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 0.334816, -0.693461],
            [-2.409125, 1.017206, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, -2.255307, -0.693461],
            [-2.409125, 6.753312, -0.693462],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 6.753312, -0.693462],
            [-2.409125, 6.753312, -0.492759],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, -2.700256, -0.492757],
            [-2.409125, -2.255307, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, -2.255307, -0.693461],
            [3.21057, 6.753312, -0.693462],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 6.753312, -0.693462],
            [3.21057, 6.753312, -0.492759],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, -2.700256, -0.492757],
            [3.21057, -2.255307, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, -2.255307, -0.693461],
            [3.21057, -1.953202, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, -2.255307, -0.693461],
            [3.21057, -1.953202, -0.829731],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 6.275636, -0.693462],
            [-2.409125, 6.753312, -0.693462],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 6.753312, -2.218807],
            [-2.409125, 6.753312, -0.693462],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 6.275636, -2.218807],
            [-2.409125, 6.753312, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -3.156377, 1.829381],
            [-3.27215, -1.953202, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -1.953202, 0.596427],
            [-3.27215, -1.953202, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -3.156378, 0.596427],
            [-3.27215, -1.953202, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -3.156378, 0.596427],
            [-3.27215, -3.156377, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 0.334816, -1.861789],
            [3.21057, 1.017206, -2.169596],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 0.334816, -0.693461],
            [3.21057, 1.017206, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 6.753312, 1.829379],
            [3.21057, 6.753312, 1.829379],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 6.275636, 1.829379],
            [-3.27215, 6.753312, 1.829379],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 6.275636, 0.596426],
            [-3.27215, 6.275636, 1.829379],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -1.953202, 1.227271],
            [-3.27215, 6.275636, 1.227269],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 6.275636, 0.596426],
            [-3.27215, 6.275636, 1.227269],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -1.953202, 0.596427],
            [-3.27215, 6.275636, 0.596426],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -1.953202, 0.596427],
            [-3.27215, -1.953202, 1.227271],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 4.791205, 1.829379],
            [-3.27215, 5.472823, 1.829379],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 4.791205, 1.22727],
            [-3.27215, 5.472823, 1.22727],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 3.305226, 1.829381],
            [-3.27215, 3.988392, 1.82938],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 3.305226, 1.22727],
            [-3.27215, 3.988391, 1.22727],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 1.82002, 1.829381],
            [-3.27215, 2.502413, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 1.82002, 1.227271],
            [-3.27215, 2.502413, 1.227271],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 0.334816, 1.829381],
            [-3.27215, 1.017206, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 0.334816, 1.227271],
            [-3.27215, 1.017206, 1.227271],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [4.073594, 6.753312, -0.492759],
            [4.073594, 6.753312, 0.596425],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 6.753312, -0.492759],
            [3.21057, 6.753312, 0.596425],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -1.150388, 1.829381],
            [-3.27215, -0.467997, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -1.150388, 1.227271],
            [-3.27215, -0.467997, 1.227271],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 6.753312, 1.829379],
            [4.073594, 6.753312, 1.829379],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [4.073594, 6.753312, 0.596425],
            [4.073594, 6.753312, 1.829379],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 6.753312, 1.829379],
            [-2.409125, 6.753312, 1.829379],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 6.753312, -0.492759],
            [-2.409125, 6.753312, 0.596425],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 1.017206, 1.829381],
            [-3.27215, 1.82002, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 1.017206, 1.227271],
            [-3.27215, 1.82002, 1.227271],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 5.472823, 1.829379],
            [-3.27215, 6.275636, 1.829379],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 6.275636, 1.227269],
            [-3.27215, 6.275636, 1.829379],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 5.472823, 1.22727],
            [-3.27215, 6.275636, 1.227269],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 2.502413, 1.829381],
            [-3.27215, 3.305226, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 2.502413, 1.227271],
            [-3.27215, 3.305226, 1.22727],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 3.988392, 1.82938],
            [-3.27215, 4.791205, 1.829379],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 3.988391, 1.22727],
            [-3.27215, 4.791205, 1.22727],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [0.765861, -3.518803, -0.211772],
            [0.765861, -3.518803, 0.430479],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [0.043329, -3.518803, -0.211772],
            [0.043329, -3.518803, 0.430479],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -1.953202, 1.829381],
            [-3.27215, -1.150388, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -1.953202, 1.227271],
            [-3.27215, -1.150388, 1.227271],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -1.953202, 1.227271],
            [-3.27215, -1.953202, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -0.467997, 1.829381],
            [-3.27215, 0.334816, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -0.467997, 1.227271],
            [-3.27215, 0.334816, 1.227271],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -3.156378, -0.492757],
            [-3.27215, -3.156377, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [0.510528, -4.054203, 1.829381],
            [0.776141, -4.04165, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [0.776141, -4.04165, 1.829381],
            [1.041754, -4.029099, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.114559, -3.577914, 1.829381],
            [3.361358, -3.47893, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.114559, -3.577914, -0.492757],
            [3.361358, -3.47893, -0.492757],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.361358, -3.47893, -0.492757],
            [3.608159, -3.379944, -0.492757],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.361358, -3.47893, 1.829381],
            [3.608159, -3.379944, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [4.073594, -3.156486, -0.492757],
            [4.073594, -3.156486, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-0.424492, -3.353969, 0.123239],
            [-0.424492, -2.700256, -0.171632],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-0.424492, -4.007681, 0.41811],
            [-0.424492, -3.353969, 0.123239],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-0.424492, -4.007681, 0.41811],
            [-0.424492, -2.700256, -0.171632],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-1.927437, -2.700256, -0.171632],
            [-0.424492, -2.700256, -0.171632],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-1.927437, -2.700256, -0.492757],
            [-1.927437, 0.687218, -2.020748],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [2.728881, -2.700256, -0.492757],
            [2.728881, 0.687218, -2.020748],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-0.424492, -2.700256, -0.171632],
            [1.281824, -2.700256, -0.171632],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-1.927437, -2.700256, -0.171632],
            [2.728881, -2.700256, -0.171632],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [1.281824, -2.700256, -0.171632],
            [2.728881, -2.700256, -0.171632],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, -2.700256, -0.492757],
            [-1.927437, -2.700256, -0.492757],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, -2.700256, -0.492757],
            [-2.409125, 1.126304, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 1.126304, -2.218807],
            [-1.927437, 1.126304, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-1.927437, -2.700256, -0.492757],
            [-1.927437, 1.126304, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [2.728881, -2.700256, -0.492757],
            [3.21057, -2.700256, -0.492757],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [2.728881, -2.700256, -0.492757],
            [2.728881, 1.126304, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [2.728881, 1.126304, -2.218807],
            [3.21057, 1.126304, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, -2.700256, -0.492757],
            [3.21057, 1.126304, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [2.728881, 0.687218, -2.020748],
            [2.728881, 0.90676, -2.119777],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-1.927437, 0.687218, -2.020748],
            [-1.927437, 0.90676, -2.119777],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [2.728881, 0.90676, -2.119777],
            [2.728881, 1.126304, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-1.927437, 0.90676, -2.119777],
            [-1.927437, 1.126304, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-1.927437, 1.126304, -2.218807],
            [2.728881, 1.126304, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, -2.700256, -0.492757],
            [4.073594, -2.700256, -0.492757],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [4.073594, -2.700256, -0.492757],
            [4.073594, 6.753312, -0.492759],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -2.700256, -0.492757],
            [-3.27215, 6.753312, -0.492759],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -2.700256, -0.492757],
            [-2.409125, -2.700256, -0.492757],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 1.126304, -2.218807],
            [3.21057, 1.126304, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 1.126304, -2.218807],
            [-2.409125, 6.753312, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 1.126304, -2.218807],
            [3.21057, 6.753312, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [4.073594, -3.156486, -0.492757],
            [4.073594, -2.700256, -0.492757],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [2.728881, -2.700256, -0.492757],
            [4.073594, -2.700256, -0.492757],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.114559, -3.577914, -0.492757],
            [3.608159, -3.379944, -0.492757],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -3.156378, -0.492757],
            [-3.27215, -2.700256, -0.492757],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -2.700256, -0.492757],
            [-1.927437, -2.700256, -0.492757],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-0.375643, -3.518803, 0.550901],
            [1.215362, -3.518803, 0.550901],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [0.765861, -3.518803, 0.550901],
            [1.215362, -3.518803, 0.550901],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [0.765861, -3.518803, -0.492757],
            [0.765861, -3.518803, 0.550901],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-0.375643, -3.518803, 0.550901],
            [0.043329, -3.518803, 0.550901],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [0.043329, -3.518803, -0.492757],
            [0.043329, -3.518803, 0.550901],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [0.765861, -3.518803, -0.492757],
            [0.765861, -3.518803, -0.211772],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [0.043329, -3.518803, -0.492757],
            [0.043329, -3.518803, -0.211772],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [0.043329, -3.518803, 0.550901],
            [0.765861, -3.518803, 0.550901],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [0.765861, -3.518803, 0.430479],
            [0.765861, -3.518803, 0.550901],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [0.043329, -3.518803, 0.430479],
            [0.043329, -3.518803, 0.550901],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 6.753312, -0.492759],
            [3.21057, 6.753312, -0.211774],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, -2.700256, -0.211772],
            [3.21057, 6.753312, -0.211774],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, -2.700256, -0.492757],
            [3.21057, -2.700256, -0.211772],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, -2.700256, -0.492757],
            [-2.409125, -2.700256, -0.211772],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, -2.700256, -0.211772],
            [-2.409125, 6.753312, -0.211774],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 6.753312, -0.492759],
            [-2.409125, 6.753312, -0.211774],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 6.753312, -2.218807],
            [3.21057, 6.753312, 0.596425],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 6.753312, -2.218807],
            [-2.409125, 6.753312, 0.596425],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -3.156378, -0.492757],
            [-3.27215, -3.156378, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -3.156378, 0.596427],
            [-3.27215, 1.798466, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -3.156378, -0.492757],
            [-3.27215, 1.798465, -0.492757],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [4.073594, -3.156486, -0.492757],
            [4.073594, -3.156486, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [4.073594, -3.156486, -0.492757],
            [4.073594, 1.798355, -0.492757],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.114559, -3.577914, 1.829381],
            [3.608159, -3.379944, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [0.510528, -4.054203, 1.829381],
            [1.041754, -4.029099, 1.829381],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -3.156377, 1.829381],
            [-3.27215, 6.753312, 1.829379],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 6.753312, 1.829379],
            [4.073594, 6.753312, 1.829379],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [4.073594, 3.305226, 0.596426],
            [4.073594, 3.987619, 0.596426],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 3.305226, 0.596426],
            [4.073594, 3.305226, 0.596426],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 3.305226, 0.596426],
            [-3.27215, 3.987619, 0.596426],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 3.987619, 0.596426],
            [4.073594, 3.987619, 0.596426],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [4.073594, 1.82002, 0.596427],
            [4.073594, 2.502413, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 1.82002, 0.596427],
            [4.073594, 1.82002, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 1.82002, 0.596427],
            [-3.27215, 2.502413, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 2.502413, 0.596427],
            [4.073594, 2.502413, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [4.073594, -2.635593, 0.596427],
            [4.073594, -1.953202, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -2.635593, 0.596427],
            [4.073594, -2.635593, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -2.635593, 0.596427],
            [-3.27215, -1.953202, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -1.953202, 0.596427],
            [4.073594, -1.953202, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [4.073594, -1.150388, 0.596427],
            [4.073594, -0.467997, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -1.150388, 0.596427],
            [4.073594, -1.150388, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -1.150388, 0.596427],
            [-3.27215, -0.467997, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, -0.467997, 0.596427],
            [4.073594, -0.467997, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [4.073594, 0.334816, 0.596427],
            [4.073594, 1.017206, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 0.334816, 0.596427],
            [4.073594, 0.334816, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 0.334816, 0.596427],
            [-3.27215, 1.017206, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 1.017206, 0.596427],
            [4.073594, 1.017206, 0.596427],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [4.073594, 4.791205, 0.596426],
            [4.073594, 5.473595, 0.596426],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 4.791205, 0.596426],
            [4.073594, 4.791205, 0.596426],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 4.791205, 0.596426],
            [-3.27215, 5.473595, 0.596426],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 5.473595, 0.596426],
            [4.073594, 5.473595, 0.596426],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [4.073594, 6.275636, 0.596426],
            [4.073594, 6.753312, 0.596425],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 6.275636, 0.596426],
            [4.073594, 6.275636, 0.596426],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-3.27215, 6.753312, 0.596425],
            [4.073594, 6.753312, 0.596425],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 5.472823, -0.693461],
            [-2.409125, 6.275636, -0.693462],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 5.472823, -2.218807],
            [-2.409125, 6.275636, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, -0.467998, -0.693461],
            [3.21057, 0.334816, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, -0.467998, -1.499663],
            [3.21057, 0.334816, -1.861789],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 3.987619, -0.693461],
            [-2.409125, 4.790432, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 3.987619, -2.218807],
            [-2.409125, 4.790432, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 2.502413, -0.693461],
            [3.21057, 3.305226, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 2.502413, -2.218807],
            [3.21057, 3.305226, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 3.987619, -0.693461],
            [3.21057, 4.790432, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 3.987619, -2.218807],
            [3.21057, 4.790432, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 5.472823, -0.693461],
            [3.21057, 6.275636, -0.693462],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 5.472823, -2.218807],
            [3.21057, 6.275636, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, -1.953159, -0.829751],
            [-2.409125, -1.150345, -1.191876],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, -1.953159, -0.693461],
            [-2.409125, -1.150345, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, -0.467998, -0.693461],
            [-2.409125, 0.334816, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, -0.467998, -1.499663],
            [-2.409125, 0.334816, -1.861789],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, -1.953202, -0.693461],
            [3.21057, -1.150388, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, -1.953202, -0.829731],
            [3.21057, -1.150388, -1.191857],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 1.017206, -0.693461],
            [-2.409125, 1.820019, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 1.126304, -2.218807],
            [-2.409125, 1.820019, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 1.017206, -2.169596],
            [-2.409125, 1.126304, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 2.502413, -0.693461],
            [-2.409125, 3.305226, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [-2.409125, 2.502413, -2.218807],
            [-2.409125, 3.305226, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 1.017206, -2.169596],
            [3.21057, 1.126304, -2.218807],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 1.017206, -0.693461],
            [3.21057, 1.820019, -0.693461],
          ],
        },
        severity: "medium",
      },
      {
        elements: {
          type: "edge",
          points: [
            [3.21057, 1.126304, -2.218807],
            [3.21057, 1.820019, -2.218807],
          ],
        },
        severity: "medium",
      },
    ],
    degenerate_faces: [],
    intersections: [
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -2.218807],
              [3.21057, 6.753312, 0.596425],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, -2.700256, -0.492757],
              [4.073594, -2.700256, -0.492757],
              [4.073594, 6.753312, -0.492759],
              [3.21057, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, 6.753312, -0.49275899999999995]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -2.218807],
              [3.21057, 6.753312, 0.596425],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, 6.753312, 0.596425],
              [4.073594, 6.275636, 0.596426],
              [-3.27215, 6.275636, 0.596426],
              [-3.27215, 6.753312, 0.596425],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, 6.753312, 0.5964249999999995]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 0.596427],
              [4.073594, -1.953202, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -3.156486, 0.596427],
              [4.073594, 1.798356, 0.596427],
              [4.073594, -3.156486, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, -1.953202, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 0.596427],
              [4.073594, -1.953202, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156378, -0.492757],
              [-3.27215, -3.156378, 0.596427],
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, 1.798465, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -1.953202, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 0.596427],
              [4.073594, -1.953202, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -3.156486, -0.492757],
              [4.073594, -3.156486, 0.596427],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 1.798355, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[4.073593999999998, -1.953202, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 3.305226, -2.218807],
              [-2.409125, 3.305226, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 3.305226, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [1.281824, -2.700256, -0.171632],
              [1.570118, -3.96857, 0.400467],
            ],
          },
          {
            type: "face",
            points: [
              [2.728881, -2.700256, -0.171632],
              [2.728881, 0.687219, -1.699622],
              [-1.927437, 0.687219, -1.699622],
              [-1.927437, -2.700256, -0.171632],
            ],
          },
          {
            type: "vertex",
            points: [[1.281824, -2.700256, -0.171632]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 5.472823, -2.218807],
              [-2.409125, 5.472823, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 5.472823, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.150388, 0.596427],
              [4.073594, -1.150388, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -3.156486, 0.596427],
              [4.073594, 1.798356, 0.596427],
              [4.073594, -3.156486, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, -1.150388, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.150388, 0.596427],
              [4.073594, -1.150388, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -1.953202, 1.227271],
              [-3.27215, 6.275636, 1.227269],
              [-3.27215, 6.275636, 0.596426],
              [-3.27215, -1.953202, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -1.150388, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.150388, 0.596427],
              [4.073594, -1.150388, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156378, -0.492757],
              [-3.27215, -3.156378, 0.596427],
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, 1.798465, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -1.150388, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.150388, 0.596427],
              [4.073594, -1.150388, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -3.156486, -0.492757],
              [4.073594, -3.156486, 0.596427],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 1.798355, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[4.073593999999998, -1.150388, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -2.700256, -0.492757],
              [-1.927437, -2.700256, -0.492757],
            ],
          },
          {
            type: "face",
            points: [
              [-2.409125, -2.255307, -0.693461],
              [-2.409125, 6.753312, -0.693462],
              [-2.409125, 6.753312, -0.492759],
              [-2.409125, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -2.700256, -0.492757],
              [-1.927437, -2.700256, -0.492757],
            ],
          },
          {
            type: "face",
            points: [
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, -2.700256, -0.211772],
              [-2.409125, 6.753312, -0.211774],
              [-2.409125, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -2.700256, -0.492757],
              [-1.927437, -2.700256, -0.492757],
            ],
          },
          {
            type: "face",
            points: [
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, -2.700256, -0.211772],
              [-2.409125, 6.753312, -0.211774],
              [-2.409125, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -2.700256, -0.492757],
              [-1.927437, -2.700256, -0.492757],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156378, -0.492757],
              [-3.27215, -3.156378, 0.596427],
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, 1.798465, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, 0.596425],
              [-2.409125, 6.753312, 1.829379],
            ],
          },
          {
            type: "face",
            points: [
              [0.333226, -4.054675, 1.829381],
              [-3.27215, 6.753312, 1.829379],
              [4.073594, 6.753312, 1.829379],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, 1.8293790000000003]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, 0.596425],
              [-2.409125, 6.753312, 1.829379],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, 6.753312, 0.596425],
              [4.073594, 6.275636, 0.596426],
              [-3.27215, 6.275636, 0.596426],
              [-3.27215, 6.753312, 0.596425],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, 0.596425]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 5.472823, -2.218807],
              [3.21057, 5.472823, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, 5.472823, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.043329, -3.518803, -0.492757],
              [0.043329, -3.518803, 0.550901],
            ],
          },
          {
            type: "face",
            points: [
              [-0.375643, -3.518803, 0.550901],
              [1.215362, -3.518803, 0.550901],
              [0.510528, -4.054203, 0.550901],
            ],
          },
          {
            type: "vertex",
            points: [[0.043329, -3.518803, 0.5509010000000002]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156378, 0.596427],
              [-3.27215, 1.798466, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [-2.767945, -3.396895, -0.492757],
              [-2.767945, -3.396895, 1.829381],
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, -3.156378, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -3.156377530956386, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, 0.596425],
              [3.21057, 6.753312, 1.829379],
            ],
          },
          {
            type: "face",
            points: [
              [0.333226, -4.054675, 1.829381],
              [-3.27215, 6.753312, 1.829379],
              [4.073594, 6.753312, 1.829379],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, 6.753312, 1.8293790000000003]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, 0.596425],
              [3.21057, 6.753312, 1.829379],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, 6.753312, 0.596425],
              [4.073594, 6.275636, 0.596426],
              [-3.27215, 6.275636, 0.596426],
              [-3.27215, 6.753312, 0.596425],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, 6.753312, 0.596425]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 4.791205, 0.596426],
              [4.073594, 4.791205, 0.596426],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, 6.753312, 1.829379],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, 4.791205, 0.596426]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.275636, -0.693462],
              [-2.409125, 6.753312, -0.693462],
            ],
          },
          {
            type: "face",
            points: [
              [-2.409125, 6.753312, 0.596425],
              [3.21057, 6.753312, 0.596425],
              [3.21057, 6.753312, -2.218807],
              [-2.409125, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, -0.693462]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.765861, -3.518803, 0.430479],
              [0.765861, -3.518803, 0.550901],
            ],
          },
          {
            type: "face",
            points: [
              [-0.375643, -3.518803, 0.550901],
              [1.215362, -3.518803, 0.550901],
              [0.510528, -4.054203, 0.550901],
            ],
          },
          {
            type: "vertex",
            points: [[0.765861, -3.518803, 0.550901]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, 6.753312, -0.492759],
            ],
          },
          {
            type: "face",
            points: [
              [-2.767945, -3.396895, -0.492757],
              [-3.27215, -2.700256, -0.492757],
              [-1.927437, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, 6.753312, -0.492759],
            ],
          },
          {
            type: "face",
            points: [
              [-2.409125, 6.753312, 0.596425],
              [3.21057, 6.753312, 0.596425],
              [3.21057, 6.753312, -2.218807],
              [-2.409125, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 6.753312000000001, -0.492759]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.700256, -0.211772],
              [-2.409125, 6.753312, -0.211774],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, 6.753312, 0.596425],
              [-2.409125, 6.753312, 0.596425],
              [-2.409125, 6.753312, -0.492759],
              [-3.27215, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 6.753312000000003, -0.211774]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.700256, -0.211772],
              [-2.409125, 6.753312, -0.211774],
            ],
          },
          {
            type: "face",
            points: [
              [-2.409125, 6.753312, 0.596425],
              [3.21057, 6.753312, 0.596425],
              [3.21057, 6.753312, -2.218807],
              [-2.409125, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 6.753312000000001, -0.211774]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -2.700256, -0.492757],
              [-2.409125, -2.700256, -0.492757],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156378, -0.492757],
              [-3.27215, -3.156378, 0.596427],
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, 1.798465, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.255307, -0.693461],
              [-2.409125, -1.953159, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [-1.927437, -2.700256, -0.492757],
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, 1.126304, -2.218807],
              [-1.927437, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, -2.25530602853915, -0.693461]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-1.927437, -2.700256, -0.492757],
              [-1.927437, 1.126304, -2.218807],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-1.927437, 1.1263039999999997, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, -3.156486, -0.492757],
              [4.073594, 1.798355, -0.492757],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, -2.700256, -0.492757],
              [4.073594, -2.700256, -0.492757],
              [4.073594, 6.753312, -0.492759],
              [3.21057, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, -2.7002560000000013, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.700256, -0.492757],
              [3.21057, 6.753312, -0.492759],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -2.700256, -0.492757],
              [3.608159, -3.379944, -0.492757],
              [2.728881, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.700256, -0.492757],
              [3.21057, 6.753312, -0.492759],
            ],
          },
          {
            type: "face",
            points: [
              [-2.409125, 6.753312, 0.596425],
              [3.21057, 6.753312, 0.596425],
              [3.21057, 6.753312, -2.218807],
              [-2.409125, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, 6.753312000000001, -0.492759]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 3.987619, -2.218807],
              [-2.409125, 3.987619, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 3.987619, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.753312, 0.596425],
              [4.073594, 6.753312, 0.596425],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, 6.753312, 1.829379],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, 6.753312, 0.596425]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.150388, 1.227271],
              [-3.27215, -1.150388, 1.829381],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
              [-2.767945, -3.396895, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -1.150388, 1.8293805951459223]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-0.424492, -2.700256, -0.492757],
              [-0.424492, -2.700256, -0.171632],
            ],
          },
          {
            type: "face",
            points: [
              [2.728881, -2.700256, -0.171632],
              [2.728881, 0.687219, -1.699622],
              [-1.927437, 0.687219, -1.699622],
              [-1.927437, -2.700256, -0.171632],
            ],
          },
          {
            type: "vertex",
            points: [[-0.424492, -2.700256, -0.17163200000000012]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, -2.255307, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [-2.767945, -3.396895, -0.492757],
              [-3.27215, -2.700256, -0.492757],
              [-1.927437, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.275636, -0.693462],
              [3.21057, 6.753312, -0.693462],
            ],
          },
          {
            type: "face",
            points: [
              [-2.409125, 6.753312, 0.596425],
              [3.21057, 6.753312, 0.596425],
              [3.21057, 6.753312, -2.218807],
              [-2.409125, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, 6.753312, -0.693462]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.700256, -0.492757],
              [3.21057, -2.255307, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -2.700256, -0.492757],
              [3.608159, -3.379944, -0.492757],
              [2.728881, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.275636, -2.218807],
              [-2.409125, 6.275636, -0.693462],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 6.275636, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 0.334816, 1.227271],
              [-3.27215, 0.334816, 1.829381],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
              [-2.767945, -3.396895, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, 0.334816, 1.8293802953980696]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.510528, -4.054203, 0.550901],
              [0.776141, -4.04165, 1.829381],
            ],
          },
          {
            type: "face",
            points: [
              [0.510528, -4.054203, 1.829381],
              [4.073594, 6.753312, 1.829379],
              [1.041754, -4.029099, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[0.7761409999999609, -4.0416500000000015, 1.8293809999998119]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, -2.700256, -0.211772],
            ],
          },
          {
            type: "face",
            points: [
              [-2.767945, -3.396895, -0.492757],
              [-3.27215, -2.700256, -0.492757],
              [-1.927437, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.275636, -2.218807],
              [3.21057, 6.275636, -0.693462],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, 6.275636, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -2.700256, -0.492757],
              [-2.767945, -3.396895, -0.492757],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156378, -0.492757],
              [-3.27215, -3.156378, 0.596427],
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, 1.798465, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.82002, 1.227271],
              [-3.27215, 1.82002, 1.829381],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
              [-2.767945, -3.396895, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, 1.82002, 1.8293799956502168]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 3.305226, -2.218807],
              [3.21057, 3.305226, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, 3.305226, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.700256, -0.492757],
              [3.21057, -2.700256, -0.211772],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -2.700256, -0.492757],
              [3.608159, -3.379944, -0.492757],
              [2.728881, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 3.305226, 1.22727],
              [-3.27215, 3.305226, 1.829381],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
              [-2.767945, -3.396895, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, 3.305226, 1.8293796959019604]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -1.953159, -0.829751],
              [-2.409125, -1.150345, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [-1.927437, -2.700256, -0.492757],
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, 1.126304, -2.218807],
              [-1.927437, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, -1.9531585858889835, -0.8297509296982982]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 2.502413, 0.596427],
              [4.073594, 2.502413, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, 6.753312, 1.829379],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, 2.502413, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 2.502413, 0.596427],
              [4.073594, 2.502413, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -1.953202, 1.227271],
              [-3.27215, 6.275636, 1.227269],
              [-3.27215, 6.275636, 0.596426],
              [-3.27215, -1.953202, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, 2.502413, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.017206, 0.596427],
              [4.073594, 1.017206, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -3.156486, 0.596427],
              [4.073594, 1.798356, 0.596427],
              [4.073594, -3.156486, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, 1.017206, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.017206, 0.596427],
              [4.073594, 1.017206, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -1.953202, 1.227271],
              [-3.27215, 6.275636, 1.227269],
              [-3.27215, 6.275636, 0.596426],
              [-3.27215, -1.953202, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, 1.017206, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.017206, 0.596427],
              [4.073594, 1.017206, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156378, -0.492757],
              [-3.27215, -3.156378, 0.596427],
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, 1.798465, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, 1.017206, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.017206, 0.596427],
              [4.073594, 1.017206, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -3.156486, -0.492757],
              [4.073594, -3.156486, 0.596427],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 1.798355, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[4.073593999999998, 1.017206, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.765861, -3.518803, -0.492757],
              [0.765861, -3.518803, 0.550901],
            ],
          },
          {
            type: "face",
            points: [
              [-0.375643, -3.518803, 0.550901],
              [1.215362, -3.518803, 0.550901],
              [0.510528, -4.054203, 0.550901],
            ],
          },
          {
            type: "vertex",
            points: [[0.765861, -3.518803, 0.5509010000000002]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [2.728881, -2.700256, -0.492757],
              [2.728881, 1.126304, -2.218807],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[2.728881, 1.1263039999999997, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.776141, -4.04165, 1.829381],
              [1.041754, -4.029099, 0.550901],
            ],
          },
          {
            type: "face",
            points: [
              [0.510528, -4.054203, 1.829381],
              [4.073594, 6.753312, 1.829379],
              [1.041754, -4.029099, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[0.776141000000039, -4.041649999999998, 1.8293809999998119]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 1.820019, -2.218807],
              [-2.409125, 1.820019, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 1.820019, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -1.953159, -0.829751],
              [-2.409125, -1.150345, -1.191876],
            ],
          },
          {
            type: "face",
            points: [
              [-1.927437, -2.700256, -0.492757],
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, 1.126304, -2.218807],
              [-1.927437, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, -1.7588518223279384, -0.917397063365232]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 3.305226, 0.596426],
              [4.073594, 3.305226, 0.596426],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, 1.798465, -0.492757],
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, 6.753312, 0.596425],
              [-3.27215, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, 3.305226, 0.596426]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 3.305226, 0.596426],
              [4.073594, 3.305226, 0.596426],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, 6.753312, 1.829379],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, 3.305226, 0.596426]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 3.987619, 0.596426],
              [4.073594, 3.987619, 0.596426],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, 1.798465, -0.492757],
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, 6.753312, 0.596425],
              [-3.27215, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, 3.987619, 0.596426]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 3.987619, 0.596426],
              [4.073594, 3.987619, 0.596426],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, 6.753312, 1.829379],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, 3.987619, 0.596426]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.255307, -0.693461],
              [3.21057, -1.953202, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, -2.700256, -0.492757],
              [2.728881, -2.700256, -0.492757],
              [2.728881, 1.126304, -2.218807],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, -2.25530602853915, -0.693461]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 1.820019, -2.218807],
              [3.21057, 1.820019, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, 1.820019, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 3.988392, 1.82938],
              [-3.27215, 4.791205, 1.829379],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
              [-2.767945, -3.396895, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, 4.411823242662417, 1.8293794725655381]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, -3.156486, 0.596427],
              [4.073594, 1.798356, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -3.156486, -0.492757],
              [4.073594, -3.156486, 1.829381],
              [3.608159, -3.379944, 1.829381],
              [3.608159, -3.379944, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, -3.156486, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [1.281824, -2.700256, -0.171632],
              [2.093258, -3.872885, 0.357307],
            ],
          },
          {
            type: "face",
            points: [
              [2.728881, -2.700256, -0.171632],
              [2.728881, 0.687219, -1.699622],
              [-1.927437, 0.687219, -1.699622],
              [-1.927437, -2.700256, -0.171632],
            ],
          },
          {
            type: "vertex",
            points: [[1.281824, -2.700256, -0.171632]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.700256, -0.211772],
              [3.21057, 6.753312, -0.211774],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 6.753312, 0.596425],
              [4.073594, 6.753312, 0.596425],
              [4.073594, 6.753312, -0.492759],
              [3.21057, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, 6.753312000000001, -0.211774]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.700256, -0.211772],
              [3.21057, 6.753312, -0.211774],
            ],
          },
          {
            type: "face",
            points: [
              [-2.409125, 6.753312, 0.596425],
              [3.21057, 6.753312, 0.596425],
              [3.21057, 6.753312, -2.218807],
              [-2.409125, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, 6.753312000000001, -0.211774]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 3.987619, -2.218807],
              [3.21057, 3.987619, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, 3.987619, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.255307, -0.693461],
              [3.21057, -1.953202, -0.829731],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, -2.700256, -0.492757],
              [2.728881, -2.700256, -0.492757],
              [2.728881, 1.126304, -2.218807],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, -2.08667909999714, -0.7695237064543444]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156378, 0.596427],
              [-3.27215, -1.953202, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [-2.767945, -3.396895, -0.492757],
              [-2.767945, -3.396895, 1.829381],
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, -3.156378, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -3.156377530956386, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 0.596427],
              [-3.27215, -1.953202, 1.829381],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
              [-2.767945, -3.396895, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -1.953202, 1.829380757171996]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -2.635593, 0.596427],
              [4.073594, -2.635593, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -3.156486, 0.596427],
              [4.073594, 1.798356, 0.596427],
              [4.073594, -3.156486, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, -2.635593, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -2.635593, 0.596427],
              [4.073594, -2.635593, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, -1.953202, 1.829381],
              [-3.27215, -1.953202, 0.596427],
              [-3.27215, -3.156378, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -2.635593, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -2.635593, 0.596427],
              [4.073594, -2.635593, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156378, -0.492757],
              [-3.27215, -3.156378, 0.596427],
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, 1.798465, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -2.635593, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -2.635593, 0.596427],
              [4.073594, -2.635593, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -3.156486, -0.492757],
              [4.073594, -3.156486, 0.596427],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 1.798355, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[4.073593999999998, -2.635593, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 6.753312, -0.492759],
              [4.073594, 6.753312, 1.829379],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, 6.753312, 0.596425],
              [4.073594, 6.275636, 0.596426],
              [-3.27215, 6.275636, 0.596426],
              [-3.27215, 6.753312, 0.596425],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, 6.753312, 0.5964250000000002]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -2.218807],
              [-2.409125, 6.753312, 0.596425],
            ],
          },
          {
            type: "face",
            points: [
              [-2.409125, 6.753312, -0.492759],
              [-3.27215, 6.753312, -0.492759],
              [-3.27215, -2.700256, -0.492757],
              [-2.409125, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, -0.49275900000000017]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -2.218807],
              [-2.409125, 6.753312, 0.596425],
            ],
          },
          {
            type: "face",
            points: [
              [-2.409125, 6.753312, -0.492759],
              [-3.27215, 6.753312, -0.492759],
              [-3.27215, -2.700256, -0.492757],
              [-2.409125, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, -0.49275900000000017]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -2.218807],
              [-2.409125, 6.753312, 0.596425],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, 6.753312, 0.596425],
              [4.073594, 6.275636, 0.596426],
              [-3.27215, 6.275636, 0.596426],
              [-3.27215, 6.753312, 0.596425],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, 0.5964249999999995]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.82002, 0.596427],
              [4.073594, 1.82002, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, 6.753312, 1.829379],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, 1.82002, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.82002, 0.596427],
              [4.073594, 1.82002, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -1.953202, 1.227271],
              [-3.27215, 6.275636, 1.227269],
              [-3.27215, 6.275636, 0.596426],
              [-3.27215, -1.953202, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, 1.82002, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-1.927437, 0.90676, -2.119777],
              [-1.927437, 1.126304, -2.218807],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-1.927437, 1.126304, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 2.502413, -2.218807],
              [3.21057, 2.502413, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, 2.502413, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 2.502413, -2.218807],
              [-2.409125, 2.502413, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 2.502413, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -0.467997, 0.596427],
              [4.073594, -0.467997, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -3.156486, 0.596427],
              [4.073594, 1.798356, 0.596427],
              [4.073594, -3.156486, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, -0.467997, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -0.467997, 0.596427],
              [4.073594, -0.467997, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -1.953202, 1.227271],
              [-3.27215, 6.275636, 1.227269],
              [-3.27215, 6.275636, 0.596426],
              [-3.27215, -1.953202, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -0.467997, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -0.467997, 0.596427],
              [4.073594, -0.467997, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156378, -0.492757],
              [-3.27215, -3.156378, 0.596427],
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, 1.798465, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -0.467997, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -0.467997, 0.596427],
              [4.073594, -0.467997, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -3.156486, -0.492757],
              [4.073594, -3.156486, 0.596427],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 1.798355, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[4.073593999999998, -0.467997, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.700256, -0.492757],
              [4.073594, -2.700256, -0.492757],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -3.156486, -0.492757],
              [4.073594, -3.156486, 0.596427],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 1.798355, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [1.281824, -2.700256, -0.492757],
              [1.281824, -2.700256, -0.171632],
            ],
          },
          {
            type: "face",
            points: [
              [2.728881, -2.700256, -0.171632],
              [2.728881, 0.687219, -1.699622],
              [-1.927437, 0.687219, -1.699622],
              [-1.927437, -2.700256, -0.171632],
            ],
          },
          {
            type: "vertex",
            points: [[1.281824, -2.700256, -0.171632]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 0.334816, 0.596427],
              [4.073594, 0.334816, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -3.156486, 0.596427],
              [4.073594, 1.798356, 0.596427],
              [4.073594, -3.156486, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, 0.334816, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 0.334816, 0.596427],
              [4.073594, 0.334816, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -1.953202, 1.227271],
              [-3.27215, 6.275636, 1.227269],
              [-3.27215, 6.275636, 0.596426],
              [-3.27215, -1.953202, 0.596427],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, 0.334816, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 0.334816, 0.596427],
              [4.073594, 0.334816, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156378, -0.492757],
              [-3.27215, -3.156378, 0.596427],
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, 1.798465, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, 0.334816, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 0.334816, 0.596427],
              [4.073594, 0.334816, 0.596427],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -3.156486, -0.492757],
              [4.073594, -3.156486, 0.596427],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 1.798355, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[4.073593999999998, 0.334816, 0.596427]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -0.492759],
              [3.21057, 6.753312, 0.596425],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, 6.753312, 0.596425],
              [4.073594, 6.275636, 0.596426],
              [-3.27215, 6.275636, 0.596426],
              [-3.27215, 6.753312, 0.596425],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, 6.753312, 0.5964250000000002]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, 1.126304, -2.218807],
            ],
          },
          {
            type: "face",
            points: [
              [-2.767945, -3.396895, -0.492757],
              [-3.27215, -2.700256, -0.492757],
              [-1.927437, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -0.492759],
              [-2.409125, 6.753312, 0.596425],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, 6.753312, 0.596425],
              [4.073594, 6.275636, 0.596426],
              [-3.27215, 6.275636, 0.596426],
              [-3.27215, 6.753312, 0.596425],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, 0.5964250000000002]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.700256, -0.492757],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -2.700256, -0.492757],
              [3.608159, -3.379944, -0.492757],
              [2.728881, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 4.790432, -2.218807],
              [-2.409125, 4.790432, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 4.790432, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -0.467997, 1.227271],
              [-3.27215, -0.467997, 1.829381],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
              [-2.767945, -3.396895, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -0.467997, 1.8293804574239414]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156378, -0.492757],
              [-3.27215, 1.798465, -0.492757],
            ],
          },
          {
            type: "face",
            points: [
              [-2.409125, 6.753312, -0.492759],
              [-3.27215, 6.753312, -0.492759],
              [-3.27215, -2.700256, -0.492757],
              [-2.409125, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156378, -0.492757],
              [-3.27215, 1.798465, -0.492757],
            ],
          },
          {
            type: "face",
            points: [
              [-2.409125, 6.753312, -0.492759],
              [-3.27215, 6.753312, -0.492759],
              [-3.27215, -2.700256, -0.492757],
              [-2.409125, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -2.7002559999999995, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [2.728881, -2.700256, -0.492757],
              [4.073594, -2.700256, -0.492757],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, -2.255307, -0.693461],
              [3.21057, 6.753312, -0.693462],
              [3.21057, 6.753312, -0.492759],
              [3.21057, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [2.728881, -2.700256, -0.492757],
              [4.073594, -2.700256, -0.492757],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 6.753312, -0.492759],
              [3.21057, 6.753312, -0.211774],
              [3.21057, -2.700256, -0.211772],
              [3.21057, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [2.728881, -2.700256, -0.492757],
              [4.073594, -2.700256, -0.492757],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 6.753312, -0.492759],
              [3.21057, 6.753312, -0.211774],
              [3.21057, -2.700256, -0.211772],
              [3.21057, -2.700256, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [2.728881, -2.700256, -0.492757],
              [4.073594, -2.700256, -0.492757],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -3.156486, -0.492757],
              [4.073594, -3.156486, 0.596427],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 1.798355, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.017206, 1.227271],
              [-3.27215, 1.017206, 1.829381],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
              [-2.767945, -3.396895, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, 1.017206, 1.8293801576762903]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 4.790432, -2.218807],
              [3.21057, 4.790432, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, 4.790432, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -1.953159, -0.829751],
              [-2.409125, -1.953159, -0.693461],
            ],
          },
          {
            type: "face",
            points: [
              [-1.927437, -2.700256, -0.492757],
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, 1.126304, -2.218807],
              [-1.927437, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, -1.953159, -0.8297507429048545]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.043329, -3.518803, 0.430479],
              [0.043329, -3.518803, 0.550901],
            ],
          },
          {
            type: "face",
            points: [
              [-0.375643, -3.518803, 0.550901],
              [1.215362, -3.518803, 0.550901],
              [0.510528, -4.054203, 0.550901],
            ],
          },
          {
            type: "vertex",
            points: [[0.043329, -3.518803, 0.550901]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [2.728881, 0.90676, -2.119777],
              [2.728881, 1.126304, -2.218807],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, 1.126304, -2.218807],
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[2.728881, 1.126304, -2.218807]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 2.502413, 1.227271],
              [-3.27215, 2.502413, 1.829381],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
              [-2.767945, -3.396895, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, 2.502413, 1.8293798579278322]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-1.927437, -2.700256, -0.171632],
              [2.728881, -2.700256, -0.171632],
            ],
          },
          {
            type: "face",
            points: [
              [-0.424492, -2.700256, -0.171632],
              [-0.424492, -2.700256, -0.492757],
              [-0.424492, -3.353969, 0.123239],
            ],
          },
          {
            type: "vertex",
            points: [[-0.4244920000000003, -2.700256, -0.171632]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-1.927437, -2.700256, -0.171632],
              [2.728881, -2.700256, -0.171632],
            ],
          },
          {
            type: "face",
            points: [
              [1.281824, -2.700256, -0.171632],
              [1.281824, -2.700256, -0.492757],
              [1.281824, -4.001596, 0.415365],
            ],
          },
          {
            type: "vertex",
            points: [[1.281824000000001, -2.700256, -0.171632]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-1.927437, -2.700256, -0.171632],
              [2.728881, -2.700256, -0.171632],
            ],
          },
          {
            type: "face",
            points: [
              [-0.726804, -3.974676, 0.403222],
              [-0.424492, -2.700256, -0.171632],
              [-0.424492, -4.007681, 0.41811],
            ],
          },
          {
            type: "vertex",
            points: [[-0.4244920000100667, -2.700256, -0.171632]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-1.927437, -2.700256, -0.171632],
              [2.728881, -2.700256, -0.171632],
            ],
          },
          {
            type: "face",
            points: [
              [-0.424492, -2.700256, -0.171632],
              [-0.726804, -3.974676, 0.403222],
              [-1.250446, -3.881776, 0.361317],
            ],
          },
          {
            type: "vertex",
            points: [[-0.4244919999961225, -2.700256, -0.171632]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-1.927437, -2.700256, -0.171632],
              [2.728881, -2.700256, -0.171632],
            ],
          },
          {
            type: "face",
            points: [
              [1.281824, -2.700256, -0.171632],
              [2.093258, -3.872885, 0.357307],
              [1.570118, -3.96857, 0.400467],
            ],
          },
          {
            type: "vertex",
            points: [[1.2818239995396497, -2.700256, -0.171632]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-1.927437, -2.700256, -0.171632],
              [2.728881, -2.700256, -0.171632],
            ],
          },
          {
            type: "face",
            points: [
              [1.570118, -3.96857, 0.400467],
              [1.281824, -4.001596, 0.415365],
              [1.281824, -2.700256, -0.171632],
            ],
          },
          {
            type: "vertex",
            points: [[1.2818239999792278, -2.700256, -0.171632]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, 0.596425],
              [4.073594, 6.753312, 0.596425],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, 6.753312, 1.829379],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, 6.753312, 0.596425]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 5.473595, 0.596426],
              [4.073594, 5.473595, 0.596426],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, 6.753312, 1.829379],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, 5.473595, 0.596426]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.275636, 0.596426],
              [4.073594, 6.275636, 0.596426],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, 6.753312, 1.829379],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 6.753312, -0.492759],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, 6.275636, 0.596426]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.608159, -3.379944, -0.492757],
              [4.073594, -2.700256, -0.492757],
            ],
          },
          {
            type: "face",
            points: [
              [4.073594, -3.156486, -0.492757],
              [4.073594, -3.156486, 0.596427],
              [4.073594, 1.798356, 0.596427],
              [4.073594, 1.798355, -0.492757],
            ],
          },
          {
            type: "vertex",
            points: [[4.073594, -2.700256, -0.492757]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 3.988391, 1.22727],
              [-3.27215, 3.988392, 1.82938],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
              [-2.767945, -3.396895, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, 3.988391999999266, 1.8293795580235668]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.255307, -0.693461],
              [3.21057, 6.753312, -0.693462],
            ],
          },
          {
            type: "face",
            points: [
              [3.21057, -2.700256, -0.492757],
              [2.728881, -2.700256, -0.492757],
              [2.728881, 1.126304, -2.218807],
              [3.21057, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, -2.255306028538911, -0.6934610000001078]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -2.255307, -0.693461],
              [3.21057, 6.753312, -0.693462],
            ],
          },
          {
            type: "face",
            points: [
              [-2.409125, 6.753312, 0.596425],
              [3.21057, 6.753312, 0.596425],
              [3.21057, 6.753312, -2.218807],
              [-2.409125, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[3.21057, 6.753312000000001, -0.693462]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.255307, -0.693461],
              [-2.409125, 6.753312, -0.693462],
            ],
          },
          {
            type: "face",
            points: [
              [-1.927437, -2.700256, -0.492757],
              [-2.409125, -2.700256, -0.492757],
              [-2.409125, 1.126304, -2.218807],
              [-1.927437, 1.126304, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, -2.255306028538911, -0.6934610000001078]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.255307, -0.693461],
              [-2.409125, 6.753312, -0.693462],
            ],
          },
          {
            type: "face",
            points: [
              [-2.409125, 6.753312, 0.596425],
              [3.21057, 6.753312, 0.596425],
              [3.21057, 6.753312, -2.218807],
              [-2.409125, 6.753312, -2.218807],
            ],
          },
          {
            type: "vertex",
            points: [[-2.409125, 6.753312000000001, -0.693462]],
          },
        ],
        severity: "high",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 1.227271],
              [-3.27215, -1.953202, 1.829381],
            ],
          },
          {
            type: "face",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, 6.753312, 1.829379],
              [-2.767945, -3.396895, 1.829381],
            ],
          },
          {
            type: "vertex",
            points: [[-3.27215, -1.953202, 1.8293807571719958]],
          },
        ],
        severity: "high",
      },
    ],
  },
};

export default function GeometryIssueSidebar() {
  const { modelId } = useParams() as { modelId: string };
  useGetModelQuery(modelId);
  const dispatch = useDispatch();
  const { geometryIssues, selectedIssue, expandedIssueGroups } = useSelector((state: RootState) => {
    return state.geometryIssue;
  });

  useEffect(() => {
    dispatch(setGeometryIssues(MODEL_DATA_EXAMPLE.geometryIssues));
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

  const handleIssueClick = (isSelected: boolean, issue: GeometryIssue) => {
    if (isSelected) {
      dispatch(clearSelectedIssue());
      return;
    }

    dispatch(setSelectedIssue(issue));
  };

  const getIssueRowClassName = (isSelected: boolean) => {
    const selectedClass = "bg-choras-primary/10";
    const defaultClass = "hover:bg-white/5";

    return `border-b border-choras-gray/60 transition-colors cursor-pointer ${isSelected ? selectedClass : defaultClass}`;
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
                max-h-[100vh] overflow-y-auto pr-4
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
                                    onClick={() => handleIssueClick(isSelected, issue)}
                                    className={getIssueRowClassName(isSelected)}
                                  >
                                    <td colSpan={2} className="pr-3 pl-9 py-2.5 text-sm text-left">
                                      <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-2">
                                          <span className="shrink-0 text-[11px] font-semibold text-white/45">
                                            #{index + 1}
                                          </span>
                                          <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/80">
                                            {issue.type}
                                          </span>
                                          <span
                                            className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${getSeverityClassName(issue.severity)}`}
                                          >
                                            {issue.severity}
                                          </span>
                                        </div>
                                        <span
                                          className="block truncate font-mono text-xs text-white/70"
                                          title={formatIssuePoints(issue.points)}
                                        >
                                          {formatIssuePoints(issue.points)}
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
    </div>
  );
}
