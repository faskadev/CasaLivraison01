import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";
import api from "../src/services/api.js";

export default function LoginScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    console.log("BASE URL:", api?.defaults?.baseURL);
    console.log("API object exists:", !!api);

    if (!api) {
      Alert.alert("Error", "API client not initialized");
      return;
    }

    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {

      setLoading(true);

      console.log("Sending login request to:", api.defaults.baseURL);

      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });
      console.log("Login success:", response.data);
      if (response.data.token) {
        await AsyncStorage.setItem("authToken", response.data.token);
      }
      Alert.alert("Success", "Login successful");
      router.replace("/restaurants");

    } catch (error) {

      console.log("Login error object:", error);
      console.log("Error response:", error.response?.data);
      console.log("Error message:", error.message);

      Alert.alert(
        "Login failed",
        error.response?.data?.message || error.message || "Error occurred"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        CasaLivraison Login
      </Text>

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
        style={styles.input}
      />

      <TouchableOpacity
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        title="Don't have an account? Register"
        onPress={() => router.push("/register")}
        style={styles.registerButton}
      >
        <Text style={styles.registerButtonText}>Dont have an account? Register</Text>
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
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#ffa600",
    padding: 15,
    borderRadius: 5,
  },
  registerButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  registerButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  }

});
