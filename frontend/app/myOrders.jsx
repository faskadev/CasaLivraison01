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
        <ActivityIndicator size="large" color="#FF6347" />
        <Text style={{ marginTop: 10, fontSize: 16 }}>Loading orders...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 16, color: "red" }}>Error loading orders</Text>
      </View>
    );
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#FFA500"; // برتقالي
      case "completed":
        return "#32CD32"; // أخضر
      case "canceled":
        return "#FF4500"; // أحمر
      default:
        return "#808080"; // رمادي
    }
  };

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.id}>Order #{item.id}</Text>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
          {item.status}
        </Text>
      </View>

      <Text style={styles.total}>Total: {item.total_price} MAD</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF8F0",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FF6347",
    marginBottom: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  id: {
    fontWeight: "bold",
    fontSize: 16,
  },

  status: {
    fontWeight: "600",
    fontSize: 14,
  },

  total: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#333",
  },
});