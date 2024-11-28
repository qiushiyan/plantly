import { atom, useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = createJSONStorage<any>(() => AsyncStorage);
export type PlantType = {
  id: string;
  name: string;
  wateringFrequencyDays: number;
  lastWateredAtTimestamp?: number;
  imageUri?: string;
};

// Create persistent atoms for plants and nextId
const plantsAtom = atomWithStorage<PlantType[]>("plantly-plants", [], storage);
const nextIdAtom = atomWithStorage("plantly-next-id", 1, storage);

// Derived atom for adding a plant
const addPlantAtom = atom(
  null,
  async (
    get,
    set,
    params: { name: string; wateringFrequencyDays: number; imageUri?: string }
  ) => {
    const { name, wateringFrequencyDays, imageUri } = params;
    const nextId = get(nextIdAtom);

    const newPlant: PlantType = {
      id: String(nextId),
      name,
      wateringFrequencyDays,
      imageUri,
    };

    const currentPlants = get(plantsAtom);
    set(plantsAtom, [newPlant, ...(await currentPlants)]);
    set(nextIdAtom, (await nextId) + 1);
  }
);

// Derived atom for removing a plant
const removePlantAtom = atom(null, async (get, set, plantId: string) => {
  const currentPlants = get(plantsAtom);
  set(
    plantsAtom,
    (await currentPlants).filter((plant) => plant.id !== plantId)
  );
});

// Derived atom for watering a plant
const waterPlantAtom = atom(null, async (get, set, plantId: string) => {
  const currentPlants = get(plantsAtom);
  set(
    plantsAtom,
    (await currentPlants).map((plant) =>
      plant.id === plantId
        ? { ...plant, lastWateredAtTimestamp: Date.now() }
        : plant
    )
  );
});

// Custom hook to use plant store
export function usePlantStore() {
  const [plants] = useAtom(plantsAtom);
  const [, addPlant] = useAtom(addPlantAtom);
  const [, removePlant] = useAtom(removePlantAtom);
  const [, waterPlant] = useAtom(waterPlantAtom);

  return {
    plants,
    addPlant: async (
      name: string,
      wateringFrequencyDays: number,
      imageUri?: string
    ) => {
      await addPlant({ name, wateringFrequencyDays, imageUri });
    },
    removePlant: (plantId: string) => removePlant(plantId),
    waterPlant: (plantId: string) => waterPlant(plantId),
  };
}
