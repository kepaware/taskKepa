import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Pressable, StyleSheet, Text } from "react-native";
import { format } from "date-fns";
import { useState, type SetStateAction } from "react";

type DateProps = {
  last: string;
  setLast: React.Dispatch<SetStateAction<string>>;
};

export default function LastDatePicker({ last, setLast }: DateProps) {
  const [date, setDate] = useState(new Date());

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    const temp = format(currentDate, "dd/MM/yy");
    setLast(temp);
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
    width: 84,
    height: 30,
    justifyContent: "center",
    paddingHorizontal: 8,
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
