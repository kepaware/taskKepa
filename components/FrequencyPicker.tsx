import { Dropdown } from "react-native-element-dropdown";
import type { SetStateAction } from "react";
import { StyleSheet, Pressable } from "react-native";
import { useRef, useState } from "react";

type Props = {
  frequency: string;
  setFrequency: React.Dispatch<SetStateAction<string>>;
};

const data = [
  { label: "Weekly", value: "Weekly" },
  { label: "Fortnightly", value: "Fortnightly" },
  { label: "Monthly", value: "Monthly" },
];

export default function FrequencyPicker({ frequency, setFrequency }: Props) {
  return (
    // <Pressable style={styles.panel2}>
    <Dropdown
      data={data}
      labelField="label"
      valueField="value"
      placeholder="Select"
      dropdownPosition="bottom"
      itemContainerStyle={styles.ListContainer}
      activeColor="#000"
      style={styles.dropdown}
      value={frequency}
      onChange={(item) => setFrequency(item.value)}
    />
    // </Pressable>
  );
}

const styles = StyleSheet.create({
  //DropdownButton:
  dropdown: {
    width: 128,
    height: 30,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  panel2Text: {
    width: "auto",
    fontWeight: 600,
    paddingTop: 4,
    paddingBottom: 6,
  },
  ListContainer: {
    marginTop: 0,
    width: 128,
    // backgroundColor: "#000",
  },
});
