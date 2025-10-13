import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TaskListRow from "@/components/TaskListRow";
import { taskList } from "@/data/tempData";

// const taskList = [
//   {
//     id: 1,
//     title: "Remove cobwebs from all areas",
//     frequency: "Fortnightly",
//     last: "28/09/25",
//     due: "11/10/25",
//   },
//   {
//     id: 2,
//     title: "Put out rubbish wheelie bins",
//     frequency: "Weekly",
//     last: "29/09/25",
//     due: "12/10/25",
//   },
// ];

export default function Tasks() {
  const insets = useSafeAreaInsets();

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
        data={taskList}
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
