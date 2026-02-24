import { useQuery } from "@tanstack/react-query";
import api from "../src/services/api.js";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from "react-native";

const PRIMARY = "#FF7A00";
const DARK = "#111";
const LIGHT = "#F8F8F8";

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
        <View style={styles.headerRow}>
          <Text style={styles.orderId}>Order #{item.id}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {item.OrderItems.map((orderItem) => (
          <View key={orderItem.id} style={styles.menuItemRow}>
            {orderItem.MenuItem.image_url && (
              <Image
                source={{ uri: orderItem.MenuItem.image_url }}
                style={styles.menuItemImage}
              />
            )}
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemName}>{orderItem.MenuItem.name}</Text>
              <Text style={styles.menuItemQtyPrice}>
                Qty: {orderItem.quantity}  •  {orderItem.price} MAD
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.footerRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalPrice}>{item.total_price} MAD</Text>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={PRIMARY} />
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
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
        contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
        ListHeaderComponent={<Text style={styles.title}>My Orders</Text>}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You don't have any orders yet.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: LIGHT,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 30,
    color: DARK,
    marginBottom: 10,

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

  headerRow: {
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

  menuItemRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  menuItemImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 15,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: "700",
    color: DARK,
  },
  menuItemQtyPrice: {
    fontSize: 15,
    color: "#555",
    marginTop: 4,
  },

  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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