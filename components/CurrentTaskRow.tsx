import EndTaskModal from "./modals/EndTaskModal";
import { Text, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { DateFunctions } from "@/utils/DateUtils";
import { compareAsc } from "date-fns";

export type TaskProps = {
  id: number;
  title: string;
  frequency: string;
  due: string;
};

export default function CurrentTaskRow({
  id,
  title,
  frequency,
  due,
}: TaskProps) {
  const [showEndModal, setShowEndModal] = useState(false);
  const [isOverdue, setIsOverdue] = useState(false);
  const shortDate = DateFunctions().getShortDate();
  const currentDate = DateFunctions().convert(shortDate);
  const eDue = DateFunctions().convert(due);

  const bgColor = isOverdue ? "#a01313" : "#5915b3";
  useEffect(() => {
    if (eDue < currentDate) {
      setIsOverdue(true);
    }
  }, []);

  return (
    <>
      <Pressable style={styles.section} onPress={() => setShowEndModal(true)}>
        <Text style={[styles.description, { backgroundColor: `${bgColor}` }]}>
          {title}
        </Text>
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
