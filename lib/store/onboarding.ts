import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = createJSONStorage(() => AsyncStorage);

export const hasFinishedOnboardingAtom = atomWithStorage(
  "hasFinishedOnboarding",
  false,
  storage
);
