import { useQuery } from "@tanstack/react-query";
import api from "../src/services/api.js";

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function OrdersScreen() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get("/orders/my");
      return res.data;
    },
  });

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return { bg: "#FFF3E0", color: "#FB8C00" };
      case "completed":
        return { bg: "#E8F5E9", color: "#2E7D32" };
      case "canceled":
        return { bg: "#FDECEA", color: "#C62828" };
      default:
        return { bg: "#EEEEEE", color: "#616161" };
    }
  };

  const renderOrder = ({ item }) => {
    const statusStyle = getStatusStyles(item.status);

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.orderId}>Order #{item.id}</Text>

          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusStyle.bg },
            ]}
          >
            <Text style={[styles.statusText, { color: statusStyle.color }]}>
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalPrice}>{item.total_price} MAD</Text>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF7A00" />
        <Text style={styles.loadingText}>Loading your orders...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load orders</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>My Orders</Text>

        {data?.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              You don't have any orders yet.
            </Text>
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOrder}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        )}
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

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: DARK,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 15,
    color: "#555",
  },

  errorText: {
    fontSize: 16,
    color: "#C62828",
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: {
    fontSize: 16,
    fontWeight: "600",
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 13,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 15,
  },

  totalLabel: {
    fontSize: 14,
    color: "#777",
  },

  totalPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: PRIMARY,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#777",
  },
});