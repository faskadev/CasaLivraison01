import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
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
    paddingHorizontal: 25,
    justifyContent: "space-between",
    backgroundColor: LIGHT,
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  logo: {
    width: 220,
    height: 200,
    marginTop:100,
  },

  topSection: {
    marginTop: 0,
    alignItems: "center",
  },

  brand: {
    fontSize: 32,
    fontWeight: "800",
    color: PRIMARY,
  },

  tagline: {
    fontSize: 24,
    color: "#666",
    marginTop: 8,
    fontFamily: "Poppins-Regular",
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
    marginBottom: 40,

  },

  secondaryText: {
    color: PRIMARY,
    fontSize: 16,
    fontWeight: "600",
  },
});