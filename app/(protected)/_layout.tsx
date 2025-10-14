import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { HapticTab } from "@/components/ui/HapticTab";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function TabLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarButton: HapticTab,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            animation: "fade",
            tabBarStyle: {
              marginBottom: 6,
              backgroundColor: "#e1dfeb",
            },
          }}
        />
        <Tabs.Screen
          name="tasks"
          options={{
            headerShown: false,
            tabBarLabel: "Tasks",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="list-ul" color={color} size={22} />
            ),
            animation: "fade",
            tabBarStyle: {
              marginBottom: 6,
              backgroundColor: "#e1dfeb",
            },
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
