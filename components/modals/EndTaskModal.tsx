import { type SetStateAction, useState } from "react";
import EndDueDatePicker from "../pickers/EndDueDatePicker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DateFunctions } from "@/utils/DateUtils";
import { useDBFunctions } from "@/lib/DBUSE";

import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  id: number;
  title: string;
  frequency: string;
  showEndModal: boolean;
  setShowEndModal: React.Dispatch<SetStateAction<boolean>>;
};

export default function EndTaskModal({
  id,
  title,
  frequency,
  showEndModal,
  setShowEndModal,
}: Props) {
  const insets = useSafeAreaInsets();
  const [due, setDue] = useState("Select");
  const [endError, setEndError] = useState<string | null>(null);
  const shortDate = DateFunctions().getShortDate();
  const { finishTask } = useDBFunctions().useEndTask();

  async function handleSave() {
    let endUpdate = {
      id: id,
      newLast: shortDate,
      newDue: due,
    };

    if (due === "Select") {
      setEndError("New due date is required!");
    } else {
      finishTask({ endUpdate });
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={showEndModal}
      onRequestClose={() => setShowEndModal(false)}
    >
      <View style={[styles.modal, { paddingTop: insets.top }]}>
        <Text style={styles.heading}>COMPLETED TASK:</Text>

        <Text style={styles.taskTitle}>"{title}"</Text>
        <Text style={styles.taskSubTitle}>({frequency})</Text>

        <View style={{ marginBottom: 20 }}>
          <Text style={styles.titleText}>Set New Due Date:</Text>
        </View>

        <EndDueDatePicker due={due} setDue={setDue} />

        {endError && <Text style={styles.errorText}>{endError}</Text>}

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => {
            handleSave();
          }}
        >
          <Text style={styles.saveBtnText}>Complete Task</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  modal: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ddd",
  },
  heading: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: 700,
    color: "#000",
  },
  titleText: {
    fontSize: 18,
    fontWeight: 700,
    // marginBottom: 4,
  },
  taskTitle: {
    color: "blue",
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 4,
  },
  taskSubTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 20,
  },
  errorText: {
    marginVertical: 6,
    color: "#f80808",
    fontSize: 18,
    fontWeight: 700,
    textAlign: "left",
  },
  saveBtn: {
    marginTop: 20,
    paddingTop: 6,
    paddingBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: "#000",
    borderRadius: 6,
  },
  saveBtnText: {
    fontSize: 18,
    fontWeight: 500,
    color: "#c4c9e7",
  },
});
