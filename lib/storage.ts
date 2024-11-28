import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStorageItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const setStorageItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};
