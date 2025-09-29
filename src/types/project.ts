import type { Model } from "./model"

export interface Project {
  createdAt: string
  description: string
  group: string
  id: number
  models: Array<Model>
  name: string
  updatedAt: string
}
