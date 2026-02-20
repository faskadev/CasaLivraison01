import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import api from "../src/services/api.js";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
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
      const response = await api.post("/auth/login", { email, password });
      if (response.data.token) {
        await AsyncStorage.setItem("authToken", response.data.token);
      }
      Alert.alert("Success", "Login successful");
      router.replace("/restaurants");
    } catch (error) {
      Alert.alert(
        "Login failed",
        error.response?.data?.message || error.message || "Error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>CasaLivraison</Text>
      <Text style={styles.subHeader}>Sign in to start ordering</Text>

      <TextInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={[styles.button, loading && styles.buttonDisabled]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/register")}
        style={styles.registerButton}
      >
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/index")}
        style={styles.navigateButton}
      >
        <Text style={styles.navigateButtonText}>Go to Home Page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    backgroundColor: "#F0F4F8",
  },
  header: {
    fontSize: 36,
    fontWeight: "700",
    color: "#F59E0B", // برتقالي CasaLivraison
    textAlign: "center",
    marginBottom: 6,
  },
  subHeader: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 28,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 16,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  button: {
    backgroundColor: "#F59E0B", // برتقالي
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: "#FBBF24",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  registerButton: {
    marginTop: 15,
    alignItems: "center",
  },
  registerText: {
    color: "#3B82F6",
    fontSize: 16,
    fontWeight: "500",
  },
  navigateButton: {
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#10B981", 
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  navigateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});