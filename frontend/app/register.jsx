import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity
} from "react-native";

import { router } from "expo-router";
import api from "../src/services/api";

export default function RegisterScreen() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);


  const handleRegister = async () => {

    if (!name || !email || !password) {
      Alert.alert("Error", "Fill all fields");
      return;
    }
    try {

      setLoading(true);

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      Alert.alert("Success", "Account created");

      router.replace("/login");

    } catch (error) {

      Alert.alert(
        "Error",
        error.response?.data?.message || "Register failed"
      );

    } finally {
      setLoading(false);
    }

  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Register
      </Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input} />

      <TouchableOpacity
        title={loading ? "Creating..." : "Register"}
        onPress={handleRegister}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{loading ? "Creating..." : "Register"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/login")}
      >
        <Text style={styles.link}>
          Already have account? Login
        </Text>
      </TouchableOpacity>

    </View>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },

  link: {
    marginTop: 15,
    textAlign: "center",
    color: "blue",
  },
button: {
    backgroundColor: "#ffa600",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
buttonText: {
    color: "white",
    fontWeight: "bold",},
registerButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
});

