import EndTaskModal from "./modals/EndTaskModal";
import { Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

export type TaskProps = {
  id: number;
  title: string;
  frequency: string;
};

export default function CurrentTaskRow({ id, title, frequency }: TaskProps) {
  const [showEndModal, setShowEndModal] = useState(false);

  return (
    <>
      <Pressable style={styles.section} onPress={() => setShowEndModal(true)}>
        <Text style={styles.description}>{title}</Text>
      </Pressable>

      <EndTaskModal
        id={id}
        title={title}
        frequency={frequency}
        showEndModal={showEndModal}
        setShowEndModal={setShowEndModal}
      />
    </>
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
