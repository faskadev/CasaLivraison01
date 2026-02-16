import { useQuery } from "@tanstack/react-query";
import api from "../src/services/api.js";

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";


export default function OrdersScreen() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get("/orders/my");
      return res.data;
    },
  });


  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading orders...</Text>
      </View>
    );
  }


  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Error loading orders</Text>
      </View>
    );
  }


  const renderOrder = ({ item }) => {

    return (
      <View style={styles.card}>

        <Text style={styles.id}>
          Order #{item.id}
        </Text>

        <Text>
          Status: {item.status}
        </Text>

        <Text style={styles.total}>
          Total: {item.total_price} MAD
        </Text>

      </View>
    );
  };


  return (
    <View style={styles.container}>

      <Text style={styles.title}>My Orders</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
      />

    </View>
  );
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },

  id: {
    fontWeight: "bold",
    fontSize: 16,
  },

  total: {
    marginTop: 4,
    fontWeight: "bold",
  },

});
