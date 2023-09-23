import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "../constants/LocalStorage";

export const getToken = async () => {
  try {
    const res = (await AsyncStorage.getItem(StorageKeys.CURRENT_USER)) as any;
    const { data } = JSON.parse(res);
    return data?.token;
  } catch (error) {
    return null;
  }
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(StorageKeys.CURRENT_USER);
};
