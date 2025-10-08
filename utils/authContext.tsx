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
  setRegister: (value: boolean) => void;
};

const authStorageKey = "auth-key";

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isRegister: false,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
  setRegister: () => {},
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

  const setRegister = (value: boolean) => {
    setIsRegister(value);
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
    const getAuthFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem(authStorageKey);

        if (value !== null) {
          const auth = JSON.parse(value);
          setIsLoggedIn(auth.isLoggedIn);
        }
      } catch (error) {
        console.log("Error fetching from Storage: ", error);
      }
      setIsReady(true);
    };
    getAuthFromStorage();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isReady, isRegister, setRegister, logIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
