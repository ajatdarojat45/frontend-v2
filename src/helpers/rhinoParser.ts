import * as THREE from "three";
import { Rhino3dmLoader } from "three/examples/jsm/loaders/3DMLoader";
import rhino3dm from "https://cdn.jsdelivr.net/npm/rhino3dm@8.17.0/rhino3dm.module.js";
import type { RhinoLayerData, RhinoObjectAttribute } from "@/types/layer";
import type { RhinoDocument } from "@/types/file";

export async function parseFileAsRhinoDoc(fileData: ArrayBuffer): Promise<RhinoDocument> {
  try {
    const rhino = await rhino3dm();
    const uint8Array = new Uint8Array(fileData);
    const rhinoDoc = rhino.File3dm.fromByteArray(uint8Array);

    if (!rhinoDoc) {
      throw new Error("Failed to parse 3dm file");
    }

    rhinoDoc.settings().pageUnitSystem = rhino.UnitSystem.Meters;

    return rhinoDoc;
  } catch (error) {
    throw new Error(
      `Failed to parse rhino document: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function parseFileAsThreeObject(fileData: ArrayBuffer): Promise<THREE.Object3D> {
  return new Promise((resolve, reject) => {
    try {
      const loader = new Rhino3dmLoader();

      const wasmPath = "/node_modules/three/examples/jsm/libs/rhino3dm/";
      loader.setLibraryPath(wasmPath);

      loader.parse(
        fileData,
        (object3D: THREE.Object3D) => {
          if (!object3D) {
            reject(new Error("Failed to parse 3dm file"));
            return;
          }

          object3D.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              if (!child.material) {
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xffffff,
                  side: THREE.DoubleSide,
                  transparent: true,
                  opacity: 0.3,
                  depthWrite: false,
                });
              } else if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.transparent = true;
                child.material.opacity = 0.3;
                child.material.depthWrite = false;
                child.material.needsUpdate = true;
              }

              if (!child.userData.layerIndex) {
                child.userData.layerIndex = 0;
              }
            }
          });

          resolve(object3D);
        },
        (error: ErrorEvent) => {
          reject(new Error(`Could not parse 3D model: ${error}`));
        },
      );
    } catch (error) {
      reject(
        new Error(
          `Failed to initialize 3DM loader: ${error instanceof Error ? error.message : "Unknown error"}`,
        ),
      );
    }
  });
}

export function extractLayerInfo(rhinoDoc: RhinoDocument): Array<RhinoLayerData> {
  const layers: Array<RhinoLayerData> = [];

  try {
    const rhinoLayers = rhinoDoc.layers();
    const layerCount = rhinoLayers.count;

    for (let i = 0; i < layerCount; i++) {
      const layer = rhinoLayers.get(i);

      layers.push({
        index: layer.index,
        name: layer.name || `Layer_${layer.index}`,
        color: `#${layer.color.r.toString(16).padStart(2, "0")}${layer.color.g.toString(16).padStart(2, "0")}${layer.color.b.toString(16).padStart(2, "0")}`,
        visible: layer.visible,
        fullPath: layer.fullPath || layer.name || `Layer_${layer.index}`,
        parentIndex: layer.parentLayerIndex || -1,
      });
    }
  } catch (error) {
    console.warn("Failed to extract layers from Rhino document:", error);
  }

  return layers;
}

export function extractObjectAttributes(rhinoDoc: RhinoDocument): Array<RhinoObjectAttribute> {
  const attributes: Array<RhinoObjectAttribute> = [];

  try {
    const objects = rhinoDoc.objects();
    const objectCount = objects.count;

    for (let i = 0; i < objectCount; i++) {
      const rhinoObject = objects.get(i);
      const objectAttributes = rhinoObject.attributes();

      attributes.push({
        id: rhinoObject.id || `object_${i}`,
        layerIndex: objectAttributes.layerIndex || 0,
        name: objectAttributes.name || `Object_${rhinoObject.id || i}`,
      });
    }
  } catch (error) {
    console.warn("Failed to extract object attributes:", error);
  }

  return attributes;
}
