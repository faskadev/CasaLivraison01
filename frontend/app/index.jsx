import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.topSection}>
        <Text style={styles.brand}>CasaLivraison</Text>
        <Text style={styles.tagline}>
          Fast delivery at your doorstep
        </Text>
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.welcome}>
          Welcome 👋
        </Text>
        <Text style={styles.description}>
          Discover the best restaurants in Casablanca
          and order your favorite meals in seconds.
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.primaryText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/restaurants")}
        >
          <Text style={styles.secondaryText}>Browse Restaurants</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const PRIMARY = "#FF7A00";
const DARK = "#111";
const LIGHT = "#F4F6F8";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT,
    paddingHorizontal: 25,
    justifyContent: "space-between",
  },

  topSection: {
    marginTop: 60,
  },

  brand: {
    fontSize: 32,
    fontWeight: "800",
    color: PRIMARY,
  },

  tagline: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },

  middleSection: {
    marginVertical: 40,
  },

  welcome: {
    fontSize: 26,
    fontWeight: "700",
    color: DARK,
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },

  bottomSection: {
    marginBottom: 40,
  },

  primaryButton: {
    backgroundColor: PRIMARY,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  secondaryButton: {
    borderWidth: 1.5,
    borderColor: PRIMARY,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  secondaryText: {
    color: PRIMARY,
    fontSize: 16,
    fontWeight: "600",
  },
});