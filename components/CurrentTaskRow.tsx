import { View, Text, StyleSheet, Pressable, Task } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export type TaskProps = {
  id: number;
  title: string;
};

export default function CurrentTaskRow({ id, title }: TaskProps) {
  return (
    <Pressable style={styles.section}>
      {/* Description: */}
      <Text style={styles.description}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: {
    // borderTopLeftRadius: 6,
    // borderTopRightRadius: 6,
    borderRadius: 6,
    marginVertical: 10,
    flexDirection: "column",
    width: 330,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    fontWeight: 600,
    paddingLeft: 8,
    paddingVertical: 8,
    color: "#fff",
    backgroundColor: "#5915b3",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  panel1: {
    width: "34%",
    paddingTop: 4,
    paddingBottom: 6,
    paddingHorizontal: 8,
    textAlign: "left",
    color: "#fff",
    backgroundColor: "#000",
  },
  panel2: {
    fontWeight: 600,
    paddingTop: 4,
    paddingBottom: 6,
  },
  panel3: {
    width: "34%",
    paddingTop: 4,
    paddingBottom: 6,
    paddingHorizontal: 8,
    textAlign: "right",
    color: "#fff",
    backgroundColor: "#000",
  },
});

// shadowColor: "#000",
// shadowOffset: { width: 0, height: 1 },
// shadowOpacity: 0.2,
// shadowRadius: 1.41,
// elevation: 2,
