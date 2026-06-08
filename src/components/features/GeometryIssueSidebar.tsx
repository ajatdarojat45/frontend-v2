import {
  clearSelectedIssue,
  setGeometryIssues,
  setIssueGroupExpanded,
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
import { PossibleSimulation } from "./PossibleSimulation";

interface IProps {
  showPossibleSimulation?: boolean;
  showQuickAction?: boolean;
  showIssueList?: boolean;
  showRepairButton?: boolean;
}

const MODEL_DATA_EXAMPLE: {
  hasGeometryIssues: boolean;
  geometryIssues: GeometryIssueInputs;
} = {
  hasGeometryIssues: true,
  geometryIssues: {
    duplicate_vertices: [
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 4.790432, -0.693461]],
          },
        ],
        severity: "medium",
        id: "b1feb78c-9dfc-4803-aadf-7d37be8bbc2b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 4.790432, -0.693461]],
          },
        ],
        severity: "medium",
        id: "ea4a799d-037a-4239-8f2c-2945238a1247",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 5.472823, -0.693461]],
          },
        ],
        severity: "medium",
        id: "3d5c3a20-249e-41a6-85b3-871fc16ef8f9",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 5.472823, -0.693461]],
          },
        ],
        severity: "medium",
        id: "111812f5-ed36-472c-b499-6a9224f7fc17",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 4.790432, -2.218807]],
          },
        ],
        severity: "medium",
        id: "f6ef0468-dc72-4482-9173-76283562dc72",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 4.790432, -2.218807]],
          },
        ],
        severity: "medium",
        id: "a41dc75e-69c7-429e-8812-080dd860ec72",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 5.472823, -2.218807]],
          },
        ],
        severity: "medium",
        id: "0dc77b9c-0b4b-47b1-aa1e-19e204bd8757",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 5.472823, -2.218807]],
          },
        ],
        severity: "medium",
        id: "23f44761-e361-48a4-b531-edd4fcd68488",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -1.150388, -0.693461]],
          },
        ],
        severity: "medium",
        id: "0db62049-fc46-4af2-a24b-b3fbe15589a5",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -1.150388, -0.693461]],
          },
        ],
        severity: "medium",
        id: "4536c86f-b564-41ba-b9a5-399a4e1b4a93",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -0.467998, -0.693461]],
          },
        ],
        severity: "medium",
        id: "f88b2185-077e-4715-b5bd-349f1b22216f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -0.467998, -0.693461]],
          },
        ],
        severity: "medium",
        id: "2764e80e-4857-4ce4-a8f1-4806fe90886c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -0.467998, -1.499663]],
          },
        ],
        severity: "medium",
        id: "07f9d4ce-2a82-4530-844b-ede8f7f5c15c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -0.467998, -1.499663]],
          },
        ],
        severity: "medium",
        id: "3570f414-db63-4f8d-9d48-1ec34fdfb438",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -1.150388, -1.191857]],
          },
        ],
        severity: "medium",
        id: "d0191b31-7a08-48a7-bd33-4198acab0aec",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -1.150388, -1.191857]],
          },
        ],
        severity: "medium",
        id: "598a63eb-808d-4d70-a5d9-50f8f62b2f6f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 3.305226, -0.693461]],
          },
        ],
        severity: "medium",
        id: "23fe9b5b-233f-47ff-a725-fd9ba27a3f56",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 3.305226, -0.693461]],
          },
        ],
        severity: "medium",
        id: "a4dc6b1d-1540-47ee-bd9e-0ca51078ff3b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 3.987619, -0.693461]],
          },
        ],
        severity: "medium",
        id: "a9110b5f-e0d5-4d2a-855d-7f3fac8295ed",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 3.987619, -0.693461]],
          },
        ],
        severity: "medium",
        id: "e333a0f7-5fe6-48aa-bf2a-f7ee68597750",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 3.305226, -2.218807]],
          },
        ],
        severity: "medium",
        id: "d134fd26-e78f-4f9a-9ee4-8e6049590d06",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 3.305226, -2.218807]],
          },
        ],
        severity: "medium",
        id: "42f1a71c-de2e-4398-ba48-63fa80157df6",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 3.987619, -2.218807]],
          },
        ],
        severity: "medium",
        id: "929986c5-8e42-4373-969c-0752f03cb7cf",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 3.987619, -2.218807]],
          },
        ],
        severity: "medium",
        id: "74bee2c5-76e5-4763-b237-3c1d82ca74a8",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 1.820019, -0.693461]],
          },
        ],
        severity: "medium",
        id: "940cbb8c-9be0-4bb4-86c5-70ca9aceb046",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 1.820019, -0.693461]],
          },
        ],
        severity: "medium",
        id: "ee9a3a6b-379c-4ff0-8b9f-c4453a9e1f11",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 2.502413, -0.693461]],
          },
        ],
        severity: "medium",
        id: "8c65c0fb-7f24-425a-aef8-28a6187c24df",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 2.502413, -0.693461]],
          },
        ],
        severity: "medium",
        id: "b278d108-bc2d-4799-9485-862aa5efb078",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 1.820019, -2.218807]],
          },
        ],
        severity: "medium",
        id: "60ce052e-093b-49fa-a139-2e73c5ce9076",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 1.820019, -2.218807]],
          },
        ],
        severity: "medium",
        id: "7fae7399-d62a-4a4d-a8cd-a96bf07084e1",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 2.502413, -2.218807]],
          },
        ],
        severity: "medium",
        id: "5fb1128f-a254-4aa8-acdc-c530e36d56c2",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 2.502413, -2.218807]],
          },
        ],
        severity: "medium",
        id: "84ab947b-021a-4e66-90f9-50048a6a2057",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.275636, -0.693462]],
          },
        ],
        severity: "medium",
        id: "1ab54075-7824-447b-ac0b-6d9c42d0cc33",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.275636, -0.693462]],
          },
        ],
        severity: "medium",
        id: "d5b9e9ab-a021-4099-85a2-e61adb0c4374",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.753312, -0.693462]],
          },
        ],
        severity: "medium",
        id: "d3529c56-fd7f-44fb-918c-3dd909f45a42",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.753312, -0.693462]],
          },
        ],
        severity: "medium",
        id: "403b47f8-d27f-447c-ab3a-bacde5a5c64d",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.275636, -2.218807]],
          },
        ],
        severity: "medium",
        id: "4fc6ddfa-b3fe-4521-b890-9b331ba220a0",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.275636, -2.218807]],
          },
        ],
        severity: "medium",
        id: "57505935-d7ea-4153-9a20-92cd5a4d75c6",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.753312, -2.218807]],
          },
        ],
        severity: "medium",
        id: "e344bd47-3774-4304-be2c-8a9ca0e72a00",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21004, 6.753312, -2.218807]],
          },
        ],
        severity: "medium",
        id: "45fe4db8-005d-4c69-87b3-0ca96ee75954",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.753312, -2.218807]],
          },
        ],
        severity: "medium",
        id: "222a7dc5-c957-48c9-8c5a-a1e80d67a90e",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 4.790432, -0.693461]],
          },
        ],
        severity: "medium",
        id: "da88cada-27df-498d-a72c-b1a069a2d717",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 4.790432, -0.693461]],
          },
        ],
        severity: "medium",
        id: "6aea1783-31c3-46c4-bde9-55f5645a24fe",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 5.472823, -0.693461]],
          },
        ],
        severity: "medium",
        id: "1669700a-ffa7-406a-80e3-41f743337f8c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 5.472823, -0.693461]],
          },
        ],
        severity: "medium",
        id: "3756749e-cce7-48f1-9185-ee6489a7312d",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 4.790432, -2.218807]],
          },
        ],
        severity: "medium",
        id: "7a13bf64-7ce1-4eea-a50c-3007fefd52c3",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 4.790432, -2.218807]],
          },
        ],
        severity: "medium",
        id: "619c7f9f-eba9-4701-9d26-0cb9639a76c1",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 5.472823, -2.218807]],
          },
        ],
        severity: "medium",
        id: "03a4ecd9-1e34-4ffb-942d-f9901163bffd",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 5.472823, -2.218807]],
          },
        ],
        severity: "medium",
        id: "419525e6-fe9a-4a58-97a1-a3b7cdff4382",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 3.305226, -0.693461]],
          },
        ],
        severity: "medium",
        id: "79e197cd-6b0e-4bc0-8ee7-d1e4b69c9027",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 3.305226, -0.693461]],
          },
        ],
        severity: "medium",
        id: "30dd1630-fedd-4483-9512-cb7729f16b41",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 3.987619, -0.693461]],
          },
        ],
        severity: "medium",
        id: "58003e1e-3e35-4b44-bc39-7412efbb7731",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 3.987619, -0.693461]],
          },
        ],
        severity: "medium",
        id: "e10f0d45-e966-4a01-b52a-f927662f5c9f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 3.305226, -2.218807]],
          },
        ],
        severity: "medium",
        id: "8fe93216-9d71-4264-b615-0111fa178473",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 3.305226, -2.218807]],
          },
        ],
        severity: "medium",
        id: "59448f89-e3a5-425a-b6f7-e8470aa474ef",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 3.987619, -2.218807]],
          },
        ],
        severity: "medium",
        id: "8817e8bb-0f17-44e3-96ec-b7b239a16de9",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 3.987619, -2.218807]],
          },
        ],
        severity: "medium",
        id: "a9ccf749-21e4-428c-857b-d7f9698b5679",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 1.820019, -0.693461]],
          },
        ],
        severity: "medium",
        id: "6839205a-7726-4d96-90ed-b1d3262996e5",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 1.820019, -0.693461]],
          },
        ],
        severity: "medium",
        id: "d13b3ea0-4fa9-4f8c-985e-726ab2476540",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 2.502413, -0.693461]],
          },
        ],
        severity: "medium",
        id: "bea21d92-0a51-48c5-9220-e123544e0b5c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 2.502413, -0.693461]],
          },
        ],
        severity: "medium",
        id: "9d09d2a1-a62a-4270-b012-4b038e5081fd",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 1.820019, -2.218807]],
          },
        ],
        severity: "medium",
        id: "4edc3432-725c-4fbe-81b0-03bf79cc2a82",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 1.820019, -2.218807]],
          },
        ],
        severity: "medium",
        id: "1c2e06f6-6c88-4d66-b3a2-883d98f04a50",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 2.502413, -2.218807]],
          },
        ],
        severity: "medium",
        id: "31b9a9b2-8ee5-420f-b41d-49468af66923",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 2.502413, -2.218807]],
          },
        ],
        severity: "medium",
        id: "d3ec3b42-3a61-47d1-a939-f8c317514203",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.753312, 0.596425]],
          },
        ],
        severity: "medium",
        id: "6b21b729-2e59-49ae-81ba-63d0c8616e55",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.753312, 0.596425]],
          },
        ],
        severity: "medium",
        id: "74b24b85-a88b-4dd5-89b8-3a4b6e6084ab",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.753312, 0.596425]],
          },
        ],
        severity: "medium",
        id: "1b57b0eb-ba58-4c0b-8a96-8a6b479d2e0b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.753312, 0.596425]],
          },
        ],
        severity: "medium",
        id: "15433728-0677-47fc-9c51-52f035904977",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.753312, 0.596425]],
          },
        ],
        severity: "medium",
        id: "015be373-226d-4b2c-bbb4-a078a99693ed",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.753312, -0.492759]],
          },
        ],
        severity: "medium",
        id: "2016d699-271c-4e70-8d08-17fc062d62d0",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.753312, -0.492759]],
          },
        ],
        severity: "medium",
        id: "bd76f81d-2502-49b7-91ea-bbd5758fe87c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.753312, -0.492759]],
          },
        ],
        severity: "medium",
        id: "3555e2a8-ea7a-47de-a8ad-8e7e1d46820e",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 1.798466, 0.596427]],
          },
        ],
        severity: "medium",
        id: "51179f7b-92a2-4d10-9b49-c6bd81a922be",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 1.798466, 0.596427]],
          },
        ],
        severity: "medium",
        id: "a9feace3-1ae2-4fbb-b360-eb3198a0f1a8",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 1.798465, -0.492757]],
          },
        ],
        severity: "medium",
        id: "c4ecfa18-90fc-49b7-82ee-5f18165e0f01",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 1.798465, -0.492757]],
          },
        ],
        severity: "medium",
        id: "aa997fb0-5de2-49d9-9465-25bd6cf2b34b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, -3.156486, 1.829381]],
          },
        ],
        severity: "medium",
        id: "099c5018-2b98-4622-af49-df1eab8325e6",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, -3.156486, 1.829381]],
          },
        ],
        severity: "medium",
        id: "1dbade5f-7622-4e36-96c8-11f2d2fd5f49",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, -3.156486, 1.829381]],
          },
        ],
        severity: "medium",
        id: "0b639865-eb38-4e44-98d3-1bf0de74cc10",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, 6.753312, 1.829379]],
          },
        ],
        severity: "medium",
        id: "32537959-403b-4dd1-8a1e-cedf3e2b5744",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, 6.753312, 1.829379]],
          },
        ],
        severity: "medium",
        id: "f5f5f009-aed4-4b47-b0af-8d76bd1571e6",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, 6.753312, 1.829379]],
          },
        ],
        severity: "medium",
        id: "83752399-a7c2-40a3-95d3-92720c67b844",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, 6.753312, -0.492759]],
          },
        ],
        severity: "medium",
        id: "7227d9dc-26c6-4623-8ea1-fde2d81dfe7a",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, 6.753312, -0.492759]],
          },
        ],
        severity: "medium",
        id: "87b28310-06ae-40a2-b172-bc16034e5d32",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, 6.753312, -0.492759]],
          },
        ],
        severity: "medium",
        id: "e47040d1-bae2-4132-87fa-6d00672cb135",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, 1.798355, -0.492757]],
          },
        ],
        severity: "medium",
        id: "840b3491-7784-4f37-9a4b-96cba1116362",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, 1.798355, -0.492757]],
          },
        ],
        severity: "medium",
        id: "d1858faf-7ba0-4c23-924d-61200d56a6a0",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, 1.798356, 0.596427]],
          },
        ],
        severity: "medium",
        id: "8e5c62a2-81e6-4816-a112-dbe28616dd3e",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, 1.798356, 0.596427]],
          },
        ],
        severity: "medium",
        id: "a7dd9635-5d25-4d93-831d-242bc12bee12",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, -3.156486, 0.596427]],
          },
        ],
        severity: "medium",
        id: "63d1631b-6a5e-42d0-826a-76bcbb126cb6",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, -3.156486, 0.596427]],
          },
        ],
        severity: "medium",
        id: "4b5a131c-820f-4fb4-b93f-b6ed3906d4fa",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -1.953159, -0.693461]],
          },
        ],
        severity: "medium",
        id: "ab283f7e-b63b-474f-920d-7e3117df54b3",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -1.953159, -0.693461]],
          },
        ],
        severity: "medium",
        id: "fb9733aa-502f-47c8-a72a-880a742567c8",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -1.953159, -0.829751]],
          },
        ],
        severity: "medium",
        id: "55c4fea5-d26b-49e2-aece-26e1b8142007",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -1.953159, -0.829751]],
          },
        ],
        severity: "medium",
        id: "5d6ed51c-e40a-4bb0-b31e-1c729a52582c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -2.255307, -0.693461]],
          },
        ],
        severity: "medium",
        id: "e6206c14-4d7b-4063-a65c-47ac05057e97",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -2.255307, -0.693461]],
          },
        ],
        severity: "medium",
        id: "9b353e1f-4cf4-4a73-80f9-556ee9bacecf",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -1.150345, -0.693461]],
          },
        ],
        severity: "medium",
        id: "1ea56fa5-34ab-4d2b-9501-69868b917fcc",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -1.150345, -0.693461]],
          },
        ],
        severity: "medium",
        id: "2ddf3b95-eb5d-478c-a696-6c35e59df1e0",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -0.467998, -0.693461]],
          },
        ],
        severity: "medium",
        id: "3bb6f221-6af6-4415-9639-8e9ea692d5c4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -0.467998, -0.693461]],
          },
        ],
        severity: "medium",
        id: "ae1cfbad-628a-47ea-897d-7ef286f943d0",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -0.467998, -1.499663]],
          },
        ],
        severity: "medium",
        id: "e3fba4f1-8b86-4a4e-98e9-e8377bc0e6a1",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -0.467998, -1.499663]],
          },
        ],
        severity: "medium",
        id: "a100bdc5-39ef-4bb6-bd01-f07a696bd034",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -1.150345, -1.191876]],
          },
        ],
        severity: "medium",
        id: "f5d986b0-9acf-4004-9227-1e2e44e95f31",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -1.150345, -1.191876]],
          },
        ],
        severity: "medium",
        id: "024e4a04-40b6-483f-8967-2547e0a17bf5",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 0.334816, -0.693461]],
          },
        ],
        severity: "medium",
        id: "c3fc5d8d-723d-4fa9-816d-0101fb5006ac",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 0.334816, -0.693461]],
          },
        ],
        severity: "medium",
        id: "c31e4f12-2852-4dae-8d11-14203ad9943f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 1.017206, -0.693461]],
          },
        ],
        severity: "medium",
        id: "d2e4c720-a31f-4def-b5d2-f8f3c15633bd",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 1.017206, -0.693461]],
          },
        ],
        severity: "medium",
        id: "aa37b1b3-4a25-46bc-a6de-64232d743f1d",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 1.017206, -2.169596]],
          },
        ],
        severity: "medium",
        id: "b0526df0-99f6-406d-b66a-191b2113d518",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 1.017206, -2.169596]],
          },
        ],
        severity: "medium",
        id: "745bde30-9a4a-41df-b97e-a54e99da6b3b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 0.334816, -1.861789]],
          },
        ],
        severity: "medium",
        id: "349ef346-76a4-41e5-b7c0-c55a180cf881",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 0.334816, -1.861789]],
          },
        ],
        severity: "medium",
        id: "f9066b2b-4a05-4643-a565-138fb7372285",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "5c773d57-8953-4e1c-97bb-52dcd04f29a9",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "4a4e5e7f-c90a-4e69-9a40-6a5b46f9492e",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "8a685949-e675-4352-8c70-9d627a479ef1",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "16ba196e-4199-4318-a23b-bf07a7ac1767",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, -0.492759]],
          },
        ],
        severity: "medium",
        id: "141eb84d-7041-4b16-b061-201bd0aa303a",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, -0.492759]],
          },
        ],
        severity: "medium",
        id: "0032cd07-f7d2-464f-804f-ef645121c324",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, -0.492759]],
          },
        ],
        severity: "medium",
        id: "059568b0-ea57-4d3e-bbe0-bc21a88b19bd",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, -0.492759]],
          },
        ],
        severity: "medium",
        id: "dddbb0d5-8ac7-4eed-b998-34b254dab75a",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, -0.693462]],
          },
        ],
        severity: "medium",
        id: "183bc287-cdb9-446f-b91e-1e63925c3c2d",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, -0.693462]],
          },
        ],
        severity: "medium",
        id: "0215951b-4f47-4a14-9a8f-b698e78849c5",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.753312, -0.492759]],
          },
        ],
        severity: "medium",
        id: "ab347355-5608-40a5-885d-2eb031249933",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.753312, -0.492759]],
          },
        ],
        severity: "medium",
        id: "d6d0172c-c19c-4dcf-a09a-dd72158334c9",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.753312, -0.492759]],
          },
        ],
        severity: "medium",
        id: "96a9748f-7ae0-4ffe-867c-311f30050272",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.753312, -0.492759]],
          },
        ],
        severity: "medium",
        id: "214d36ba-d3c5-4e7c-b9e2-a3db506fbd15",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "ba825e94-98cd-4409-988f-ab693521ac61",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "f2a62f30-98c9-4662-8957-3c1eb1bfecbf",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "514ac56d-f5ad-40d2-ab3b-289dda2522f7",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "558fdb3f-51d5-485f-be6e-3489e62ffedd",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -2.255307, -0.693461]],
          },
        ],
        severity: "medium",
        id: "d569f6d7-3e6c-4091-bd0e-f05136734405",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -2.255307, -0.693461]],
          },
        ],
        severity: "medium",
        id: "6066503b-b0f8-42e6-b214-1fa82d9dd3df",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -1.953202, -0.693461]],
          },
        ],
        severity: "medium",
        id: "59c7748f-adfa-4023-85e5-7cc72f6ee972",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -1.953202, -0.693461]],
          },
        ],
        severity: "medium",
        id: "6f20e054-85af-498c-9478-fe5690f54cb0",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -1.953202, -0.829731]],
          },
        ],
        severity: "medium",
        id: "1ab090f3-a3af-47f8-8ea2-f08ed46a3da5",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, -1.953202, -0.829731]],
          },
        ],
        severity: "medium",
        id: "14b07f89-d64c-4746-8ccf-e1bbf538edde",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.275636, -0.693462]],
          },
        ],
        severity: "medium",
        id: "d05431f0-3c7d-41a8-90d0-403057b717a0",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.275636, -0.693462]],
          },
        ],
        severity: "medium",
        id: "f2f3fb72-f0b2-412a-bba5-431d5549df88",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.275636, -2.218807]],
          },
        ],
        severity: "medium",
        id: "d4e4c33c-a361-403b-8d2d-dc9edd1ca1a9",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.275636, -2.218807]],
          },
        ],
        severity: "medium",
        id: "0261d8ea-dfb2-4df6-832a-8f9a679a173b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, -2.218807]],
          },
        ],
        severity: "medium",
        id: "867b9afb-3b34-46df-bf83-826220a14ed8",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, -2.218807]],
          },
        ],
        severity: "medium",
        id: "7cb9bba5-d4b7-403a-b5a8-e8400a7213f9",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, -2.218807]],
          },
        ],
        severity: "medium",
        id: "471b87dd-c67f-4521-a0ed-6082ee076df3",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -1.953202, 1.829381]],
          },
        ],
        severity: "medium",
        id: "431c50ba-06a7-432c-ac78-d8703ad8bacc",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -1.953202, 1.829381]],
          },
        ],
        severity: "medium",
        id: "5dc4e38b-6d07-4696-9fdc-9c9a2faf852c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -1.953202, 0.596427]],
          },
        ],
        severity: "medium",
        id: "8597093d-f164-4eff-89a6-d964396931ec",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -1.953202, 0.596427]],
          },
        ],
        severity: "medium",
        id: "95a911a8-4611-4fb5-a6c1-5b01504aa8d4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -1.953202, 0.596427]],
          },
        ],
        severity: "medium",
        id: "bf147a8f-af35-45f9-be9b-c7d380451aeb",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -3.156377, 1.829381]],
          },
        ],
        severity: "medium",
        id: "aa5ebee2-9f12-44c7-8485-43fcdb13b995",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -3.156377, 1.829381]],
          },
        ],
        severity: "medium",
        id: "d195c80e-e268-46e1-a118-13508dbfad3e",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -3.156377, 1.829381]],
          },
        ],
        severity: "medium",
        id: "bdc51158-913b-4c48-8484-74d933cfb32c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -3.156378, 0.596427]],
          },
        ],
        severity: "medium",
        id: "cd9cd397-2219-4159-9ec5-19194f8ca570",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -3.156378, 0.596427]],
          },
        ],
        severity: "medium",
        id: "41d21ff6-7c18-4a61-bc76-60b61015bbd5",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 0.334816, -0.693461]],
          },
        ],
        severity: "medium",
        id: "f3faafa3-f904-431c-8699-d285c1ada3d4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 0.334816, -0.693461]],
          },
        ],
        severity: "medium",
        id: "0e8b9c77-4aeb-4b17-8804-90ebcf6d428d",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 1.017206, -0.693461]],
          },
        ],
        severity: "medium",
        id: "27bfad7e-7724-4ddd-bfcd-a0568abf505b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 1.017206, -0.693461]],
          },
        ],
        severity: "medium",
        id: "8d07d9c5-aa6d-4cbc-a2aa-58234d3ef767",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 1.017206, -2.169596]],
          },
        ],
        severity: "medium",
        id: "a1555e33-c49c-4ceb-8a75-60bc4b68dd27",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 1.017206, -2.169596]],
          },
        ],
        severity: "medium",
        id: "c785b4e0-577d-422e-996f-482943480bcf",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 0.334816, -1.861789]],
          },
        ],
        severity: "medium",
        id: "9013e92b-9a29-4fb3-8546-b98d93f38327",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 0.334816, -1.861789]],
          },
        ],
        severity: "medium",
        id: "8a4b43f0-f9dd-455e-bf5e-f730b822726e",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.753312, 1.829379]],
          },
        ],
        severity: "medium",
        id: "95b11098-be8b-43ff-a8d3-c7a44fc7d8bd",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.753312, 1.829379]],
          },
        ],
        severity: "medium",
        id: "a7f4da64-01db-43f2-966e-5fe1222ba00b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.753312, 0.596425]],
          },
        ],
        severity: "medium",
        id: "67ad170d-4b97-4686-a81a-f60da89a660d",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.753312, 0.596425]],
          },
        ],
        severity: "medium",
        id: "e33d72ca-ad16-4d8a-ac26-08d5c686aeba",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.753312, 0.596425]],
          },
        ],
        severity: "medium",
        id: "2fac9c0e-1841-4392-be7a-4e263817638c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 6.753312, 0.596425]],
          },
        ],
        severity: "medium",
        id: "02adfcca-113d-4ade-a0d7-fd4490f769a9",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, 1.829379]],
          },
        ],
        severity: "medium",
        id: "3c94ee05-7e5f-4a5b-b6a2-09916b36df94",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, 1.829379]],
          },
        ],
        severity: "medium",
        id: "983f6965-8ffb-40f8-a1d6-0e3a701840af",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, 0.596425]],
          },
        ],
        severity: "medium",
        id: "5a5fcaa5-4e4b-4995-bb51-217ef9a67453",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, 0.596425]],
          },
        ],
        severity: "medium",
        id: "3822c3ef-1385-445c-b83a-1b98ee4f4d76",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, 0.596425]],
          },
        ],
        severity: "medium",
        id: "d06b0508-17a9-4328-b71f-0a186ea4c38b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 6.753312, 0.596425]],
          },
        ],
        severity: "medium",
        id: "e8408935-3820-40af-a356-c9b5743eb5a0",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.753312, 1.829379]],
          },
        ],
        severity: "medium",
        id: "454e505a-0347-4c29-adf6-8d15070f2e00",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.753312, 1.829379]],
          },
        ],
        severity: "medium",
        id: "5396d2b2-bade-4064-87cc-64e4d3cb2a69",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.753312, 1.829379]],
          },
        ],
        severity: "medium",
        id: "bee2439a-8edc-4568-86dc-936880909312",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.275636, 1.829379]],
          },
        ],
        severity: "medium",
        id: "331105f4-be79-453b-99bb-28cf0e44dfd2",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.275636, 1.829379]],
          },
        ],
        severity: "medium",
        id: "a87986b3-aed3-43be-9a9e-578ddfdb2c89",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.275636, 0.596426]],
          },
        ],
        severity: "medium",
        id: "a2daf05b-2a22-49b3-8c6e-d2fd02e549e6",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.275636, 0.596426]],
          },
        ],
        severity: "medium",
        id: "fa69965d-5f14-4bc0-bc20-97e74fad07dc",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.275636, 0.596426]],
          },
        ],
        severity: "medium",
        id: "bbf23467-adf8-4ac1-a457-1dc85982a35e",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.275636, 1.227269]],
          },
        ],
        severity: "medium",
        id: "f657309b-3bb7-48a4-b0c8-329b067b2795",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 6.275636, 1.227269]],
          },
        ],
        severity: "medium",
        id: "e0b80184-b562-4153-acd8-d7e12f4192f6",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -1.953202, 1.227271]],
          },
        ],
        severity: "medium",
        id: "8eb8cf7e-9578-490b-9fad-6de5844734d4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -1.953202, 1.227271]],
          },
        ],
        severity: "medium",
        id: "df553dd3-4b71-46c7-b42a-29914885473f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 5.472823, 1.829379]],
          },
        ],
        severity: "medium",
        id: "316f672c-eab3-4df1-a744-5b145816f756",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 5.472823, 1.829379]],
          },
        ],
        severity: "medium",
        id: "b83cbc67-3f10-40b2-9a13-1db9f338cfce",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 5.472823, 1.22727]],
          },
        ],
        severity: "medium",
        id: "f625d4f1-f49e-4f2b-8588-de3bc2241ff8",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 5.472823, 1.22727]],
          },
        ],
        severity: "medium",
        id: "af8dfc00-516e-47f1-8595-e1d58a75e3b4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 4.791205, 1.829379]],
          },
        ],
        severity: "medium",
        id: "f5786b60-cf08-4a60-870b-4a55eeb0e428",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 4.791205, 1.829379]],
          },
        ],
        severity: "medium",
        id: "31296732-ddfa-43fe-a1d1-6c254f92e8a4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 4.791205, 1.22727]],
          },
        ],
        severity: "medium",
        id: "1b6b89f1-8ccb-4580-a2e5-f828ba1505ff",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 4.791205, 1.22727]],
          },
        ],
        severity: "medium",
        id: "e43924aa-9029-459b-81c5-554d96d55c6d",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 3.988392, 1.82938]],
          },
        ],
        severity: "medium",
        id: "dc250d36-ffff-44ca-b208-911b120b4098",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 3.988392, 1.82938]],
          },
        ],
        severity: "medium",
        id: "2e4cbd5d-f788-4b98-87af-d90e1d760b8a",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 3.988391, 1.22727]],
          },
        ],
        severity: "medium",
        id: "99c2cf19-355c-472a-9470-a2102f3f0992",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 3.988391, 1.22727]],
          },
        ],
        severity: "medium",
        id: "300a6d39-9d4f-40c4-8ea4-9dfb6f2fba05",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 3.305226, 1.829381]],
          },
        ],
        severity: "medium",
        id: "31964d6d-3697-47d3-bc1d-01232689b1c3",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 3.305226, 1.829381]],
          },
        ],
        severity: "medium",
        id: "6f6cbe4b-42b3-441a-9874-2814edbe64d6",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 3.305226, 1.22727]],
          },
        ],
        severity: "medium",
        id: "e72caee1-8de9-4817-9a40-43b74156a4ac",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 3.305226, 1.22727]],
          },
        ],
        severity: "medium",
        id: "acfa8641-96d4-46b3-a6d4-607f405f42fa",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 2.502413, 1.829381]],
          },
        ],
        severity: "medium",
        id: "7131ec8e-2ff1-46ab-ad55-aaefeb0c48bd",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 2.502413, 1.829381]],
          },
        ],
        severity: "medium",
        id: "62a97bc9-ee8d-4130-9b05-3777272b529d",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 2.502413, 1.227271]],
          },
        ],
        severity: "medium",
        id: "3d260ea3-4dcb-4304-a6d4-b8df539aaebf",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 2.502413, 1.227271]],
          },
        ],
        severity: "medium",
        id: "0c383ac8-c74e-47d4-9e8a-0e9ede832e0e",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 1.82002, 1.829381]],
          },
        ],
        severity: "medium",
        id: "b444caaf-4624-402e-b1ca-229ee20b5716",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 1.82002, 1.829381]],
          },
        ],
        severity: "medium",
        id: "f2385884-23de-4923-b9ab-3631f991d998",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 1.82002, 1.227271]],
          },
        ],
        severity: "medium",
        id: "e2f427c1-cbe0-4313-9b61-cbcd2723f736",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 1.82002, 1.227271]],
          },
        ],
        severity: "medium",
        id: "ab610091-5e1b-4604-9be2-1fb325aa91c4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 1.017206, 1.829381]],
          },
        ],
        severity: "medium",
        id: "69cebc6e-d3f3-4673-becc-d88c9a166158",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 1.017206, 1.829381]],
          },
        ],
        severity: "medium",
        id: "69ecfbd2-c52c-48ee-bb52-ad02068c63ac",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 1.017206, 1.227271]],
          },
        ],
        severity: "medium",
        id: "6dd920f3-fd65-4f64-a3b9-7d384899d3ab",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 1.017206, 1.227271]],
          },
        ],
        severity: "medium",
        id: "857402a0-a106-47c5-b3f8-805ca271f01f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 0.334816, 1.829381]],
          },
        ],
        severity: "medium",
        id: "021a973c-2977-4402-a7f6-2d2216ed4004",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 0.334816, 1.829381]],
          },
        ],
        severity: "medium",
        id: "b2838d2d-cde1-4292-b7a2-bb60fae18827",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 0.334816, 1.227271]],
          },
        ],
        severity: "medium",
        id: "dccd753e-1c58-401c-99e2-3d4537acd660",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, 0.334816, 1.227271]],
          },
        ],
        severity: "medium",
        id: "631aefd6-4224-4fda-a9c4-608a1a035eca",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, 6.753312, 0.596425]],
          },
        ],
        severity: "medium",
        id: "346447e3-75d3-43dd-9364-6106ef2089be",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, 6.753312, 0.596425]],
          },
        ],
        severity: "medium",
        id: "da5ecc9e-43f3-4ff3-82c9-5fe94346bb35",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, 6.753312, 0.596425]],
          },
        ],
        severity: "medium",
        id: "50158077-9bb4-4959-8698-6217425f8d1f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -0.467997, 1.829381]],
          },
        ],
        severity: "medium",
        id: "9b3560aa-48cb-4f4b-ab45-3c4ea7e5a6cc",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -0.467997, 1.829381]],
          },
        ],
        severity: "medium",
        id: "7a0be5af-bb20-4bd3-8a36-4fd7618e2d65",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -0.467997, 1.227271]],
          },
        ],
        severity: "medium",
        id: "c5e28b69-3308-4002-8582-5e117854488f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -0.467997, 1.227271]],
          },
        ],
        severity: "medium",
        id: "c6ded86d-ca82-45c6-9ec9-72e1dbd4f84f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -1.150388, 1.829381]],
          },
        ],
        severity: "medium",
        id: "75aaebd5-1f07-4c5e-8720-d27ca11964c1",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -1.150388, 1.829381]],
          },
        ],
        severity: "medium",
        id: "4955148c-d22e-4d52-8750-a9b63abb437f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -1.150388, 1.227271]],
          },
        ],
        severity: "medium",
        id: "5899a803-dc7f-4954-860e-a3d688a00f91",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -1.150388, 1.227271]],
          },
        ],
        severity: "medium",
        id: "e9e6e401-c073-4ed6-8dbb-749df0e286c2",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.765861, -3.518803, 0.430479]],
          },
        ],
        severity: "medium",
        id: "eb9e9107-e6e6-4a25-b6be-fe3a0724613d",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.765861, -3.518803, 0.430479]],
          },
        ],
        severity: "medium",
        id: "273a359b-d732-432a-ad16-17e2b0a5ee44",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.765861, -3.518803, -0.211772]],
          },
        ],
        severity: "medium",
        id: "6b2dde01-00ee-44d6-9c89-ecdd242f6e4c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.765861, -3.518803, -0.211772]],
          },
        ],
        severity: "medium",
        id: "1741c200-5a6a-4897-b395-30bfab7809a5",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.043329, -3.518803, 0.430479]],
          },
        ],
        severity: "medium",
        id: "d7732540-c16b-44fe-be5a-96442a7713d4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.043329, -3.518803, 0.430479]],
          },
        ],
        severity: "medium",
        id: "b8263f2f-c273-48ba-b408-330dc804333c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.043329, -3.518803, -0.211772]],
          },
        ],
        severity: "medium",
        id: "c70a0391-de46-49ed-8b38-99c85e505966",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.043329, -3.518803, -0.211772]],
          },
        ],
        severity: "medium",
        id: "a6599fbb-71da-48ec-972f-2f0126d6a1c2",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -3.156378, -0.492757]],
          },
        ],
        severity: "medium",
        id: "41af2162-93ce-4c7b-a7ba-304ef140a0a2",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -3.156378, -0.492757]],
          },
        ],
        severity: "medium",
        id: "42f88acb-49e5-468e-bf67-bcb053fec08f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -3.156378, -0.492757]],
          },
        ],
        severity: "medium",
        id: "1913ee33-9360-4ad6-9c9d-4ac918813e91",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.767945, -3.396895, 1.829381]],
          },
        ],
        severity: "medium",
        id: "3f51f295-f32d-4976-baad-00ee3ab6abd6",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.767945, -3.396895, 1.829381]],
          },
        ],
        severity: "medium",
        id: "0f8a3fdf-0fc6-4d71-828b-8b57059a75a1",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.767945, -3.396895, 1.829381]],
          },
        ],
        severity: "medium",
        id: "4d0d0247-6436-4ae5-a34e-1279231c7df8",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.767945, -3.396895, -0.492757]],
          },
        ],
        severity: "medium",
        id: "d4cd8837-1f0b-4760-9c74-50ae1b94c64c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.767945, -3.396895, -0.492757]],
          },
        ],
        severity: "medium",
        id: "ff304b0e-4d70-44b4-bd70-9edf454c94dd",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.767945, -3.396895, -0.492757]],
          },
        ],
        severity: "medium",
        id: "0b38fa05-2f82-4d72-a803-b94a4a3cc262",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.2733, -3.592237, 1.829381]],
          },
        ],
        severity: "medium",
        id: "04b0efff-16a1-4b03-888f-44a366925d60",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.2733, -3.592237, 1.829381]],
          },
        ],
        severity: "medium",
        id: "46c9bfdd-2d73-47a7-8f9b-f3435f6c3d46",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.2733, -3.592237, 1.829381]],
          },
        ],
        severity: "medium",
        id: "4621a834-77c3-4814-a54b-d10d0b1f3b6f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.2733, -3.592237, -0.492757]],
          },
        ],
        severity: "medium",
        id: "16eab0cd-53a7-484f-a725-cbedb8473d95",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.2733, -3.592237, -0.492757]],
          },
        ],
        severity: "medium",
        id: "d5d7828c-562c-4330-a000-8fa8fdb678f4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.2733, -3.592237, -0.492757]],
          },
        ],
        severity: "medium",
        id: "db65fa88-f569-485a-96fe-057d93eeebe9",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.766713, -3.754105, 1.829381]],
          },
        ],
        severity: "medium",
        id: "425dd398-6888-4872-acbe-c94b46deae24",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.766713, -3.754105, 1.829381]],
          },
        ],
        severity: "medium",
        id: "e2c05bf5-0bac-4662-8dd8-ace40f8493e7",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.766713, -3.754105, 1.829381]],
          },
        ],
        severity: "medium",
        id: "5cffbdfb-c049-42ba-a964-e8ac0807b5f7",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.766713, -3.754105, 0.303729]],
          },
        ],
        severity: "medium",
        id: "a23aa364-6fe6-4d2b-8539-5bbd9bdd386b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.766713, -3.754105, 0.303729]],
          },
        ],
        severity: "medium",
        id: "236a78c2-92de-4a16-88b2-fb3f111ffdd2",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.766713, -3.754105, 0.303729]],
          },
        ],
        severity: "medium",
        id: "5d570eeb-35cf-4deb-869d-6417818c36f4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.250446, -3.881776, 1.829381]],
          },
        ],
        severity: "medium",
        id: "7175f93c-a2b6-4ce0-b478-94c8f714f715",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.250446, -3.881776, 1.829381]],
          },
        ],
        severity: "medium",
        id: "8ed1b3b8-d98f-4126-af0a-a17335825ce3",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.250446, -3.881776, 1.829381]],
          },
        ],
        severity: "medium",
        id: "b4891a6f-b5db-4ba4-b5c8-45e010170f62",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.250446, -3.881776, 0.361317]],
          },
        ],
        severity: "medium",
        id: "d73edcdc-ce5d-4bfe-951f-dc62d107fc60",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.250446, -3.881776, 0.361317]],
          },
        ],
        severity: "medium",
        id: "38bcaaad-41dd-452c-98c4-a7e0c249e9ad",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.250446, -3.881776, 0.361317]],
          },
        ],
        severity: "medium",
        id: "be8d1402-3db4-4267-8f36-45b39bb5b8c3",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.726804, -3.974676, 1.829381]],
          },
        ],
        severity: "medium",
        id: "a10509a1-f807-4478-aae2-64c84807dce8",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.726804, -3.974676, 1.829381]],
          },
        ],
        severity: "medium",
        id: "8195a570-46f0-4e0e-93a4-960f136e3a95",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.726804, -3.974676, 1.829381]],
          },
        ],
        severity: "medium",
        id: "ecced033-a479-415c-b765-b74118886f53",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.726804, -3.974676, 0.403222]],
          },
        ],
        severity: "medium",
        id: "6c07652a-5390-4e46-bfb3-830e1d55c36b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.726804, -3.974676, 0.403222]],
          },
        ],
        severity: "medium",
        id: "31ded0fb-6e25-4fe1-b2c4-5c71acf1dfeb",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.726804, -3.974676, 0.403222]],
          },
        ],
        severity: "medium",
        id: "caf211c1-eca9-45e6-a5fc-1e9bc14d4b76",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.198126, -4.032395, 1.829381]],
          },
        ],
        severity: "medium",
        id: "0925e918-a023-4173-b231-814a3882cbc3",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.198126, -4.032395, 1.829381]],
          },
        ],
        severity: "medium",
        id: "c93aa363-938c-42e3-a37a-8f1607006966",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.198126, -4.032395, 1.829381]],
          },
        ],
        severity: "medium",
        id: "5dc1dd76-fd27-4206-bc21-e99b79e5302d",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.198126, -4.032395, 0.550901]],
          },
        ],
        severity: "medium",
        id: "f7f76fce-71de-4abe-a8a9-57b3d65819ae",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.198126, -4.032395, 0.550901]],
          },
        ],
        severity: "medium",
        id: "659d905f-93c2-47de-bd14-653f8829daea",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.198126, -4.032395, 0.550901]],
          },
        ],
        severity: "medium",
        id: "e87d8971-9d4c-40f2-927d-14341f060480",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.375643, -4.013014, 0.550901]],
          },
        ],
        severity: "medium",
        id: "0c26c049-52a2-483a-be10-3d54dab7f37a",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.375643, -4.013014, 0.550901]],
          },
        ],
        severity: "medium",
        id: "07837840-0dee-4656-bf19-12d3d9ea1eb9",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.375643, -4.013014, 0.550901]],
          },
        ],
        severity: "medium",
        id: "1d859315-69b1-478b-b098-cf2dd3900266",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.424492, -4.007681, -0.492757]],
          },
        ],
        severity: "medium",
        id: "04176a76-8a01-494b-b51a-441fd5c03b93",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.424492, -4.007681, -0.492757]],
          },
        ],
        severity: "medium",
        id: "fdb1e0dc-1b31-4e19-bd34-4ad10f79b552",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.424492, -4.007681, -0.492757]],
          },
        ],
        severity: "medium",
        id: "3c0e55a8-277f-41d5-9682-a49203108360",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.424492, -4.007681, 0.41811]],
          },
        ],
        severity: "medium",
        id: "b1ea1db4-8452-4a44-8a80-2a4c5f34f193",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.424492, -4.007681, 0.41811]],
          },
        ],
        severity: "medium",
        id: "d376d35c-7050-45a9-a7b3-5099be4d0c54",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.424492, -4.007681, 0.41811]],
          },
        ],
        severity: "medium",
        id: "7ef93fa2-aedf-4f01-a26c-741562674afd",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.375643, -4.013014, -0.492757]],
          },
        ],
        severity: "medium",
        id: "257827fb-6739-4ff2-9bcb-10dcdfc77e8f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.375643, -4.013014, -0.492757]],
          },
        ],
        severity: "medium",
        id: "aa2dd52d-c496-41a9-a332-eba2a9486938",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.375643, -4.013014, -0.492757]],
          },
        ],
        severity: "medium",
        id: "03ba55c6-64b1-48e0-969e-b7c8608b7914",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.333226, -4.054675, 1.829381]],
          },
        ],
        severity: "medium",
        id: "72075863-1137-466d-9601-d7b9af33e582",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.333226, -4.054675, 1.829381]],
          },
        ],
        severity: "medium",
        id: "3486a0ac-9b08-4c01-b2b9-4a881bf5e712",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.333226, -4.054675, 1.829381]],
          },
        ],
        severity: "medium",
        id: "c06dc6ab-6abb-408b-89dc-bddde1b886ed",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.333226, -4.054675, 0.550901]],
          },
        ],
        severity: "medium",
        id: "769e53ba-a6ae-4336-8f46-6bb21adc237e",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.333226, -4.054675, 0.550901]],
          },
        ],
        severity: "medium",
        id: "816f0c74-14c1-49f2-9989-b19631a98fc4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.333226, -4.054675, 0.550901]],
          },
        ],
        severity: "medium",
        id: "f8693724-4d9e-4ca3-a094-3012b6a3650b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.510528, -4.054203, 1.829381]],
          },
        ],
        severity: "medium",
        id: "8e0f905f-21d1-42b6-ae6b-45ede0c587d9",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.510528, -4.054203, 1.829381]],
          },
        ],
        severity: "medium",
        id: "3065156b-b7ad-4a51-83f6-32ca82fb8ea9",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.510528, -4.054203, 1.829381]],
          },
        ],
        severity: "medium",
        id: "4145f559-609f-4515-8380-fe2e45eb975c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.510528, -4.054203, 0.550901]],
          },
        ],
        severity: "medium",
        id: "5b46c6a5-6574-4235-8c6d-37f3602bbca4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.510528, -4.054203, 0.550901]],
          },
        ],
        severity: "medium",
        id: "b892a0e5-8333-445e-822b-5c459eb65c35",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.510528, -4.054203, 0.550901]],
          },
        ],
        severity: "medium",
        id: "bd5743f6-4c70-463c-aca1-2ce7b8fc7f5f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.041754, -4.029099, 1.829381]],
          },
        ],
        severity: "medium",
        id: "b8cac6cf-9b37-4036-8386-147f3579e3b4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.041754, -4.029099, 1.829381]],
          },
        ],
        severity: "medium",
        id: "e6824ae6-54ef-4447-b9f3-e79e7cb7377a",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.041754, -4.029099, 1.829381]],
          },
        ],
        severity: "medium",
        id: "2373cb10-c956-4d8e-bb03-eb81685f0cd0",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.041754, -4.029099, 0.550901]],
          },
        ],
        severity: "medium",
        id: "90fd1d16-0e0d-456c-afca-b7b263343711",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.041754, -4.029099, 0.550901]],
          },
        ],
        severity: "medium",
        id: "886b5234-d520-4767-a871-160786bf1f03",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.041754, -4.029099, 0.550901]],
          },
        ],
        severity: "medium",
        id: "e71ca11f-a676-42dc-889c-305d96725e98",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.570118, -3.96857, 1.829381]],
          },
        ],
        severity: "medium",
        id: "77887365-22ff-4a29-b08e-713e99a6f6a0",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.570118, -3.96857, 1.829381]],
          },
        ],
        severity: "medium",
        id: "ef644afa-7e5f-4817-b208-7c49b87d3f36",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.570118, -3.96857, 1.829381]],
          },
        ],
        severity: "medium",
        id: "a3d470fc-dea6-45e3-a78c-c0c0fc74ef72",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.093258, -3.872885, 1.829381]],
          },
        ],
        severity: "medium",
        id: "ade591b1-05cc-40cb-986c-7aeb4f696b7c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.093258, -3.872885, 1.829381]],
          },
        ],
        severity: "medium",
        id: "2d48d8b0-27fd-4f52-9fad-cac14602bdc4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.093258, -3.872885, 1.829381]],
          },
        ],
        severity: "medium",
        id: "4488e0b7-087c-4135-89c1-d1863a0aeee7",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.093258, -3.872885, 0.357307]],
          },
        ],
        severity: "medium",
        id: "036c20e7-48bb-452c-81e8-ec5be29e882f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.093258, -3.872885, 0.357307]],
          },
        ],
        severity: "medium",
        id: "80b19356-5452-4f40-968b-b0d2dfe1e628",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.093258, -3.872885, 0.357307]],
          },
        ],
        severity: "medium",
        id: "b9fdb67f-7672-4766-87e9-2419f9539b1b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.570118, -3.96857, 0.400467]],
          },
        ],
        severity: "medium",
        id: "b86f006f-f13e-40e6-ad9e-0edcc5545bfa",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.570118, -3.96857, 0.400467]],
          },
        ],
        severity: "medium",
        id: "28b55b13-42ef-44ef-abb9-e723712f5c7b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.570118, -3.96857, 0.400467]],
          },
        ],
        severity: "medium",
        id: "620c3cac-683d-475d-914b-35b315a6588b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.60884, -3.742472, 1.829381]],
          },
        ],
        severity: "medium",
        id: "346cf861-06ce-4ba9-a437-9fdfb7afeab1",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.60884, -3.742472, 1.829381]],
          },
        ],
        severity: "medium",
        id: "288f13f7-0aae-4c63-a3e7-4b835250c49d",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.60884, -3.742472, 1.829381]],
          },
        ],
        severity: "medium",
        id: "a604c9e2-a009-4499-ae55-f4569aeba048",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.60884, -3.742472, 0.298482]],
          },
        ],
        severity: "medium",
        id: "fd0dcc0d-a8b4-4c96-ac97-4c08401b0bb1",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.60884, -3.742472, 0.298482]],
          },
        ],
        severity: "medium",
        id: "424c99c4-9332-4a9e-a627-47bf0a59dca6",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.60884, -3.742472, 0.298482]],
          },
        ],
        severity: "medium",
        id: "01ad7ee0-ad06-40fc-9432-8e6d06735ca9",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.114559, -3.577914, 1.829381]],
          },
        ],
        severity: "medium",
        id: "e2fa0ace-f5b9-409a-a372-a3ae03fe0f9f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.114559, -3.577914, 1.829381]],
          },
        ],
        severity: "medium",
        id: "dbba3953-8886-48c1-ad70-a531e97dd969",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.114559, -3.577914, 1.829381]],
          },
        ],
        severity: "medium",
        id: "09c0fc43-9cd5-443f-8430-db1f54a3dfa4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.114559, -3.577914, -0.492757]],
          },
        ],
        severity: "medium",
        id: "585677a0-12d5-4edf-9bb0-38c24713d79f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.114559, -3.577914, -0.492757]],
          },
        ],
        severity: "medium",
        id: "8e4e8bec-dd37-4995-a6a2-7123e0cc6ce9",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.114559, -3.577914, -0.492757]],
          },
        ],
        severity: "medium",
        id: "eff17810-90ed-4529-a229-02dfaa18194d",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, -3.703412, -0.492757]],
          },
        ],
        severity: "medium",
        id: "5da5219d-a7e7-4ba5-8d2d-e9d19c498485",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, -3.703412, -0.492757]],
          },
        ],
        severity: "medium",
        id: "783ad75b-5646-4561-9428-df424905094a",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, -3.703412, -0.492757]],
          },
        ],
        severity: "medium",
        id: "bdd540c5-84a4-41e0-aaa5-7644955f6219",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, -3.703412, 0.280862]],
          },
        ],
        severity: "medium",
        id: "26142d30-572e-469f-98fe-589be6d58629",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, -3.703412, 0.280862]],
          },
        ],
        severity: "medium",
        id: "781c7cd3-6b6e-4d47-9439-d987bdad72a2",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, -3.703412, 0.280862]],
          },
        ],
        severity: "medium",
        id: "0ff040fd-1410-4407-97fc-c5cbb4c29b71",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.608159, -3.379944, 1.829381]],
          },
        ],
        severity: "medium",
        id: "b0b1e792-00d7-4bd0-b3ea-af7eea839369",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.608159, -3.379944, 1.829381]],
          },
        ],
        severity: "medium",
        id: "76cd44e1-1041-4855-9135-d527e34fc6fd",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.608159, -3.379944, 1.829381]],
          },
        ],
        severity: "medium",
        id: "5f1420bf-ae73-4b07-b8fb-4d2a1611aa57",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.608159, -3.379944, -0.492757]],
          },
        ],
        severity: "medium",
        id: "66807227-fa9b-4061-b1fd-57eb7a67b4be",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.608159, -3.379944, -0.492757]],
          },
        ],
        severity: "medium",
        id: "a3f27b96-d708-47a3-aefe-968220748c50",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.608159, -3.379944, -0.492757]],
          },
        ],
        severity: "medium",
        id: "f1de27da-801c-46ca-ac30-2d98d4c7187d",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, -3.156486, -0.492757]],
          },
        ],
        severity: "medium",
        id: "fdba1483-ccb0-4a44-a1b4-bd3ae77c3988",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, -3.156486, -0.492757]],
          },
        ],
        severity: "medium",
        id: "ff27c428-bae8-4a06-921a-962583b9cff7",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, -3.156486, -0.492757]],
          },
        ],
        severity: "medium",
        id: "3017f181-8744-4d4e-a210-2c9c322f2a28",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, -3.70275, 0.280564]],
          },
        ],
        severity: "medium",
        id: "7f9395c5-1315-44d7-a5af-c1a806e1ea49",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, -3.70275, 0.280564]],
          },
        ],
        severity: "medium",
        id: "9648a361-78e8-4ef7-baa6-7c9fd9d4874d",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, -3.70275, 0.280564]],
          },
        ],
        severity: "medium",
        id: "7ed4533c-f7d2-405b-9ecf-43146155cef5",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, -3.70275, -0.492757]],
          },
        ],
        severity: "medium",
        id: "d5bf645c-0e16-467b-94cf-04e797cfeb58",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, -3.70275, -0.492757]],
          },
        ],
        severity: "medium",
        id: "fa6d3a4c-bfa0-4fd3-8a1e-92ea99f5a8d3",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, -3.70275, -0.492757]],
          },
        ],
        severity: "medium",
        id: "41bd0741-655c-489f-95ef-8c696a36cd97",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.281824, -4.001596, 0.415365]],
          },
        ],
        severity: "medium",
        id: "dd2f0c28-b8b9-4b6f-a896-ce022469d9ba",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.281824, -4.001596, 0.415365]],
          },
        ],
        severity: "medium",
        id: "236c3108-7661-4a79-9f55-c80ccbad85b2",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.281824, -4.001596, 0.415365]],
          },
        ],
        severity: "medium",
        id: "8db9c219-13f1-48f9-a947-0f8e801af970",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.215362, -4.009211, 0.550901]],
          },
        ],
        severity: "medium",
        id: "8bbb6c67-8c5f-4ea1-83ba-f0030800712e",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.215362, -4.009211, 0.550901]],
          },
        ],
        severity: "medium",
        id: "5f4c8657-bea2-4f23-82e6-b0c32daed4ec",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.215362, -4.009211, 0.550901]],
          },
        ],
        severity: "medium",
        id: "f12c547a-f563-4c51-beb1-6b4f7e0881e0",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.215362, -4.009211, -0.492757]],
          },
        ],
        severity: "medium",
        id: "e2cd7759-0113-462f-907d-72e7e32bc467",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.215362, -4.009211, -0.492757]],
          },
        ],
        severity: "medium",
        id: "52f4bf60-0343-4f71-ac17-71491b5d1dd3",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.215362, -4.009211, -0.492757]],
          },
        ],
        severity: "medium",
        id: "3b42367d-f2ba-4554-8497-617b5b6c57a2",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.281824, -4.001596, -0.492757]],
          },
        ],
        severity: "medium",
        id: "dea84ef1-c405-46c0-8058-d2b6a1e5eb83",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.281824, -4.001596, -0.492757]],
          },
        ],
        severity: "medium",
        id: "afe9ce76-7a45-4cbc-81ae-cc5dd9fcf88c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.281824, -4.001596, -0.492757]],
          },
        ],
        severity: "medium",
        id: "7766ac7d-21a4-486a-9ca3-7c6a8a6dab0d",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.424492, -2.700256, -0.171632]],
          },
        ],
        severity: "medium",
        id: "c6892ac7-f4eb-4d18-ba7f-6a5fa2ef4e1b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.424492, -2.700256, -0.171632]],
          },
        ],
        severity: "medium",
        id: "a12e3482-4acd-4121-80e2-6ff1e73ca01c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.424492, -2.700256, -0.171632]],
          },
        ],
        severity: "medium",
        id: "2eb7347e-90fb-4157-8e56-6e78176b778f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.424492, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "f4acf55f-7809-4ef5-9616-6ab56cce38e9",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.424492, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "39967e24-a4fa-4f2e-a198-ca8ca0f9cfe4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.424492, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "a915bce5-f754-45ea-9582-704d3647b494",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.281824, -2.700256, -0.171632]],
          },
        ],
        severity: "medium",
        id: "6d886c87-40f4-4f2f-83a8-bc146504b627",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.281824, -2.700256, -0.171632]],
          },
        ],
        severity: "medium",
        id: "f14a0dbb-538a-4ea6-b7ee-b1291dbe6d76",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.281824, -2.700256, -0.171632]],
          },
        ],
        severity: "medium",
        id: "ea265b04-9511-4cc2-9cfb-6ad466bdbb73",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.281824, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "51b4e1fc-a6b5-41d9-90a8-3aa8ca718278",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.281824, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "7ef80760-1849-49f4-be55-5d931eaaf3a7",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.281824, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "9457da2d-f1ea-4dff-943c-65a167fbf14a",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, -2.700256, -0.171632]],
          },
        ],
        severity: "medium",
        id: "d1ea3d5f-b995-4fd8-9722-0938e5a3173c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, -2.700256, -0.171632]],
          },
        ],
        severity: "medium",
        id: "a4b388c2-ba44-4dc7-aa6f-0c309a71737b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, -2.700256, -0.171632]],
          },
        ],
        severity: "medium",
        id: "525de1e9-6f11-464e-8a2d-1174a2d01f5d",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, -2.700256, -0.171632]],
          },
        ],
        severity: "medium",
        id: "a7eb4fa9-1d88-4446-8b82-0091b5121da5",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "a8b6451f-bc07-4c81-b910-0698f66b842e",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "6be18b8d-8ad1-40a9-b05f-460a73560585",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "b34a9017-465b-4c9d-bf3a-67c9e96aa0f4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "e07a6c54-0c3e-47e1-a9e6-4afd35681946",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, -2.700256, -0.171632]],
          },
        ],
        severity: "medium",
        id: "5cd679b9-0364-4c2d-a50a-b3663c517923",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, -2.700256, -0.171632]],
          },
        ],
        severity: "medium",
        id: "c0288175-a295-4f36-a210-6ce59bbd2c62",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, -2.700256, -0.171632]],
          },
        ],
        severity: "medium",
        id: "89f06436-fdae-436e-8c9c-7e4d9005d89b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, -2.700256, -0.171632]],
          },
        ],
        severity: "medium",
        id: "f6988426-c24a-452e-b9df-673d138c3968",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "aa33e3e0-afd9-48fb-8867-5856faf87e20",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "b05866c2-10da-4144-8bd7-2b03275119d6",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "cd425f24-a414-43ff-9f51-7047ef1fd8cf",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "dea5567c-7404-44b9-b535-ab432f84a37b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, 0.687219, -1.699622]],
          },
        ],
        severity: "medium",
        id: "a07326e8-56fb-4448-9f93-dcbb66b2d0c3",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, 0.687219, -1.699622]],
          },
        ],
        severity: "medium",
        id: "c3b91aea-7a4b-4502-86c0-931320724461",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, 0.687219, -1.699622]],
          },
        ],
        severity: "medium",
        id: "3b20f194-9c54-4fa8-bfa2-556bb8d15412",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, 0.687218, -2.020748]],
          },
        ],
        severity: "medium",
        id: "3bdbc2ed-1767-4ae6-98ff-4bc6dd2477f1",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, 0.687218, -2.020748]],
          },
        ],
        severity: "medium",
        id: "0d8a181e-7a5a-4f0f-a9de-a25d69377fad",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, 0.687218, -2.020748]],
          },
        ],
        severity: "medium",
        id: "39ee92ad-53fc-4b4a-9ff8-bbcc1e3c58df",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, 0.687219, -1.699622]],
          },
        ],
        severity: "medium",
        id: "436b41da-8d9c-43a8-b170-ffa98ca94a4b",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, 0.687219, -1.699622]],
          },
        ],
        severity: "medium",
        id: "2e6ce88e-8ac5-4b76-99ea-67c9f33e4127",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, 0.687219, -1.699622]],
          },
        ],
        severity: "medium",
        id: "0779b887-235e-40ca-899a-dfef8d975ae9",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, 0.687218, -2.020748]],
          },
        ],
        severity: "medium",
        id: "80310746-3042-473b-8827-0ea08afc8c77",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, 0.687218, -2.020748]],
          },
        ],
        severity: "medium",
        id: "1ddae03a-e90b-4983-9e81-3cc63ac20b30",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, 0.687218, -2.020748]],
          },
        ],
        severity: "medium",
        id: "b47ebadf-8218-45e0-9977-e3d25dffc0f3",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 1.126304, -2.218807]],
          },
        ],
        severity: "medium",
        id: "b4e9c29a-e344-4ad1-993f-ed974c8ca7b6",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 1.126304, -2.218807]],
          },
        ],
        severity: "medium",
        id: "be288618-734d-48be-8568-675023e3219f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-2.409125, 1.126304, -2.218807]],
          },
        ],
        severity: "medium",
        id: "a9e69d9f-328e-4bad-856c-e710e948eaea",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, 1.126304, -2.218807]],
          },
        ],
        severity: "medium",
        id: "53d3f857-d679-4a9c-85f9-827b8c14a2c6",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-1.927437, 1.126304, -2.218807]],
          },
        ],
        severity: "medium",
        id: "35c7b360-1326-4fe9-927c-35b6eada1668",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, 1.126304, -2.218807]],
          },
        ],
        severity: "medium",
        id: "48128eac-ebba-4f97-98b9-489a718adea4",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[2.728881, 1.126304, -2.218807]],
          },
        ],
        severity: "medium",
        id: "da12f7a3-f63e-485e-800d-4584b3252b51",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 1.126304, -2.218807]],
          },
        ],
        severity: "medium",
        id: "cac99cb1-4fe9-407d-8626-2cf2d0f06b7a",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21004, 1.126304, -2.218807]],
          },
        ],
        severity: "medium",
        id: "98ff338e-770a-4c95-9f6a-5d30869e4e30",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[3.21057, 1.126304, -2.218807]],
          },
        ],
        severity: "medium",
        id: "8d5166dc-84ac-47ed-b954-a960a02f7060",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "6ec8f485-b958-4089-84bd-d1610d1965fa",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[4.073594, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "161ecc14-a6ef-48e7-997b-8117de600601",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "8bffb7e0-998a-435e-b126-8552367f3e37",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-3.27215, -2.700256, -0.492757]],
          },
        ],
        severity: "medium",
        id: "ed6192fd-d662-4a14-a3ca-b95d8dc8d9ca",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.215362, -3.518803, -0.492757]],
          },
        ],
        severity: "medium",
        id: "461d2b7c-3d7f-44e6-84b1-e864fd5e91ed",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.215362, -3.518803, -0.492757]],
          },
        ],
        severity: "medium",
        id: "ea2af31c-2f68-4b7c-8f23-901c687d2294",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.215362, -3.518803, -0.492757]],
          },
        ],
        severity: "medium",
        id: "26c2102b-ebac-43d8-86cd-b55f46ad0944",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.375643, -3.518803, -0.492757]],
          },
        ],
        severity: "medium",
        id: "ded62d21-e72b-472d-b54c-ce9d78c2c5f3",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.375643, -3.518803, -0.492757]],
          },
        ],
        severity: "medium",
        id: "3ff76c69-4a56-4820-a3ab-a104c4722bc2",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.375643, -3.518803, -0.492757]],
          },
        ],
        severity: "medium",
        id: "f0e5a24e-ee83-48f0-a6f7-6c8c70a36496",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.043329, -3.518803, -0.492757]],
          },
        ],
        severity: "medium",
        id: "709e04b5-8718-4f4d-bbf0-dac56511a22c",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.043329, -3.518803, -0.492757]],
          },
        ],
        severity: "medium",
        id: "9d64596b-be5f-4a74-8559-4d8efce23443",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.043329, -3.518803, -0.492757]],
          },
        ],
        severity: "medium",
        id: "e01e9517-92a7-4115-99b3-ea1b689056bd",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.765861, -3.518803, -0.492757]],
          },
        ],
        severity: "medium",
        id: "24b707d3-651e-4e73-8afd-3cdcf9f3cf2a",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.765861, -3.518803, -0.492757]],
          },
        ],
        severity: "medium",
        id: "3ea4b87d-70a3-404d-a92b-1b3672fd97db",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.765861, -3.518803, -0.492757]],
          },
        ],
        severity: "medium",
        id: "a1711705-d994-4439-bb9b-2b9efcb1c8a2",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.215362, -3.518803, 0.550901]],
          },
        ],
        severity: "medium",
        id: "31091451-dc45-401a-b6f1-6ba4cf8fe70d",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.215362, -3.518803, 0.550901]],
          },
        ],
        severity: "medium",
        id: "9ae08885-3e89-4007-a253-292ac949a76e",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[1.215362, -3.518803, 0.550901]],
          },
        ],
        severity: "medium",
        id: "bd8ab09e-7fd7-40b4-8d0a-341c754a5213",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.375643, -3.518803, 0.550901]],
          },
        ],
        severity: "medium",
        id: "5e8a7551-e0dc-42db-b58b-1a012bd3261f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.375643, -3.518803, 0.550901]],
          },
        ],
        severity: "medium",
        id: "2e6fa588-95aa-4db3-a541-880f6d513c68",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[-0.375643, -3.518803, 0.550901]],
          },
        ],
        severity: "medium",
        id: "30a04a5f-f24d-4095-961c-a3f62cfd4384",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.765861, -3.518803, 0.550901]],
          },
        ],
        severity: "medium",
        id: "d6a5ecc5-f415-4ef6-9575-ecdbe417958f",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.765861, -3.518803, 0.550901]],
          },
        ],
        severity: "medium",
        id: "c633e9eb-936b-47da-a5f7-36d47a8458d0",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.043329, -3.518803, 0.550901]],
          },
        ],
        severity: "medium",
        id: "c5f629de-d41d-493b-855c-dc4bcfe975db",
      },
      {
        elements: [
          {
            type: "vertex",
            points: [[0.043329, -3.518803, 0.550901]],
          },
        ],
        severity: "medium",
        id: "6199a16d-5109-4124-8696-2b6969b3ea8d",
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
        id: "4bfff832-7a8a-47a6-b2c8-2dd2252ad552",
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
        id: "a8368f8f-49de-4b33-ad80-d5959e27f525",
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
        id: "717e2d5b-749d-4669-bc90-838b55646cbc",
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
        id: "30aa35f0-45ff-45bd-9598-5feac0a75b4f",
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
        id: "ff49056e-d50b-4458-9567-11a0a8e2026d",
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
        id: "480d0c6c-d218-4f5f-a372-0b2a0d3e10d0",
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
        id: "ed4c6f01-4084-4ab2-b64c-fd2f6b976ef1",
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
        id: "5d71f331-57fd-441a-976a-2c3090201f43",
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
        id: "eeee26cf-5649-47d7-9283-78cecc2e19bc",
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
        id: "e933c758-b44f-4a59-9b84-c2b7d5a00f98",
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
        id: "8c591859-9bfb-4d37-99a9-fb9584d5180d",
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
        id: "dff2789d-2b35-4ad4-9032-8e3d6b78b6df",
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
        id: "7aa51be2-5571-47ae-b383-7c44e0af1a29",
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
        id: "ff93962c-ded0-4a3e-b8ba-74b1f4594761",
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
        id: "ae8ac736-08d4-422c-8097-94f77a71ced9",
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
        id: "2269f8dd-8547-4607-80ab-8cdbbbf91374",
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
        id: "b8846ab4-acf9-4ee9-896f-f0aa6a55834c",
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
        id: "e781c00f-0a2f-4852-bd8a-baae4139c454",
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
        id: "890c6595-8458-40fd-bbb3-6eaf340eebe2",
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
        id: "ceadd637-52e3-4d23-b15a-76a96174da85",
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
        id: "ab232f59-a6bc-4d60-b5fc-17882324e561",
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
        id: "d5991c75-ae2b-430d-a3a5-4f67af82c53b",
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
        id: "524502d8-1bef-46b3-85fc-07f37dc5715f",
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
        id: "c4b7df68-7cd2-4ef4-a5ff-35d5ec15e9b5",
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
        id: "991aeb0c-72a8-4a9f-a90d-ac34eab634da",
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
        id: "31177d7b-6c99-4578-85f1-cb734bbc83f1",
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
        id: "e548375e-f5ba-470e-8276-aa6b33ce811c",
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
        id: "dd704e2f-1dd7-43f7-951a-91bccc557005",
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
        id: "e7b2a6b0-4613-440c-8639-1a3620fc9799",
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
        id: "04e9e1af-bd53-4085-a2b1-466226a7c502",
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
        id: "50786ad9-c801-41b4-a51f-595b8b5d504c",
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
        id: "968d18c2-1c04-4570-b31e-71f01948560a",
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
        id: "ce318baf-f6ae-4f1e-9b50-1bfb77e34c56",
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
        id: "ce6f20ab-7c90-4fac-b02a-fb63a693bb82",
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
        id: "61fa9275-5e6e-4ce5-a442-0cccc57f55ca",
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
        id: "76ccf036-0560-44a7-b4d8-7c077a322dff",
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
        id: "1a8a5711-72ae-4efc-89a4-fe6d50c12857",
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
        id: "8e84152f-89d6-44fa-9c85-25fc2acbd2ea",
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
        id: "b62dcd51-37e5-46d8-a825-76018fc5e9d7",
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
        id: "0482c688-7ca9-4338-b196-795107ce96ca",
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
        id: "bb3b710a-9ab5-4f89-a9bf-ace8cd6721a4",
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
        id: "21ba4aa6-ba63-45d4-b05c-134cca2e15d0",
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
        id: "84882965-78c7-41f5-9a9e-5f76931370a8",
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
        id: "5ec18fe8-e84a-40d0-bb27-11f2300c0b6e",
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
        id: "99b137f8-971e-422d-97db-3aaf36adbab7",
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
        id: "9e921d87-a186-4b8c-90b5-c3aab04b6ad1",
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
        id: "2258e69c-eed5-416a-8cb2-08d283bc6c90",
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
        id: "8543cc0e-424d-4f9b-9faa-e01d3eb093f6",
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
        id: "87fcf2a7-2f18-4754-af40-94d3b5bdb4cc",
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
        id: "75e83880-e7d0-404c-90cb-7311750a69c1",
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
        id: "1b2b48e3-4044-4cc8-903b-996bc467eb2e",
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
        id: "3e0f832f-f3bd-401d-85bc-5455eeb1d9b5",
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
        id: "4a6002bb-9a89-43e6-bf61-91b590587410",
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
        id: "3fa84b66-3aa0-42c9-9bcc-716e79567b75",
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
        id: "9b24b180-e83b-450f-8a45-b6b69780bc12",
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
        id: "c564337c-7902-4199-9309-3724a302137d",
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
        id: "af7bc516-f82a-441e-a465-79269dcde110",
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
        id: "358f276d-3916-4327-87ca-adb73c27ac93",
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
        id: "58eba536-f616-460c-837b-3e16d0abde88",
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
        id: "b7e723b1-9bf3-4515-af3f-2eb40fd903e6",
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
        id: "ff09d5a1-bee8-480e-9bfd-ca7cb814d05d",
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
        id: "eb953583-7b7e-4af5-a628-d3e6d845a21a",
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
        id: "938ac570-bdf6-4b98-85fc-97bc40f83bdf",
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
        id: "f27e032f-30f1-4113-b806-250eb5b6eec3",
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
        id: "24aeae5b-ace0-4656-8142-f4afb255c41b",
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
        id: "0f0ae832-042c-48e9-a889-47338161c088",
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
        id: "59e7dc00-519c-4f42-833e-cfa1afaa42cf",
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
        id: "1dc4b622-923a-4e6b-9289-63c4c6afbea1",
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
        id: "febd681f-76da-4ae7-b237-249587d999c8",
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
        id: "798e1ac1-83a3-4c82-b486-edff30e70e74",
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
        id: "0550be60-b189-48b2-add1-5e056cc4e439",
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
        id: "487db592-7643-4d4c-910d-1b8cc14ba4e6",
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
        id: "25a79f4a-ace5-4315-ac35-0d0536a63633",
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
        id: "a18b1e18-fc25-4c08-8a90-fb0e6c9a3478",
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
        id: "843f3ba6-986f-4023-8818-25687cc452a9",
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
        id: "97a64b97-9651-424d-ac83-283bdced85ab",
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
        id: "54080049-9530-4b2e-be12-af8307032e01",
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
        id: "f06dd7d2-c239-4525-a887-10c8570a1b0b",
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
        id: "f32f13a7-5c07-4d91-8b58-e282db6d5840",
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
        id: "7f0594b3-2bc9-4a83-ac71-b16dcd4683cd",
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
        id: "9f9cf989-6dee-4946-b139-027cb94e9c4a",
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
        id: "63f48234-b983-4dc8-8b8f-11af0a80be41",
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
        id: "8d1c0d1e-0696-4559-bd2b-3723cd53c17a",
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
        id: "330dd131-47c5-473a-b516-ae5e8b71e174",
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
        id: "a48dfad0-0140-4062-9d0f-b60bda6d4895",
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
        id: "4f3d87e4-97da-4abf-a60c-e667106d000b",
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
        id: "7ad660fa-e922-48ad-b88e-165505376086",
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
        id: "5e854e19-f93c-41a3-ae15-b9d0d47fb744",
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
        id: "6184b6a7-39ca-4f33-bd42-f1e7fc0f9682",
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
        id: "7435537f-ed0f-484d-8f59-70abaf370e66",
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
        id: "bef40933-58dc-4045-9f34-aa4e55f579d0",
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
        id: "3da005f1-f18b-4a1c-85ab-0cc8fd7d395f",
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
        id: "7fb6836c-6caf-4834-860b-79a0c1153e22",
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
        id: "d03ebb7a-65cb-4db9-8e58-1740d52aa6e9",
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
        id: "22c696aa-13da-4931-88e8-aa95b4eedca6",
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
        id: "c5786c0d-a50d-4e55-9ac8-b67612e51de0",
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
        id: "632d7e0e-f527-4a84-8fda-91ecd4c726c6",
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
        id: "a889def1-0ab8-430b-bdb2-80b57686a403",
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
        id: "7757537f-fe0b-4938-accf-cc60b16800c2",
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
        id: "985ba037-4ae0-4c1b-945c-5267f0e44807",
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
        id: "70a45621-e146-419b-8214-d5df880a3f87",
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
        id: "500378b0-36cf-46cb-9a4f-7a9d50ac61b3",
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
        id: "c42d96ca-71d5-4f9c-b45e-95697952cf40",
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
        id: "a3768469-9d9c-473e-8261-902b1c0e6124",
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
        id: "01b295b3-c5ff-4c29-9e6d-dc989dde95f0",
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
        id: "e3945368-0399-4cc4-8967-060efccb2291",
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
        id: "ea5fb18a-9cff-4732-9dfa-2ee7984d6a0b",
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
        id: "8ebd1ac3-5df2-406f-88a8-ee5a4cbb0cd8",
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
        id: "0cc5f23d-0172-4343-95db-984785a097f2",
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
        id: "297b8628-9b0a-4d9d-9c82-71cd9a51face",
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
        id: "b1f8c884-f637-4506-b75b-b56f656d1a34",
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
        id: "48e13741-9b38-4e36-a455-6e0417481001",
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
        id: "84a39d84-2a8d-44a9-8940-c6b86140b0fb",
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
        id: "1c2af332-92a0-47f9-9d8a-5859267cbb98",
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
        id: "b5c8358e-721d-4e93-b0d3-0d40bd4633f5",
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
        id: "db020b99-f13f-45d4-985f-6026d361c47a",
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
        id: "f1bd7a9e-2b5d-4ea6-a6e8-42ff2e6599f5",
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
        id: "561d666f-252b-4025-9c54-a9a55a7ac796",
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
        id: "ff462c8e-0527-4c49-99f4-f7341503cdb1",
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
        id: "e149b9ab-146b-4d3d-89df-157250c7a8b8",
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
        id: "916564a7-1c37-4e70-95b4-6ea87c42c542",
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
        id: "0d47608c-415c-4347-ad1e-3d35290ca9e0",
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
        id: "fbdfdc86-bea9-4890-86bf-33cc5e18a450",
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
        id: "65bc6130-bbcf-47d1-9d80-576f0b18073e",
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
        id: "83007cb0-e14f-4fe7-8470-5716d3b31e51",
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
        id: "dedc517d-1ac8-48b0-a650-724900e56173",
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
        id: "23aa4bfb-4d5f-4391-901f-52cb6edcae02",
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
        id: "ddaaf085-276b-4742-992e-0c194227f43d",
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
        id: "86859af5-0f5a-4aa1-aef9-3ed20afb4d7a",
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
        id: "5d4f2cf7-4dda-4e88-a27e-7da0070df4c9",
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
        id: "2b709aae-6b3f-4df7-9330-6739a3fcf2e9",
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
        id: "b562b0fa-197b-40b3-9fe7-563152038560",
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
        id: "f9a52a8f-5987-4896-bd70-51d979c58255",
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
        id: "6543cc0b-3fed-420b-9e03-1f79411f6d50",
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
        id: "a2c83559-82f3-4456-870e-e8c0776d810a",
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
        id: "ffdc173e-7f01-44e6-aebe-5ddc53d0f08b",
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
        id: "150a25dd-64e7-430d-825a-f9b7a0addf7b",
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
        id: "a0d07eca-b5d6-4a49-b599-0fe1be26120c",
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
        id: "86820050-8cd6-4d82-993c-a38d8d1a5c6d",
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
        id: "c893d39d-d54e-4fed-ba5e-4761af1ee91b",
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
        id: "1326ebd9-88ad-4b59-99f0-539c7944651c",
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
        id: "799b1fb5-c882-4a19-9bc1-1c2c0e9a3905",
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
        id: "76fc5f38-fdd0-44c8-8ec9-26af234cb5ba",
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
        id: "d11df999-1d47-4bbf-b969-dd96aaf2bb0e",
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
        id: "b94f5e22-ab8b-4c81-a3f6-b26241adec39",
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
        id: "2acfbe37-ac44-448d-baf5-df6001c7be23",
      },
    ],
    boundary_edges: [
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 4.790432, -0.693461],
              [-2.409125, 5.472823, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "b50cea81-237e-49e0-a51c-3ab85ce88df6",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 4.790432, -2.218807],
              [-2.409125, 5.472823, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "c591f45f-7f20-4226-8836-ef1b514ba0fa",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -1.150388, -0.693461],
              [3.21057, -0.467998, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "967aa66e-1729-4756-8be8-542dcb99d064",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -1.150388, -1.191857],
              [3.21057, -0.467998, -1.499663],
            ],
          },
        ],
        severity: "medium",
        id: "f2a967c1-121a-4e2e-8412-aec4c2246056",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 3.305226, -0.693461],
              [-2.409125, 3.987619, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "b9e1d784-387b-4b3f-906a-f25a69cb9e11",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 3.305226, -2.218807],
              [-2.409125, 3.987619, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "6c775246-622d-4498-95c0-8926a9821d37",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 1.820019, -0.693461],
              [-2.409125, 2.502413, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "97de3871-e38a-4c79-804d-3fb63025bef8",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 1.820019, -2.218807],
              [-2.409125, 2.502413, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "7c401b16-e845-4559-ae83-e388b5dcdb24",
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
        ],
        severity: "medium",
        id: "80a77264-c674-430a-a5cd-041b70263e9f",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -2.218807],
              [3.21057, 6.753312, -0.693462],
            ],
          },
        ],
        severity: "medium",
        id: "e84827e5-c3c0-47e9-b874-2dde25142642",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.275636, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "092f947f-0a44-4009-92ee-f513a61bd2c0",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 4.790432, -0.693461],
              [3.21057, 5.472823, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "1c1de2cc-55ba-44f2-9ecb-0406c0a752a5",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 4.790432, -2.218807],
              [3.21057, 5.472823, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "ae2cdace-29e8-4dd2-b573-24fc4027639c",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 3.305226, -0.693461],
              [3.21057, 3.987619, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "7c3ab580-380d-408a-9396-73559ef13c06",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 3.305226, -2.218807],
              [3.21057, 3.987619, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "a9cc1459-9628-448c-a312-a6a5db036236",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 1.820019, -0.693461],
              [3.21057, 2.502413, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "0ea1b44b-887e-49c7-a11a-b6f149a83d88",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 1.820019, -2.218807],
              [3.21057, 2.502413, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "7aa91bae-1070-42a6-8e17-a12769f88b35",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.798466, 0.596427],
              [-3.27215, 6.753312, 0.596425],
            ],
          },
        ],
        severity: "medium",
        id: "1b740b71-4beb-4d60-b06d-89e4e1f601d3",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.798465, -0.492757],
              [-3.27215, 6.753312, -0.492759],
            ],
          },
        ],
        severity: "medium",
        id: "bf96a858-7eb1-43d0-812a-e9ae4bd1d4ed",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, -3.156486, 0.596427],
              [4.073594, -3.156486, 1.829381],
            ],
          },
        ],
        severity: "medium",
        id: "c428937a-fa16-401b-ac0b-65a9ebbce242",
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
        ],
        severity: "medium",
        id: "b7435295-03b3-4caa-bf7d-bf049d39ec62",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 1.798355, -0.492757],
              [4.073594, 6.753312, -0.492759],
            ],
          },
        ],
        severity: "medium",
        id: "4bc7ed92-a68f-4d4d-bae8-15d51766111b",
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
        ],
        severity: "medium",
        id: "76a70a5c-6b4f-4cd5-8b60-e0e5197eb8b2",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.255307, -0.693461],
              [-2.409125, -1.953159, -0.829751],
            ],
          },
        ],
        severity: "medium",
        id: "0ee3bd63-db7f-4555-8cf6-fc4df966f91d",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -1.150345, -0.693461],
              [-2.409125, -0.467998, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "76e35c1a-08eb-46e5-918f-e1600d5076b7",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -1.150345, -1.191876],
              [-2.409125, -0.467998, -1.499663],
            ],
          },
        ],
        severity: "medium",
        id: "a4cd53b0-0d47-4048-9fca-3be2a868ba70",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 0.334816, -1.861789],
              [-2.409125, 1.017206, -2.169596],
            ],
          },
        ],
        severity: "medium",
        id: "c1430dc4-97a5-4117-bb34-1ff2db5d5fed",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 0.334816, -0.693461],
              [-2.409125, 1.017206, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "de3bf57a-9e0d-42f8-978e-c1594e215de3",
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
        ],
        severity: "medium",
        id: "e2848835-6173-4958-bef2-b833283bb440",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -0.693462],
              [-2.409125, 6.753312, -0.492759],
            ],
          },
        ],
        severity: "medium",
        id: "01e00b5b-8cac-4be2-8832-277be8c54a2e",
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
        ],
        severity: "medium",
        id: "3a949393-1432-4836-a614-e36c4875aff3",
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
        ],
        severity: "medium",
        id: "22844408-deb3-4abd-876a-1f36c06b35db",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -0.693462],
              [3.21057, 6.753312, -0.492759],
            ],
          },
        ],
        severity: "medium",
        id: "6e596a3b-5230-4a18-86a1-787daf4ea43b",
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
        ],
        severity: "medium",
        id: "2fa7e370-a627-4b06-8f0b-72b9f3489531",
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
        ],
        severity: "medium",
        id: "97f4d19c-7fa9-4bfb-96b6-e4adf42288ed",
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
        ],
        severity: "medium",
        id: "a74b7124-855c-4a70-b7e1-adac6500f58b",
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
        ],
        severity: "medium",
        id: "af6c7c82-0d58-4ac5-8d1b-74a0aa2c0eee",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -2.218807],
              [-2.409125, 6.753312, -0.693462],
            ],
          },
        ],
        severity: "medium",
        id: "d06bbd02-93de-4bdf-b479-969b3636a6eb",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.275636, -2.218807],
              [-2.409125, 6.753312, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "1e98dbd2-9e6b-427d-b56a-a6a3126a7301",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156377, 1.829381],
              [-3.27215, -1.953202, 1.829381],
            ],
          },
        ],
        severity: "medium",
        id: "862d3f13-b141-4ada-8b80-f07fb692e1fe",
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
        ],
        severity: "medium",
        id: "ac6b90d0-9c7e-4990-a915-26536cc0e900",
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
        ],
        severity: "medium",
        id: "dae41137-0980-487d-b552-7389a19e9c8d",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156378, 0.596427],
              [-3.27215, -3.156377, 1.829381],
            ],
          },
        ],
        severity: "medium",
        id: "3e64d9b5-de60-4f0d-87ab-c56b6368c5b9",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 0.334816, -1.861789],
              [3.21057, 1.017206, -2.169596],
            ],
          },
        ],
        severity: "medium",
        id: "fdf42e7f-9cc7-406b-8bd6-38155d2f2fea",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 0.334816, -0.693461],
              [3.21057, 1.017206, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "5d5361cc-4de6-4974-9336-703d25cee8c8",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, 1.829379],
              [3.21057, 6.753312, 1.829379],
            ],
          },
        ],
        severity: "medium",
        id: "9632c5f2-b617-44cd-8d4c-3dd1a32368bd",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.275636, 1.829379],
              [-3.27215, 6.753312, 1.829379],
            ],
          },
        ],
        severity: "medium",
        id: "d9e5b463-cec5-4eb3-b1dd-75ef282c1da1",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.275636, 0.596426],
              [-3.27215, 6.275636, 1.829379],
            ],
          },
        ],
        severity: "medium",
        id: "d95e62c0-61ce-4171-97c7-4683b7c02882",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 1.227271],
              [-3.27215, 6.275636, 1.227269],
            ],
          },
        ],
        severity: "medium",
        id: "dd7e563f-0a4d-4bc8-ac3a-51d11508b53b",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.275636, 0.596426],
              [-3.27215, 6.275636, 1.227269],
            ],
          },
        ],
        severity: "medium",
        id: "5145088b-7b06-4af0-a6b6-c1550ae9db0c",
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
        ],
        severity: "medium",
        id: "dff4098d-a192-4f01-bcdc-56a24b82fcd9",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 0.596427],
              [-3.27215, -1.953202, 1.227271],
            ],
          },
        ],
        severity: "medium",
        id: "9b975552-adfe-45ca-b340-777705470df7",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 4.791205, 1.829379],
              [-3.27215, 5.472823, 1.829379],
            ],
          },
        ],
        severity: "medium",
        id: "0755f460-e24f-44b5-bf38-675222932afa",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 4.791205, 1.22727],
              [-3.27215, 5.472823, 1.22727],
            ],
          },
        ],
        severity: "medium",
        id: "20eeecd7-cfb8-4dbc-8e59-3675c7f986d0",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 3.305226, 1.829381],
              [-3.27215, 3.988392, 1.82938],
            ],
          },
        ],
        severity: "medium",
        id: "2581535b-49c1-4ad0-9bd9-dd0d24c0f3e4",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 3.305226, 1.22727],
              [-3.27215, 3.988391, 1.22727],
            ],
          },
        ],
        severity: "medium",
        id: "587d6bac-0604-423a-8a45-77c0026b28c4",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.82002, 1.829381],
              [-3.27215, 2.502413, 1.829381],
            ],
          },
        ],
        severity: "medium",
        id: "26b973ec-463e-4d34-8a0b-bb37b084484c",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.82002, 1.227271],
              [-3.27215, 2.502413, 1.227271],
            ],
          },
        ],
        severity: "medium",
        id: "e10dc2cf-98df-44e4-940c-fe0770b854e1",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 0.334816, 1.829381],
              [-3.27215, 1.017206, 1.829381],
            ],
          },
        ],
        severity: "medium",
        id: "09df0f09-692e-4425-8fe7-90e0f01282ac",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 0.334816, 1.227271],
              [-3.27215, 1.017206, 1.227271],
            ],
          },
        ],
        severity: "medium",
        id: "52112567-e7bb-4395-a893-e80801a144c0",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 6.753312, -0.492759],
              [4.073594, 6.753312, 0.596425],
            ],
          },
        ],
        severity: "medium",
        id: "b2daba93-5003-455d-9ce5-bead08cbfab0",
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
        ],
        severity: "medium",
        id: "d4fb243d-2abf-4517-b4e1-8fac16fd637c",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.150388, 1.829381],
              [-3.27215, -0.467997, 1.829381],
            ],
          },
        ],
        severity: "medium",
        id: "c43846a8-798e-4456-ad28-4630db52f846",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.150388, 1.227271],
              [-3.27215, -0.467997, 1.227271],
            ],
          },
        ],
        severity: "medium",
        id: "dc7cefc2-2deb-4392-b02d-8989cbe64474",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, 1.829379],
              [4.073594, 6.753312, 1.829379],
            ],
          },
        ],
        severity: "medium",
        id: "4064cc52-cc68-46ea-b274-047273f5b99b",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 6.753312, 0.596425],
              [4.073594, 6.753312, 1.829379],
            ],
          },
        ],
        severity: "medium",
        id: "265702f3-c9cd-41e1-a091-d9cb7acd5308",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.753312, 1.829379],
              [-2.409125, 6.753312, 1.829379],
            ],
          },
        ],
        severity: "medium",
        id: "5ea3d0bb-fb86-4d6c-9d42-a88d6679bda0",
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
        ],
        severity: "medium",
        id: "b49d8ed6-1eae-4e78-ba50-7b8241d4d604",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.017206, 1.829381],
              [-3.27215, 1.82002, 1.829381],
            ],
          },
        ],
        severity: "medium",
        id: "48ca2dfe-b7c3-4cfb-99e2-ab211fb8ece0",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.017206, 1.227271],
              [-3.27215, 1.82002, 1.227271],
            ],
          },
        ],
        severity: "medium",
        id: "41bf66a7-0efa-45e5-a66e-255ca2df2e67",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 5.472823, 1.829379],
              [-3.27215, 6.275636, 1.829379],
            ],
          },
        ],
        severity: "medium",
        id: "b04052ca-d107-4cef-8b50-93f1bf39c8d7",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.275636, 1.227269],
              [-3.27215, 6.275636, 1.829379],
            ],
          },
        ],
        severity: "medium",
        id: "1102de83-260b-4bbe-a402-1b1389cb453d",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 5.472823, 1.22727],
              [-3.27215, 6.275636, 1.227269],
            ],
          },
        ],
        severity: "medium",
        id: "0718063a-3b4a-47e8-b175-317e9c1fcfec",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 2.502413, 1.829381],
              [-3.27215, 3.305226, 1.829381],
            ],
          },
        ],
        severity: "medium",
        id: "597d6510-60e7-4f50-8a11-dbadcf71aa98",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 2.502413, 1.227271],
              [-3.27215, 3.305226, 1.22727],
            ],
          },
        ],
        severity: "medium",
        id: "f96a3784-243f-4a08-997b-41ae9972e7f4",
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
        ],
        severity: "medium",
        id: "b5a41153-4aad-4aaa-bff4-d5d61f796daa",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 3.988391, 1.22727],
              [-3.27215, 4.791205, 1.22727],
            ],
          },
        ],
        severity: "medium",
        id: "133755a6-6fcd-457e-88d6-33c904690fa9",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.765861, -3.518803, -0.211772],
              [0.765861, -3.518803, 0.430479],
            ],
          },
        ],
        severity: "medium",
        id: "24ca4212-f0e4-44fa-8246-9b3a3d7bc2b5",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.043329, -3.518803, -0.211772],
              [0.043329, -3.518803, 0.430479],
            ],
          },
        ],
        severity: "medium",
        id: "b96aafaf-7330-47e8-b48d-e4b16cafe263",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 1.829381],
              [-3.27215, -1.150388, 1.829381],
            ],
          },
        ],
        severity: "medium",
        id: "1d4241e5-342e-4a89-8f12-2c20989e599d",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.953202, 1.227271],
              [-3.27215, -1.150388, 1.227271],
            ],
          },
        ],
        severity: "medium",
        id: "2720b563-0e1e-4583-a1ba-e3fb36d0cce1",
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
        ],
        severity: "medium",
        id: "0b29b4d0-51d8-4a4f-b3eb-80bf54138005",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -0.467997, 1.829381],
              [-3.27215, 0.334816, 1.829381],
            ],
          },
        ],
        severity: "medium",
        id: "0419d4e8-3954-47ed-8c2a-11b8a3c7295e",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -0.467997, 1.227271],
              [-3.27215, 0.334816, 1.227271],
            ],
          },
        ],
        severity: "medium",
        id: "34bd4afc-782c-4626-a09a-82798475bc1e",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156378, -0.492757],
              [-3.27215, -3.156377, 1.829381],
            ],
          },
        ],
        severity: "medium",
        id: "e1044110-c96b-4ecd-ae93-eee3ed7a3dc9",
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
        ],
        severity: "medium",
        id: "a6ee5322-2a1c-45f2-8242-735d2d2dfe86",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.776141, -4.04165, 1.829381],
              [1.041754, -4.029099, 1.829381],
            ],
          },
        ],
        severity: "medium",
        id: "20d92ab0-8098-4fc6-887b-ed9147891bb5",
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
        ],
        severity: "medium",
        id: "2c0a2c81-0d2a-478a-a2ff-075a33f9ba4a",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.114559, -3.577914, -0.492757],
              [3.361358, -3.47893, -0.492757],
            ],
          },
        ],
        severity: "medium",
        id: "6a83552c-bc09-48b8-9450-e58343bdd443",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.361358, -3.47893, -0.492757],
              [3.608159, -3.379944, -0.492757],
            ],
          },
        ],
        severity: "medium",
        id: "5661a736-2c9d-4c56-99f3-9d34826ef4f3",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.361358, -3.47893, 1.829381],
              [3.608159, -3.379944, 1.829381],
            ],
          },
        ],
        severity: "medium",
        id: "1f9a364f-5809-47a8-98f7-0bb3501dfdfe",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, -3.156486, -0.492757],
              [4.073594, -3.156486, 1.829381],
            ],
          },
        ],
        severity: "medium",
        id: "24ddc6ef-c27f-4684-863d-6722a2300d9a",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-0.424492, -3.353969, 0.123239],
              [-0.424492, -2.700256, -0.171632],
            ],
          },
        ],
        severity: "medium",
        id: "609d712c-9a94-4ff9-9656-860e0e126f8a",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-0.424492, -4.007681, 0.41811],
              [-0.424492, -3.353969, 0.123239],
            ],
          },
        ],
        severity: "medium",
        id: "1c862650-a5b8-480b-94c9-d18d1c1ca25a",
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
        ],
        severity: "medium",
        id: "f9edf464-a76b-45db-9766-0a01c339ba15",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-1.927437, -2.700256, -0.171632],
              [-0.424492, -2.700256, -0.171632],
            ],
          },
        ],
        severity: "medium",
        id: "bd8574d8-8997-49ef-a1dd-76689183cad6",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-1.927437, -2.700256, -0.492757],
              [-1.927437, 0.687218, -2.020748],
            ],
          },
        ],
        severity: "medium",
        id: "14f43e57-e478-4d1f-a3b8-af8a88265b3e",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [2.728881, -2.700256, -0.492757],
              [2.728881, 0.687218, -2.020748],
            ],
          },
        ],
        severity: "medium",
        id: "1d850d56-e1c5-4dcc-b7e2-374fdd74757a",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-0.424492, -2.700256, -0.171632],
              [1.281824, -2.700256, -0.171632],
            ],
          },
        ],
        severity: "medium",
        id: "792f443f-64cb-4d89-bca4-4e1770b81c71",
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
        ],
        severity: "medium",
        id: "ab6f6f37-71ed-48e3-9d51-f7742414a6be",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [1.281824, -2.700256, -0.171632],
              [2.728881, -2.700256, -0.171632],
            ],
          },
        ],
        severity: "medium",
        id: "25e96c33-3701-4ca0-a476-163a4fa6555e",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -2.700256, -0.492757],
              [-1.927437, -2.700256, -0.492757],
            ],
          },
        ],
        severity: "medium",
        id: "1a7de973-fe7d-4dab-a5a9-1ef1bd38d7ce",
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
        ],
        severity: "medium",
        id: "c1450e1f-b37f-4bfd-8aa7-92167a28959b",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 1.126304, -2.218807],
              [-1.927437, 1.126304, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "844b58e7-c521-4c85-b735-64118eea12e8",
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
        ],
        severity: "medium",
        id: "43c78a94-0820-4eb5-92b6-07255e14b0d5",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [2.728881, -2.700256, -0.492757],
              [3.21057, -2.700256, -0.492757],
            ],
          },
        ],
        severity: "medium",
        id: "54fe14b2-4141-4d54-adf3-d75886078c3d",
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
        ],
        severity: "medium",
        id: "641efbbb-5f49-4939-878f-9d245d9db61e",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [2.728881, 1.126304, -2.218807],
              [3.21057, 1.126304, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "8971a1f5-13ad-4e47-b4a0-148398ee409e",
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
        ],
        severity: "medium",
        id: "256a0156-b883-4caa-8483-ca477364f14b",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [2.728881, 0.687218, -2.020748],
              [2.728881, 0.90676, -2.119777],
            ],
          },
        ],
        severity: "medium",
        id: "98ef7506-e77a-4c04-b0c1-01a7a366d134",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-1.927437, 0.687218, -2.020748],
              [-1.927437, 0.90676, -2.119777],
            ],
          },
        ],
        severity: "medium",
        id: "b2563737-1a2f-4c80-8436-2b5b9e39fdda",
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
        ],
        severity: "medium",
        id: "3b34456a-8492-44e6-9189-94291f4d707d",
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
        ],
        severity: "medium",
        id: "aec29525-87b6-4d7e-b99b-beb52f2a4a63",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-1.927437, 1.126304, -2.218807],
              [2.728881, 1.126304, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "50d77c11-4242-4af9-bf13-a5d959fae437",
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
        ],
        severity: "medium",
        id: "6fa03432-4620-4553-9e6c-c6899627087b",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, -2.700256, -0.492757],
              [4.073594, 6.753312, -0.492759],
            ],
          },
        ],
        severity: "medium",
        id: "48170455-a32e-4640-96ef-272d1ebc439c",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -2.700256, -0.492757],
              [-3.27215, 6.753312, -0.492759],
            ],
          },
        ],
        severity: "medium",
        id: "9e5d9bbc-a414-42bf-85a5-ce0e4ca97288",
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
        ],
        severity: "medium",
        id: "070bb37c-48a9-4d9a-89a2-cf1cf1206df8",
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
        ],
        severity: "medium",
        id: "c58a0e3f-2d93-4043-822c-7c850adc7f59",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 6.753312, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "8128b85a-fbc3-45de-b0fa-3123a6e8dc4b",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 1.126304, -2.218807],
              [3.21057, 6.753312, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "6fc7ecdc-d68d-4830-829d-4a7d4578ce41",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, -3.156486, -0.492757],
              [4.073594, -2.700256, -0.492757],
            ],
          },
        ],
        severity: "medium",
        id: "08e32196-a31e-4b46-97b6-7ac72b394fc1",
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
        ],
        severity: "medium",
        id: "7642802c-b90d-4937-8f7d-d708570361f0",
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
        ],
        severity: "medium",
        id: "593b764a-c840-405b-9f1b-f2c27388c1d0",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156378, -0.492757],
              [-3.27215, -2.700256, -0.492757],
            ],
          },
        ],
        severity: "medium",
        id: "62cb4d79-d9ad-4617-9be1-390df8a043e9",
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
        ],
        severity: "medium",
        id: "6eec6ee9-e1e3-4883-91cc-9d9d56e86304",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-0.375643, -3.518803, 0.550901],
              [1.215362, -3.518803, 0.550901],
            ],
          },
        ],
        severity: "medium",
        id: "67b899db-ab3c-41c7-b68a-4906cdd7678d",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.765861, -3.518803, 0.550901],
              [1.215362, -3.518803, 0.550901],
            ],
          },
        ],
        severity: "medium",
        id: "a2d7c289-0def-48f5-892b-8740c392722d",
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
        ],
        severity: "medium",
        id: "04ce3ffa-df98-44e5-9ff0-af4772690bef",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-0.375643, -3.518803, 0.550901],
              [0.043329, -3.518803, 0.550901],
            ],
          },
        ],
        severity: "medium",
        id: "02556600-7ace-478e-a63b-8091bbbb9282",
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
        ],
        severity: "medium",
        id: "4795d18d-a032-433c-aa3a-586292d1c37f",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.765861, -3.518803, -0.492757],
              [0.765861, -3.518803, -0.211772],
            ],
          },
        ],
        severity: "medium",
        id: "6447d6ac-edbc-4ab3-83a8-53298f8e403d",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.043329, -3.518803, -0.492757],
              [0.043329, -3.518803, -0.211772],
            ],
          },
        ],
        severity: "medium",
        id: "49523424-f073-4cfc-be77-40c3230312ab",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [0.043329, -3.518803, 0.550901],
              [0.765861, -3.518803, 0.550901],
            ],
          },
        ],
        severity: "medium",
        id: "1dfbac9d-61e9-4fbe-a897-ae57032e703e",
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
        ],
        severity: "medium",
        id: "9be587d3-7e74-44fe-8941-d7e9e30ee54e",
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
        ],
        severity: "medium",
        id: "f7479609-5781-48f5-9326-45ced1e3aa50",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 6.753312, -0.492759],
              [3.21057, 6.753312, -0.211774],
            ],
          },
        ],
        severity: "medium",
        id: "f6e80b1f-93bd-4da2-bbdb-0805b37489df",
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
        ],
        severity: "medium",
        id: "75ebf251-7308-406f-9fd6-7564149b0ccb",
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
        ],
        severity: "medium",
        id: "270cb474-17f4-4cbb-b1b3-a2793262d20a",
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
        ],
        severity: "medium",
        id: "58fc5e0e-7e8f-42e5-af07-de2daa9a9787",
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
        ],
        severity: "medium",
        id: "9df2338b-b884-4b38-8f29-ef4b229eaf52",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 6.753312, -0.492759],
              [-2.409125, 6.753312, -0.211774],
            ],
          },
        ],
        severity: "medium",
        id: "31cb140b-1e44-4414-8e17-43276e465d93",
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
        ],
        severity: "medium",
        id: "99c6a4c4-c413-4aae-bc70-d96d673950f6",
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
        ],
        severity: "medium",
        id: "d5b57612-0197-40f3-805e-385f10a59c1d",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -3.156378, -0.492757],
              [-3.27215, -3.156378, 0.596427],
            ],
          },
        ],
        severity: "medium",
        id: "9eb91cc5-6e4a-4cfa-99b6-83a1cce7531f",
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
        ],
        severity: "medium",
        id: "d98f2031-0b34-4147-99c5-1b8e76365637",
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
        ],
        severity: "medium",
        id: "960d82ad-b9fa-47c0-828d-ff6a91020ae5",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, -3.156486, -0.492757],
              [4.073594, -3.156486, 0.596427],
            ],
          },
        ],
        severity: "medium",
        id: "27a61906-7242-4640-866c-30bda70b7960",
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
        ],
        severity: "medium",
        id: "2c07ebcf-724f-4d11-b3a5-99b194df3259",
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
        ],
        severity: "medium",
        id: "02f56f5a-9e0f-4d27-94c5-0cc01a6f266c",
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
        ],
        severity: "medium",
        id: "63b9af2b-b3b1-401d-a407-0299057d8402",
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
        ],
        severity: "medium",
        id: "0465d70f-3060-4862-aa4d-a26ba747ba9e",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 6.753312, 1.829379],
              [4.073594, 6.753312, 1.829379],
            ],
          },
        ],
        severity: "medium",
        id: "8d20376d-ff8b-4ac0-ab93-8e6e82e57ae4",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 3.305226, 0.596426],
              [4.073594, 3.987619, 0.596426],
            ],
          },
        ],
        severity: "medium",
        id: "1ccd9dc2-662c-4a3b-bbaa-e44c13fe394e",
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
        ],
        severity: "medium",
        id: "4e6bab42-80eb-4f42-9eed-a6c636ee2eac",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 3.305226, 0.596426],
              [-3.27215, 3.987619, 0.596426],
            ],
          },
        ],
        severity: "medium",
        id: "79d0f8e6-bd68-4e04-bc31-57eab7237e07",
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
        ],
        severity: "medium",
        id: "a1ca3763-ff54-48f6-982a-9284af4f17f5",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 1.82002, 0.596427],
              [4.073594, 2.502413, 0.596427],
            ],
          },
        ],
        severity: "medium",
        id: "fcb0b6d2-1359-42ba-8e26-648813aead17",
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
        ],
        severity: "medium",
        id: "24d4e287-d35d-464a-b0bf-e32337fd7916",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 1.82002, 0.596427],
              [-3.27215, 2.502413, 0.596427],
            ],
          },
        ],
        severity: "medium",
        id: "ff0dd49b-c5fa-468c-9ec8-dce59142736c",
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
        ],
        severity: "medium",
        id: "04d6b938-197a-460c-9d53-db25ae20093a",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, -2.635593, 0.596427],
              [4.073594, -1.953202, 0.596427],
            ],
          },
        ],
        severity: "medium",
        id: "87f38ab1-ca66-4919-96e6-a561ebbdbeca",
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
        ],
        severity: "medium",
        id: "37dd945c-30f4-4760-9da8-34f8747bf0a5",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -2.635593, 0.596427],
              [-3.27215, -1.953202, 0.596427],
            ],
          },
        ],
        severity: "medium",
        id: "60df4349-cac0-4971-a064-2dec643fd4b2",
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
        ],
        severity: "medium",
        id: "51f6583a-536d-4640-b78d-53b7323ac6e1",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, -1.150388, 0.596427],
              [4.073594, -0.467997, 0.596427],
            ],
          },
        ],
        severity: "medium",
        id: "a344be44-cf24-46db-b57f-a8eb54b7a856",
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
        ],
        severity: "medium",
        id: "e1256904-161d-4725-8d7e-c41f0423bc31",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, -1.150388, 0.596427],
              [-3.27215, -0.467997, 0.596427],
            ],
          },
        ],
        severity: "medium",
        id: "319e157e-9324-4edf-8f81-50ee4c6b3e44",
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
        ],
        severity: "medium",
        id: "5c0e85dc-17f7-4bb0-9a03-c15c4df18727",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 0.334816, 0.596427],
              [4.073594, 1.017206, 0.596427],
            ],
          },
        ],
        severity: "medium",
        id: "49e953d0-9bf3-4345-855f-968240ed67d3",
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
        ],
        severity: "medium",
        id: "db6365da-6edd-4d08-a7cc-072a49fac244",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 0.334816, 0.596427],
              [-3.27215, 1.017206, 0.596427],
            ],
          },
        ],
        severity: "medium",
        id: "33dae6bc-c365-4432-944c-ab1601744ed6",
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
        ],
        severity: "medium",
        id: "b758516f-bf6b-4ae5-b938-eaa2ac9eaaa5",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 4.791205, 0.596426],
              [4.073594, 5.473595, 0.596426],
            ],
          },
        ],
        severity: "medium",
        id: "3a2c15df-df5f-43f0-8b38-905bc39c3232",
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
        ],
        severity: "medium",
        id: "40420245-6f2e-4954-b216-6d053028d259",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-3.27215, 4.791205, 0.596426],
              [-3.27215, 5.473595, 0.596426],
            ],
          },
        ],
        severity: "medium",
        id: "052de4e7-452d-4df8-ae0a-6f3b0864a5e5",
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
        ],
        severity: "medium",
        id: "9e86bf65-7498-4b07-aa89-d6feea8212ce",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [4.073594, 6.275636, 0.596426],
              [4.073594, 6.753312, 0.596425],
            ],
          },
        ],
        severity: "medium",
        id: "1daafe6f-38d7-47d5-b5af-fb2061d52515",
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
        ],
        severity: "medium",
        id: "c049a432-0b06-4384-b319-0adb23926fb1",
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
        ],
        severity: "medium",
        id: "72bda622-a54f-496a-a383-cd555fa3844c",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 5.472823, -0.693461],
              [-2.409125, 6.275636, -0.693462],
            ],
          },
        ],
        severity: "medium",
        id: "9f65a999-1d2c-461d-83d2-598879baccf2",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 5.472823, -2.218807],
              [-2.409125, 6.275636, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "632e64dc-414d-4241-a752-6bb80625a624",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -0.467998, -0.693461],
              [3.21057, 0.334816, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "14d3037a-4aec-414a-9d0a-da4687042a37",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -0.467998, -1.499663],
              [3.21057, 0.334816, -1.861789],
            ],
          },
        ],
        severity: "medium",
        id: "62e7f8d8-950e-42f3-949c-378be7db7a21",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 3.987619, -0.693461],
              [-2.409125, 4.790432, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "31d0c533-ba51-46a6-9bc5-60272c8697e6",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 3.987619, -2.218807],
              [-2.409125, 4.790432, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "1ac5cf3a-b0e6-4258-a905-5ced6a45370a",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 2.502413, -0.693461],
              [3.21057, 3.305226, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "0e7a082f-af42-46f3-ab44-bae461dc6ff5",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 2.502413, -2.218807],
              [3.21057, 3.305226, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "8e286cb0-1487-4b5e-8be1-b382ba81a05c",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 3.987619, -0.693461],
              [3.21057, 4.790432, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "5e00ae1a-06f1-4a2b-9e1b-fc5c35f221db",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 3.987619, -2.218807],
              [3.21057, 4.790432, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "6dd5fd1c-4b36-456d-9b37-427297115ab5",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 5.472823, -0.693461],
              [3.21057, 6.275636, -0.693462],
            ],
          },
        ],
        severity: "medium",
        id: "b46d5984-4aa0-47ab-a6b1-9156dda7d764",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 5.472823, -2.218807],
              [3.21057, 6.275636, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "945ec1a1-343d-4813-a260-5a21a925161e",
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
        ],
        severity: "medium",
        id: "96a6c9bb-ed4f-4158-ba12-f1d8b3b7f24c",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -1.953159, -0.693461],
              [-2.409125, -1.150345, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "59b8f462-4abb-4636-a0b4-36d1031ae960",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -0.467998, -0.693461],
              [-2.409125, 0.334816, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "a91061fa-a856-460d-8ecd-b5a3ba8e0268",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, -0.467998, -1.499663],
              [-2.409125, 0.334816, -1.861789],
            ],
          },
        ],
        severity: "medium",
        id: "1d981714-ca14-4d67-a951-9c7932e31343",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -1.953202, -0.693461],
              [3.21057, -1.150388, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "dc55af88-7afb-4ace-aa9a-6d803cb3bc9d",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, -1.953202, -0.829731],
              [3.21057, -1.150388, -1.191857],
            ],
          },
        ],
        severity: "medium",
        id: "1fcae5b5-c630-4308-8a3f-c0b87fb2e809",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 1.017206, -0.693461],
              [-2.409125, 1.820019, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "a225147b-4ef2-436a-baff-87d01c3980e7",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 1.126304, -2.218807],
              [-2.409125, 1.820019, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "9fa644ac-d513-42ee-bf7b-f19c8ed2d4b0",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 1.017206, -2.169596],
              [-2.409125, 1.126304, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "30fb611b-15f1-4b91-aa8d-8ed0e0a5cf1a",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 2.502413, -0.693461],
              [-2.409125, 3.305226, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "96f4c3d1-6327-49cc-9517-d8e7f7a8d2ab",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [-2.409125, 2.502413, -2.218807],
              [-2.409125, 3.305226, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "a33bc101-5b04-4cdf-ac85-45d0364529d4",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 1.017206, -2.169596],
              [3.21057, 1.126304, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "4d5d3c0e-9f59-42b3-a5db-eefe44a3e823",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 1.017206, -0.693461],
              [3.21057, 1.820019, -0.693461],
            ],
          },
        ],
        severity: "medium",
        id: "357b0e91-83ec-412d-a869-dd3dc1bc3730",
      },
      {
        elements: [
          {
            type: "edge",
            points: [
              [3.21057, 1.126304, -2.218807],
              [3.21057, 1.820019, -2.218807],
            ],
          },
        ],
        severity: "medium",
        id: "33affddf-d8de-40ab-9f10-813c2c407fb5",
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
        id: "2b16af53-6e6d-414a-8b97-1e132d940af4",
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
        id: "592c203c-6099-4dd8-b2b1-657a7e7e0982",
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
        id: "1a817b16-8851-4274-b6d3-3aec01f9e7df",
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
        id: "89910611-370d-4500-a849-5b6f61177f56",
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
        id: "333016e8-3616-4eb8-807d-957478e7042e",
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
        id: "8d42c091-3f6e-4b42-9ec5-f61c38e959b7",
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
        id: "740314cc-973d-47c6-9f72-aa1559743ef7",
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
        id: "2068aab4-08b6-40ae-8197-8ac6b8f39a79",
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
        id: "dcd79659-1791-4944-8941-5a8ebd10bdca",
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
        id: "1c3bdc66-42e0-433a-a7e8-d7a5ee824d35",
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
        id: "db16165b-aea3-4073-8884-409707c8247b",
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
        id: "b05e8750-146e-4a02-8dbe-8a108043ec0d",
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
        id: "d28fa0ad-eedd-4cd1-b948-98af836dd861",
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
        id: "234e079f-43e5-4d46-8148-496d164dfce2",
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
        id: "df0924e5-9e09-4ce3-aac9-ce8011f2e90c",
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
        id: "ed72a9aa-a26e-4cf5-a829-5fba60b1365f",
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
        id: "4e98c3d8-d752-4429-9015-cc14fca4fec5",
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
        id: "ab6a47d8-4cd5-4490-8b4c-0aacbcf0981e",
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
        id: "e53db115-307b-4d5f-b290-8c9188ac04b8",
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
        id: "580e37d6-6cdb-4c2b-8377-e18228b7d453",
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
        id: "aa9d1429-7d94-404b-aaf2-15f57627a91a",
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
        id: "3d93ae7b-8db8-4d24-9e91-53b0cebab47c",
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
        id: "b5957224-d260-4ecf-a4d7-e61ce96cfa18",
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
        id: "7e34ff12-c51f-4eb4-a8b0-8e7ad06680f9",
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
        id: "352ab4b0-06f5-4cad-9326-a3e983397ab8",
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
        id: "74243978-6d32-4e9d-a9f9-34153c7e2817",
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
        id: "bcc19f50-82e2-416a-be44-631b99ac42b1",
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
        id: "2b3404b5-8fec-449a-aedc-9dbdeced0224",
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
        id: "d015b8cc-931e-4896-ad18-019ccbecb7af",
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
        id: "0e635f10-73a7-4424-9b54-106d2dda967e",
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
        id: "c9c41585-2ed5-4bf9-be6f-38d0efc4ab67",
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
        id: "324f047c-5e1a-44c3-a9d8-d7e16891a257",
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
        id: "704bdc9a-6012-4a97-891e-7cf2a1a6f289",
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
        id: "0e0243cc-1a0e-4e81-8bcf-101e2aa76444",
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
        id: "920ed7bf-b1a6-4158-b768-893a2cc356e0",
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
        id: "da945dda-e933-421c-a839-b44585d49885",
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
        id: "b7cea336-b64e-4489-94b7-fc7e81dcf6d1",
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
        id: "e16648a0-d9f9-4334-a0b1-19571183b922",
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
        id: "58e78a41-bbc8-4ad3-a988-0e48f3d75f72",
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
        id: "4746b43f-9504-4f0d-9d2b-493a1d194f43",
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
        id: "a3a6311a-8629-4ef0-b587-bd7b45535c86",
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
        id: "0ce5155a-0602-4faf-83b4-a08427af7c2f",
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
        id: "4586475a-1415-4b96-b50b-087068581f4d",
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
        id: "adc39ee9-9f79-42a5-b47e-dbf3702ad9c8",
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
        id: "7fdaf872-2878-49f2-94cb-3c8380579d68",
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
        id: "b4c4fcf4-9fb6-497d-b552-0ae5068b727b",
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
        id: "ed47d3de-5cb8-4ac5-b4ee-bcf5bba7ec1b",
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
        id: "3517d9be-a36f-44ee-a45f-ba1436018d0f",
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
        id: "604789f2-9ff2-4e1b-8cd3-ad8deb8cbadc",
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
        id: "a6afa076-5f69-42de-a9fd-94fd63bc8bb0",
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
        id: "3155fa85-92ae-4b89-b1ec-c4ff6b7d0689",
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
        id: "a5f0bc1c-9ec4-44fc-a236-25dca8bfb785",
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
        id: "37b9bc8f-8584-49b6-ae0b-f12733e3f982",
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
        id: "b4b7cfef-9a40-452d-bac2-c2ced54496e9",
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
        id: "2302a892-5dc1-418c-a359-bc06ed8a2dd1",
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
        id: "089d8929-30f6-4eee-9fc6-41d7da6e497d",
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
        id: "369ceee1-cda8-4daf-ad6e-566ff8f95063",
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
        id: "ee263c72-8ad4-41e8-a477-8a888cf1f516",
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
        id: "2ece2d1d-4180-4484-a9f2-4c26b69fb52e",
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
        id: "928e5b20-7ccd-41b2-818a-05c9e505ba60",
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
        id: "862561a0-74f0-4808-9101-0f6f25ca9e88",
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
        id: "a932532c-37ee-4731-a2cc-2d88b3e0e174",
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
        id: "8fda2d1e-a1b6-41e6-a861-40f15f374ea1",
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
        id: "afcc4c7c-82f1-4268-95bc-d222f5644659",
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
        id: "9e288e6a-95d3-4ba2-8e9c-a3f4b513b81f",
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
        id: "a53a7d8b-0679-4e32-993b-b46835990279",
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
        id: "f2771601-fd74-423d-b97f-7396a829fdc3",
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
        id: "2b5f859d-760a-4ed6-9fb6-0eb097414d6b",
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
        id: "6bf56dd8-aed9-479a-8344-1eef6a6d1527",
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
        id: "bf043c04-10d9-48c1-9d71-e974509beda5",
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
        id: "f60a075d-4659-4ca7-8511-f3c9d85504be",
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
        id: "4111a78b-0bdc-4f04-b404-294db8789fe7",
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
        id: "1a768352-7a03-41e1-b852-591a1cdd771c",
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
        id: "63e7253e-2973-4c07-978c-c77b3d54299b",
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
        id: "50b45a37-790f-4794-88d0-b316b8748a64",
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
        id: "445e0308-a670-4620-af79-ee1b82bc3ebc",
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
        id: "1d8c80bf-8209-4099-9a8e-f3a55d1faaaf",
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
        id: "d77a1b78-9724-49c2-a1c3-68a19d23c4c2",
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
        id: "21a7a6bf-856a-4936-8721-c80f78c27ffb",
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
        id: "d8a07eae-69d6-4275-b0e6-828704a4d335",
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
        id: "a969e4af-a7a6-4dba-b680-b15af44dd620",
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
        id: "cfd751eb-ad9e-4f4c-93ae-e2ca4f4acc47",
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
        id: "1428b5cd-aeb9-4800-bfec-c5faac8b2028",
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
        id: "865faf70-cbd8-45ed-8f25-8082e33cd4ca",
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
        id: "998cdc27-79d8-49e0-a476-2fb126c7af1b",
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
        id: "39c7a81c-0de7-4fef-89b4-9e7de67e1c06",
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
        id: "f8045f8f-c150-4915-8a8a-e61add5b81b5",
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
        id: "b930bb33-fab8-4198-a4be-63ce578f6c44",
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
        id: "a8b4d46c-579f-48e3-a3cd-e8adbfbb0d71",
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
        id: "cc352e9b-3124-447f-be14-10cb46228c42",
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
        id: "ec6ac35f-2f9b-4c9d-8ba8-df5a9fa49748",
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
        id: "5ddedbba-a429-4f99-a787-189bcc297514",
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
        id: "dba0f97a-5b92-49e5-aab8-42ca8509da1d",
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
        id: "9ac2cd98-edd1-4607-8736-1eea462e0aab",
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
        id: "db2e8169-6ead-4c3f-9dae-dd66300c39c9",
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
        id: "3df2b5c4-b0f4-418c-9474-2057ae1c6f4e",
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
        id: "9f8334cb-9812-45b8-b751-118d4cd12f47",
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
        id: "b052b97c-7b3d-4e5d-a29d-8ce7c30413e9",
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
        id: "b5ca6507-ce43-4817-8b0b-5d7c8769c533",
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
        id: "88afc12a-2be9-476e-a13b-f43b9f808ec8",
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
        id: "78ded3b9-2c52-49ae-9423-b54ad9f2f784",
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
        id: "df534533-e696-4eac-a91a-d0709f973983",
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
        id: "d021f3af-79ee-4701-9a88-1d4e79f6f2b6",
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
        id: "e26dec2f-ac70-446d-8d71-78297c219ca7",
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
        id: "3e862293-e453-47b6-9fe0-08dfdc24697e",
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
        id: "fb814fdd-0213-4529-b190-7b2eb9b45891",
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
        id: "6100881e-1f17-4e4b-98db-43c27b04a2d1",
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
        id: "8bac68dd-481f-48eb-82eb-98c00fa74518",
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
        id: "f3fe6e05-dac5-4e8b-b4ab-e4f5ed4ad513",
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
        id: "54221c38-dc61-4186-abdb-143f7ce68e19",
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
        id: "27042d07-a24d-4ac1-a914-2422224e535e",
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
        id: "717bd36c-099a-428f-9d37-0496c1e6eaf5",
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
        id: "1f9a8aed-6755-449e-9eac-a6981626039c",
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
        id: "09f7d2dd-9da9-4494-a283-3a0e914d5415",
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
        id: "6ed99150-7b95-4435-83ac-4ef61f3bc3c2",
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
        id: "3a075c63-c297-4d5f-84e1-0df00dbdc100",
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
        id: "4540c5ed-53a3-499b-9bf5-6baa492d65bb",
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
        id: "78486a42-3292-49cc-bdb4-708ca5d8b0cd",
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
        id: "643f5a4a-9e72-416f-bdf6-acf5a20ef2cc",
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
        id: "dca5e318-2724-4663-807b-6806f97d4200",
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
        id: "a79d714d-decb-4955-8850-3dda4bfa3a37",
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
        id: "ec5e7916-fc41-41f7-a6e0-e4ea7d0936d4",
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
        id: "6f7ff740-06c4-4280-8699-b642e50b4120",
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
        id: "421e21b0-88c8-4adc-9129-b7c936d7784d",
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
        id: "e655d88a-b414-43c1-bf0a-cfeb5b7be947",
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
        id: "2c76f7f3-4d32-425f-8ecb-7045b11c975c",
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
        id: "052d28dc-e906-41ca-b1ed-d6ce0b7421d3",
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
        id: "ca706bf4-e515-4cf2-8c86-83f1624eb305",
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
        id: "97ac7629-e4f4-4977-80ab-887f724ce423",
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
        id: "6b73cc32-392b-49ab-a843-5554edf7ce10",
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
        id: "f956d413-adba-419f-b04b-156af65150d4",
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
        id: "a95d9829-e107-41ef-8c17-52e0ee1ab2cb",
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
        id: "e5efb37b-aae1-4c86-9981-a229311504be",
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
        id: "d781948f-4e8c-4339-b3e4-4ea10de74ba2",
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
        id: "f806f7a8-ef7d-4156-bc7a-7a41af305e24",
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
        id: "8174ee8b-f5aa-4d4f-94c8-7d41758ddc9c",
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
        id: "8da1f939-cd92-4054-928d-024a28499c5a",
      },
    ],
  },
};

export default function GeometryIssueSidebar({
  showPossibleSimulation = true,
  showIssueList = true,
  showQuickAction = true,
  showRepairButton = true,
}: IProps) {
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
