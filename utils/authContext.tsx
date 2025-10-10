import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { SplashScreen, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

type AuthState = {
  isLoggedIn: boolean;
  isRegister: boolean;
  isReady: boolean;
  logIn: () => void;
  logOut: () => void;
  setRegister: () => void;
  deRegister: () => void;
};

//Must be different for each App!
const authStorageKey = "taskauth-key";
const regStorageKey = "taskregister-key";

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isRegister: false,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
  setRegister: () => {},
  deRegister: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isRegister, setIsRegister] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const storeAuthState = async (newState: { isLoggedIn: boolean }) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(authStorageKey, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const storeRegisterState = async (newState: { isRegister: boolean }) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(regStorageKey, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const setRegister = () => {
    setIsRegister(true);
    storeRegisterState({ isRegister: true });
  };

  const deRegister = () => {
    setIsRegister(false);
    storeRegisterState({ isRegister: false });
  };

  const logIn = () => {
    setIsLoggedIn(true);
    storeAuthState({ isLoggedIn: true });
    router.replace("/");
  };

  const logOut = () => {
    setIsLoggedIn(false);
    storeAuthState({ isLoggedIn: false });
  };

  useEffect(() => {
    const getRegisterFromStorage = async () => {
      try {
        const regValue = await AsyncStorage.getItem(regStorageKey);

        if (regValue !== null) {
          const register = JSON.parse(regValue);
          setIsRegister(register.isRegister);
        }
      } catch (error) {
        console.log("Error fetching from Storage: ", error);
      }
    };

    const getAuthFromStorage = async () => {
      try {
        const authValue = await AsyncStorage.getItem(authStorageKey);

        if (authValue !== null) {
          const auth = JSON.parse(authValue);
          setIsLoggedIn(auth.isLoggedIn);
        }
      } catch (error) {
        console.log("Error fetching from Storage: ", error);
      }
      setIsReady(true);
    };
    getRegisterFromStorage();
    getAuthFromStorage();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isReady,
        isRegister,
        setRegister,
        deRegister,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
