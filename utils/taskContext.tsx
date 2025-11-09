import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { SplashScreen } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

type RecoveryState = {
  savedDate: string | null;
  setSaved: (value: string) => void;
};

const savedStorageKey = "task-save-key";

export const TaskContext = createContext<RecoveryState>({
  savedDate: null,
  setSaved: () => {},
});

export function TaskProvider({ children }: PropsWithChildren) {
  const [savedDate, setSavedDate] = useState<string | null>(null);

  const storeSaveDate = async (newState: { savedDate: string }) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(savedStorageKey, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const setSaved = (value: string) => {
    setSavedDate(value);
    storeSaveDate({ savedDate: value });
  };

  useEffect(() => {
    const getSavedDate = async () => {
      try {
        const value = await AsyncStorage.getItem(savedStorageKey);

        if (value !== null) {
          const data = JSON.parse(value);
          setSavedDate(data.savedDate);
        }
      } catch (error) {
        console.log("Error fetching date from storage");
      }
    };

    getSavedDate();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        savedDate,
        setSaved,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
