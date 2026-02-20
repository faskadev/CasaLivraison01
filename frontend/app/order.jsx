import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import api from "../src/services/api.js";

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function OrderScreen() {
  const { menuItemId, name, price } = useLocalSearchParams();
  const numericPrice = Number(price);
  const [quantity, setQuantity] = useState(1);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("/orders", {
        items: [
          {
            menu_item_id: Number(menuItemId),
            quantity: quantity,
          },
        ],
      });
      return response.data;
    },
    onSuccess: () => {
      Alert.alert("Success", "Order created successfully");
      router.push("./myOrders");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const total = numericPrice * quantity;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        
       
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* CARD */}
        <View style={styles.card}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>{numericPrice} MAD</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Quantity</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text style={styles.circleText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantity}>{quantity}</Text>

            <TouchableOpacity
              style={styles.circleButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.circleText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>{total} MAD</Text>
          </View>
        </View>
      </View>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => mutation.mutate()}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.orderText}>Confirm Order</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const PRIMARY = "#FF7A00";
const DARK = "#111";
const LIGHT = "#F8F8F8";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: LIGHT,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  back: {
    fontSize: 22,
    fontWeight: "bold",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 40,
  },

  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 5,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
  },

  price: {
    fontSize: 18,
    color: PRIMARY,
    marginTop: 6,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 20,
  },

  label: {
    fontSize: 15,
    color: "#777",
    marginBottom: 10,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },

  circleButton: {
    backgroundColor: PRIMARY,
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  circleText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  quantity: {
    fontSize: 22,
    fontWeight: "600",
    marginHorizontal: 25,
  },

  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 16,
    color: "#777",
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: DARK,
  },

  bottomContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },

  orderButton: {
    backgroundColor: DARK,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 30,
  },

  orderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});