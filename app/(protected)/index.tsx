import ItemModal from "@/components/modals/ItemModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDBFunctions } from "@/lib/DBUSE";
import { Link } from "expo-router";
import { useState } from "react";
import { DateFunctions } from "@/utils/DateUtils";

import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const date = DateFunctions().getTimestamp();
  const { isPending: isCollecting, user } = useDBFunctions().useGetUser();
  // const { isPending, items } = useDBFunctions().useFetchAll();
  // const { isFetching, listItems } = useDBFunctions().useFetchListItems();
  const [showItemModal, setShowItemModal] = useState(false);

  // if (isPending || isFetching || isCollecting)
  if (isCollecting)
    return (
      <SafeAreaView style={[styles.container]}>
        <Text style={{ marginTop: 50, fontSize: 16, fontWeight: 600 }}>
          Loading data...
        </Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{date}</Text>
      </View>
      {/* <Link style={{ position: "absolute", bottom: 220 }} href={"./account"}>
        <Ionicons name="person" color="#3854f0" size={40} />
      </Link> */}

      <Pressable style={styles.link} onPress={() => setShowItemModal(true)}>
        <Ionicons name="add-circle" color="black" size={50} />
      </Pressable>

      <View style={styles.btmSection}>
        <Text style={styles.copyright}>&copy;kepaWare 2025 </Text>
      </View>

      {/* --------------------- Modals: --------------------  */}

      <ItemModal
        showItemModal={showItemModal}
        setShowItemModal={setShowItemModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    marginTop: 6,
    width: "100%",
    height: 56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  welcome: {
    marginTop: 80,
    fontSize: 22,
    fontWeight: 700,
    color: "black",
  },
  heading: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 700,
    color: "blue",
  },
  headerText: {
    fontSize: 20,
    color: "#2573e7",
    fontWeight: 700,
  },
  stats: {
    flex: 1,
    position: "absolute",
    bottom: 340,
  },
  statsText: {
    fontSize: 20,
    fontWeight: 700,
  },
  link: {
    position: "absolute",
    bottom: 110,
    padding: 10,
  },
  btmSection: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 28,
    marginTop: 20,
  },
  copyright: {
    fontSize: 16,
    fontWeight: 600,
    color: "#999",
  },
});
