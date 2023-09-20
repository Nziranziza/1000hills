import AuthAPI, { Credentials } from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { StorageKeys } from "../constants/LocalStorage";

const storage = createJSONStorage(() => AsyncStorage);

const data = {
  loading: false,
  error: null as string | null,
  data: {} as Record<string, any>,
};

type LoginPayload = {
  body: Credentials;
  onSuccess: () => void;
  onError: (message: string) => void;
};

const loginAtom = atomWithStorage(StorageKeys.CURRENT_USER, data, storage);

const login = atom(
  (get) => get(loginAtom),
  async (get, set, payload: LoginPayload) => {
    try {
      const { body, onSuccess = () => {} } = payload;
      const currentData: any = get(loginAtom);
      set(loginAtom, {
        ...currentData,
        loading: true,
        error: null,
        data: {},
      });
      const response = await AuthAPI.login(body);
      set(loginAtom, {
        ...currentData,
        loading: false,
        error: null,
        data: response,
      });
      onSuccess();
    } catch (error: any) {
      const { onError = () => {} } = payload;
      const currentData: any = get(loginAtom);
      console.log(error)
      set(loginAtom, {
        ...currentData,
        loading: false,
        error,
      });
      onError(error?.message as string || 'Something went wrong!');
    }
  }
);

export const logout = atom(
  (get) => get(loginAtom),
  async (get, set) => {
    try {
      console.log('logout')
      const currentData: any = get(loginAtom);
      console.log(currentData)
      set(loginAtom, {
        ...currentData,
        data: {},
      });
      console.log('done')
    } catch(error) {
      const currentData: any = get(loginAtom);
      set(loginAtom, {
        ...currentData,
        data: {},
      });
    }
  }
)

export default login;
