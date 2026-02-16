import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../src/services/api.js";

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
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
          }
        ]
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
    <View style={styles.container}>

      <Text style={styles.title}>Order</Text>


      <View style={styles.card}>

        <Text style={styles.name}>{name}</Text>

        <Text style={styles.price}>{numericPrice} MAD</Text>


        <Text style={styles.label}>Quantity</Text>

        <View style={styles.row}>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              setQuantity(Math.max(1, quantity - 1))
            }
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>


          <Text style={styles.quantity}>
            {quantity}
          </Text>


          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              setQuantity(quantity + 1)
            }
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>

        </View>


        <Text style={styles.total}>
          Total: {total} MAD
        </Text>


        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => mutation.mutate()}
          disabled={mutation.isPending}
        >

          {mutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.orderText}>
              Confirm Order
            </Text>
          )}

        </TouchableOpacity>


      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#f2f2f2",
    padding: 20,
    borderRadius: 10,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
  },

  price: {
    fontSize: 18,
    color: "green",
    marginTop: 5,
  },

  label: {
    marginTop: 20,
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  button: {
    backgroundColor: "#ffa600",
    padding: 10,
    borderRadius: 5,
    width: 40,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
  },

  quantity: {
    fontSize: 18,
    marginHorizontal: 20,
  },

  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },

  orderButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },

  orderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

});
