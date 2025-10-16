import EditTaskModal from "./modals/EditTaskModal";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

export type TaskProps = {
  id: number;
  title: string;
  frequency: string;
  last?: string;
  due: string;
};

export default function TaskListRow({
  id,
  title,
  frequency,
  last,
  due,
}: TaskProps) {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <Pressable
        style={styles.section}
        onLongPress={() => setShowEditModal(true)}
      >
        {/* Description: */}
        <Text style={styles.description}>{title}</Text>

        {/* Dates Panel: */}
        <View style={styles.row}>
          <Text style={styles.panel1}>Last: {last}</Text>
          <Text style={styles.panel2}>{frequency}</Text>
          <Text style={styles.panel3}>Due: {due}</Text>
        </View>
      </Pressable>

      <EditTaskModal
        id={id}
        title={title}
        frequency={frequency}
        last={last!}
        due={due}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  section: {
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
    backgroundColor: "#784bb3",
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
    backgroundColor: "#555",
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
    backgroundColor: "#555",
  },
});

// shadowColor: "#000",
// shadowOffset: { width: 0, height: 1 },
// shadowOpacity: 0.2,
// shadowRadius: 1.41,
// elevation: 2,
