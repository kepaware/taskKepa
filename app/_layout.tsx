import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { Alert } from "react-native";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const createDBIfNeeded = async (db: SQLiteDatabase) => {
  let createDBError: boolean = false;

  try {
    await db.execAsync(
      `        
          CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, frequency TEXT, last TEXT, due TEXT);
        `
    );

    console.log("DB taskkepa.db created/exists");
  } catch (error) {
    console.error("Error creating database: ", error);
    Alert.alert(`Error creating database: ${error}`);
    createDBError = true;
  }
};

export default function App() {
  return (
    <SQLiteProvider databaseName="taskkepa.db" onInit={createDBIfNeeded}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="dark" />
        <Stack>
          <Stack.Screen
            name="(protected)"
            options={{
              headerShown: false,
              animation: "none",
            }}
          />
        </Stack>
      </QueryClientProvider>
    </SQLiteProvider>
  );
}
