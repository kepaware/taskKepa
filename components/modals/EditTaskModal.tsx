import EditLastDatePicker from "../pickers/EditLastDatePicker";
import EditDueDatePicker from "../pickers/EditDueDatePicker";
import EditFrequencyDD from "../pickers/EditFrequencyDD";
import { SetStateAction } from "react";
import { useState } from "react";
import { useDBFunctions } from "@/lib/DBUSE";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  id: number;
  title: string;
  frequency: string;
  last: string;
  due: string;
  showEditModal: boolean;
  setShowEditModal: React.Dispatch<SetStateAction<boolean>>;
};

export default function EditTaskModal({
  id,
  title,
  frequency,
  last,
  due,
  showEditModal,
  setShowEditModal,
}: Props) {
  const insets = useSafeAreaInsets();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { editTask } = useDBFunctions().useUpdateTask();
  const { removeTask } = useDBFunctions().useDeleteTask();

  const [newTitle, setNewTitle] = useState(title);
  const [newLast, setNewLast] = useState(last);
  const [newDue, setNewDue] = useState(due);
  const [newFrequency, setNewFrequency] = useState(frequency);

  async function handleSave() {
    let update = {
      id: id,
      newTitle: newTitle,
      newFrequency: newFrequency,
      newLast: newLast,
      newDue: newDue,
    };

    editTask({ update });
    setShowEditModal(false);
  }

  async function handleDelete(id: number) {
    removeTask(id);
    setShowEditModal(false);
  }

  const setDelete = () => {
    setIsEditing(false);
    setIsDeleting(true);
  };

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={showEditModal}
      onRequestClose={() => setShowEditModal(false)}
    >
      <View style={[styles.modal, { paddingTop: insets.top }]}>
        <Text style={styles.heading}>Edit Task:</Text>

        {/* Title Input */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.titleText}>Task Description:</Text>

          <TextInput
            autoFocus={true}
            showSoftInputOnFocus={true}
            placeholder=""
            style={styles.titleInput}
            value={newTitle}
            onChangeText={(value) => {
              setNewTitle(value);
              setIsEditing(true);
            }}
          />
        </View>

        {/* Last, Frequency, Due Headings: */}
        <View style={styles.row}>
          <Text style={styles.panel1Text}>Last Done:</Text>
          <Text style={styles.panel2Text}>Frequency:</Text>
          <Text style={styles.panel3Text}>Next Due:</Text>
        </View>

        <View style={styles.panelRow}>
          <EditLastDatePicker
            last={newLast}
            setLast={setNewLast}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
          <EditFrequencyDD
            frequency={newFrequency}
            setFrequency={setNewFrequency}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
          <EditDueDatePicker
            due={newDue}
            setDue={setNewDue}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </View>

        {/* Edit Task Button:  */}
        {isEditing && (
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => {
              handleSave();
            }}
          >
            <Text style={styles.saveBtnText}>Update Task</Text>
          </TouchableOpacity>
        )}

        {!isDeleting && !isEditing && (
          <Pressable onPress={setDelete}>
            <Text style={styles.deleteText}>Delete this task?</Text>
          </Pressable>
        )}

        {/* Delete Task Button:  */}
        {!isEditing && isDeleting && (
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => {
              handleDelete(id);
            }}
          >
            <Text style={styles.deleteBtnText}>Delete Task</Text>
          </TouchableOpacity>
        )}
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
    textAlign: "left",
    paddingLeft: 6,
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
  deleteText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 700,
    color: "blue",
  },
  deleteBtn: {
    marginTop: 20,
    paddingTop: 6,
    paddingBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: "#7a0909",
    borderRadius: 6,
  },
  deleteBtnText: {
    fontSize: 18,
    fontWeight: 500,
    color: "#fff",
  },
});
