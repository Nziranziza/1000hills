import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "../constants/LocalStorage";

export const getToken = async () => {
  const token = await AsyncStorage.getItem(StorageKeys.CURRENT_USER);
  return token || "";
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(StorageKeys.CURRENT_USER);
};
