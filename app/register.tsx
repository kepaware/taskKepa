import { useContext, useState } from "react";
import { AuthContext } from "@/utils/authContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";

export default function Register() {
  const db = useSQLiteContext();
  const authContext = useContext(AuthContext);
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    try {
      await db
        .runAsync(
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
          name,
          newEmail,
          newPassword
        )
        .then(() => {
          authContext.setRegister(false);
        });
    } catch (error) {
      console.log("ERROR: ", error);
    }

    // setLoading(true);
    // const {
    //   data: { session },
    //   error,
    // } = await supabase.auth.signUp({
    //   email: newEmail,
    //   password: newPassword,
    //   options: {
    //     data: {
    //       username: name,
    //     },
    //   },
    // });
    // if (error) Alert.alert(error.message);
    // setLoading(false);
    // authContext.logIn();
  }

  if (loading) return <Text>Loading...</Text>;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <Text style={styles.heading}>Register a New User:</Text>

      <View style={styles.inputSection}>
        <Text style={styles.inputTitle}>Display Name:</Text>
        <TextInput
          autoFocus={true}
          showSoftInputOnFocus={true}
          style={styles.textInput}
          placeholder="Display Name"
          defaultValue={name}
          onChangeText={(newText) => setName(newText)}
          autoCapitalize="none"
        />

        <Text style={styles.inputTitle}>Email:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email Address"
          defaultValue={newEmail}
          onChangeText={(newText) => setNewEmail(newText)}
          autoCapitalize="none"
        />

        <Text style={styles.inputTitle}>Password:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          defaultValue={newPassword}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(newText) => setNewPassword(newText)}
        />

        <View style={styles.submitSection}>
          <Pressable onPress={() => signUpWithEmail()} style={styles.submitBtn}>
            <Text style={styles.btnText}>Register New User</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  heading: {
    fontSize: 18,
    fontWeight: 600,
    color: "blue",
    marginVertical: 20,
  },
  inputSection: {
    width: "70%",
    flex: 1,
    justifyContent: "flex-start",
    // marginBottom: 20,
    // backgroundColor: "#ddd",
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: 400,
    color: "black",
    marginBottom: 8,
    marginLeft: 2,
  },
  textInput: {
    width: "100%",
    height: 38,
    paddingLeft: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
    textAlignVertical: "center",
    marginBottom: 20,
  },
  submitSection: {
    width: "100%",
    marginTop: 20,
    // justifyContent: "center",
    alignItems: "center",
  },
  submitBtn: {
    // width: 160,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "darkblue",
    // marginBottom: 60,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
  },
});
