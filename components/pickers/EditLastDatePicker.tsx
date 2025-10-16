import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Pressable, StyleSheet, Text } from "react-native";
import { format } from "date-fns";
import { useState, type SetStateAction } from "react";

type DateProps = {
  last: string;
  isEditing: boolean;
  setLast: React.Dispatch<SetStateAction<string>>;
  setIsEditing: React.Dispatch<SetStateAction<boolean>>;
};

export default function EditLastDatePicker({
  last,
  isEditing,
  setLast,
  setIsEditing,
}: DateProps) {
  const [date, setDate] = useState(new Date());

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    const temp = format(currentDate, "dd/MM/yy");
    setLast(temp);

    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <Pressable style={styles.panel1} onPress={showDatepicker}>
      <Text style={styles.panel1Text}>{last}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  panel1: {
    width: 80,
    height: 36,
    justifyContent: "center",
    paddingHorizontal: 8,
    borderTopLeftRadius: 6,
    color: "#fff",
    backgroundColor: "#000",
  },
  panel1Text: {
    width: "100%",
    height: 20,
    paddingBottom: 4,
    textAlign: "center",
    color: "#fff",
  },
});
