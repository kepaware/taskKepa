import LastDatePicker from "../LastDatePicker";
import DueDatePicker from "../DueDatePicker";
import FrequencyPicker from "../FrequencyPicker";
import { SetStateAction } from "react";
import { useState } from "react";
import { useDBFunctions } from "@/lib/DBUSE";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Modal,
  StyleSheet,
  Text,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type AddProps = {
  item: {
    newLabel: string;
    newCategory: string;
  };
};

type Props = {
  showTaskModal: boolean;
  setShowTaskModal: React.Dispatch<SetStateAction<boolean>>;
};

export default function AddTaskModal({
  showTaskModal,
  setShowTaskModal,
}: Props) {
  const insets = useSafeAreaInsets();
  // const { newItem } = useDBFunctions().useAddItem();

  const [title, setTitle] = useState("");
  const [last, setLast] = useState("Select");
  const [due, setDue] = useState("Select");
  const [frequency, setFrequency] = useState("Select");
  const [multiple, setMultiple] = useState(false);

  const clearInputs = () => {
    setTitle("");
    setFrequency("");
    setLast("Select");
    setDue("Select");
  };

  const toggleSwitch = () => {
    setMultiple((previousState) => !previousState);
  };

  async function handleSave() {
    let task = {
      newTitle: title,
      newFrequency: frequency,
      newLast: last,
      newDue: due,
    };

    console.log(task);

    // newItem({ item });

    if (!multiple) {
      clearInputs();
      setShowTaskModal(false);
    } else {
      clearInputs();
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={showTaskModal}
      onRequestClose={() => setShowTaskModal(false)}
    >
      <View style={[styles.modal, { paddingTop: insets.top }]}>
        <Text style={styles.heading}>Add New Item:</Text>

        {/* Title Input */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.titleText}>Task Description:</Text>

          <TextInput
            autoFocus={true}
            showSoftInputOnFocus={true}
            placeholder=""
            style={styles.titleInput}
            value={title}
            onChangeText={(value) => {
              setTitle(value);
            }}
          />
        </View>

        {/* Last, Frequency, Due Headings: */}
        <View style={styles.row}>
          <Text style={styles.panel1Text}>Last Done:</Text>
          <Text style={styles.panel2Text}>Frequency:</Text>
          <Text style={styles.panel3Text}>Next Due:</Text>
        </View>

        {/* Last, Frequency, Due Panel: */}
        <View style={styles.panelRow}>
          <LastDatePicker last={last} setLast={setLast} />
          <FrequencyPicker frequency={frequency} setFrequency={setFrequency} />
          <DueDatePicker due={due} setDue={setDue} />
        </View>

        {/* Toggle Switch: */}
        <View style={styles.switchSection}>
          <Text style={styles.switchText}>Create Multiple Tasks:</Text>

          <Switch
            trackColor={{ false: "#999", true: "#2427d8" }}
            thumbColor={multiple ? "#2427d8" : "#999"}
            value={multiple}
            onValueChange={toggleSwitch}
          />
        </View>

        {/* Add Item Button:  */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => {
            handleSave();
          }}
        >
          <Text style={styles.saveBtnText}>Add New Task</Text>
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
    fontWeight: 500,
    color: "blue",
  },
  titleText: {
    fontSize: 14,
    marginBottom: 4,
  },
  titleInput: {
    marginTop: 4,
    color: "#000",
    height: 38,
    width: 300,
    fontSize: 16,
    paddingLeft: 8,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  row: {
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  panelRow: {
    width: 300,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  panel1Text: {
    width: "34%",
    paddingTop: 4,
    paddingBottom: 6,
    textAlign: "center",
    color: "#000",
  },
  panel2Text: {
    width: "auto",
    fontWeight: 600,
    paddingTop: 4,
    paddingBottom: 6,
  },
  panel3Text: {
    width: "34%",
    paddingTop: 4,
    paddingBottom: 6,
    paddingHorizontal: 8,
    textAlign: "right",
  },
  panel1: {
    width: "34%",
    paddingTop: 4,
    paddingBottom: 6,
    paddingHorizontal: 8,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#000",
  },
  panel2: {
    width: 128,
    fontWeight: 600,
    paddingTop: 4,
    paddingBottom: 6,
    backgroundColor: "#fff",
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
  borderTop: {
    marginTop: 26,
    width: 300,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  messageText1: {
    color: "#000",
    marginTop: 20,
    fontSize: 17,
  },
  modalInputText: {
    fontSize: 16,
    paddingLeft: 8,
    textAlignVertical: "center",
  },
  switchSection: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  switchText: {
    marginLeft: 6,
    color: "#000",
    fontSize: 18,
    fontWeight: 600,
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
