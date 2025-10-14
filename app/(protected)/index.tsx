import Ionicons from "@expo/vector-icons/Ionicons";
import AddTaskModal from "@/components/modals/AddTaskModal";
import CurrentTaskRow from "@/components/CurrentTaskRow";
import { useDBFunctions } from "@/lib/DBUSE";
import { useState } from "react";
import { DateFunctions } from "@/utils/DateUtils";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const date = DateFunctions().getFullDate();
  const { isLoading, currentTasks } = useDBFunctions().useFetchCurrent();
  const [showTaskModal, setShowTaskModal] = useState(false);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container]}>
        <Text style={{ marginTop: 50, fontSize: 16, fontWeight: 600 }}>
          Loading data...
        </Text>
      </SafeAreaView>
    );
  }

  const tasksHeading = currentTasks?.length
    ? `TODAY'S TASKS:`
    : "NO TASKS DUE TODAY...";

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{date}</Text>
      </View>

      <Text style={styles.taskHeading}>{tasksHeading}</Text>

      <FlatList
        style={{ width: "98%" }}
        contentContainerStyle={{
          marginVertical: 10,
          paddingVertical: 6,
          flexGrow: 1,
          alignItems: "center",
          borderRadius: 6,
          paddingBottom: 20,
        }}
        data={currentTasks}
        renderItem={({ item: { id, title, frequency } }) => {
          return <CurrentTaskRow id={id} title={title} frequency={frequency} />;
        }}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ id }) => id.toString()}
      />

      <Pressable style={styles.link} onPress={() => setShowTaskModal(true)}>
        <Ionicons name="add-circle" color="black" size={50} />
      </Pressable>

      <View style={styles.btmSection}>
        <Text style={styles.copyright}>&copy;kepaWare 2025 </Text>
      </View>

      {/* --------------------- Modals: --------------------  */}

      <AddTaskModal
        showTaskModal={showTaskModal}
        setShowTaskModal={setShowTaskModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    marginTop: 6,
    width: "100%",
    height: 56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  heading: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 700,
    color: "blue",
  },
  headerText: {
    fontSize: 20,
    color: "#2573e7",
    fontWeight: 700,
  },
  taskHeading: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 700,
  },
  link: {
    position: "absolute",
    bottom: 110,
    padding: 10,
  },
  btmSection: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 28,
    marginTop: 20,
  },
  copyright: {
    fontSize: 16,
    fontWeight: 600,
    color: "#999",
  },
});
