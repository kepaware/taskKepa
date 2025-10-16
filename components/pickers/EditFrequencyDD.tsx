import { frequencies } from "../frequencies";
import { useState, type SetStateAction } from "react";
import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";

type Props = {
  frequency: string;
  isEditing: boolean;
  setFrequency: React.Dispatch<SetStateAction<string>>;
  setIsEditing: React.Dispatch<SetStateAction<boolean>>;
};

type Item = {
  id: number;
  label: string;
  value: string;
};

type RenderProps = {
  item: Item;
  index: number;
};

export default function EditFrequencyDD({
  frequency,
  isEditing,
  setFrequency,
  setIsEditing,
}: Props) {
  const data = frequencies;
  const [showList, setShowList] = useState(false);

  function selectItem(label: string) {
    setFrequency(label);
    setShowList(false);

    if (!isEditing) {
      setIsEditing(true);
    }
  }

  const renderItem = ({ item, index }: RenderProps) => {
    const isFirst = index === 0;
    const isLast = index === data.length - 1;

    // Apply conditional styles
    const itemStyle = [
      styles.item,
      isFirst && styles.firstItem,
      isLast && styles.lastItem,
    ];

    return (
      <Pressable onPress={() => selectItem(item.label)} style={itemStyle}>
        <Text style={styles.itemText}>{item.label}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Button: */}
      <Pressable style={styles.selectButton} onPress={() => setShowList(true)}>
        <Text style={{ textAlign: "center" }}>{frequency}</Text>
      </Pressable>

      {/* List: */}
      {showList && (
        <FlatList
          style={styles.listContainer}
          data={data}
          renderItem={renderItem}
          keyExtractor={({ id }) => id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 128,
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  selectButton: {
    width: 128,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  listContainer: {
    position: "absolute",
    width: 128,
    top: 40,
    height: "auto",
    zIndex: 10,
    backgroundColor: "#fff",
    paddingVertical: 4,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  item: {
    height: 34,
    paddingLeft: 26,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 14,
    fontWeight: 600,
  },
  firstItem: {
    paddingTop: 4,
  },
  lastItem: {
    paddingBottom: 6, // Unique style for the last item
  },
});
