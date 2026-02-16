import { Button } from "@react-navigation/elements";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>CasaLivraison App </Text>
      <Button
        style={styles.button}
        onPress={() => router.push("/login")} >
        <Text style={styles.buttonText}>Go to Login</Text>
      </Button>  

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
