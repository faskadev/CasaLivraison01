import { Button } from "@react-navigation/elements";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Welcome to CasaLivraison 🚀</Text>

      <TouchableOpacity
        style={styles.ctaButton}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.ctaText}>Login Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E3A8A",
    marginBottom: 40,
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "#F59E0B",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  ctaText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
