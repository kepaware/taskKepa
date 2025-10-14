import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TaskListRow from "@/components/TaskListRow";
import { useDBFunctions } from "@/lib/DBUSE";

export default function Tasks() {
  const insets = useSafeAreaInsets();
  const { isPending, tasks } = useDBFunctions().useFetchTasks();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <Text style={styles.heading}>Task List:</Text>

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
        data={tasks}
        renderItem={({ item: { id, title, frequency, last, due } }) => {
          return (
            <TaskListRow
              id={id}
              title={title}
              frequency={frequency}
              last={last}
              due={due}
            />
          );
        }}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ id }) => id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  heading: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: 700,
    color: "blue",
  },
});
