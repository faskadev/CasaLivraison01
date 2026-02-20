import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, router } from "expo-router";
import api from "../src/services/api.js";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function MenuScreen() {
  const { restaurantId } = useLocalSearchParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["menu", restaurantId],
    queryFn: async () => {
      const response = await api.get(`/menuItem/restaurant/${restaurantId}`);
      return response.data;
    },
    enabled: !!restaurantId,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF7A00" />
        <Text style={styles.loadingText}>Loading menu...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error loading menu</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.image_url && (
        <Image source={{ uri: item.image_url }} style={styles.image} />
      )}

      <View style={styles.overlay}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>

          {item.ingredients && (
            <Text style={styles.ingredients} numberOfLines={2}>
              {item.ingredients}
            </Text>
          )}

          <Text style={styles.price}>{item.price} MAD</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push({
              pathname: "/order",
              params: {
                menuItemId: item.id,
                name: item.name,
                price: item.price,
              },
            })
          }
        >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        <Text style={styles.title}>Our Menu</Text>

        {data?.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.emptyText}>No items available</Text>
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
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
const LIGHT = "#F9F9F9";

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
    color: "red",
    marginBottom: 5,
  },

  emptyText: {
    fontSize: 16,
    color: "#777",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  image: {
    width: "100%",
    height: 180,
  },

  overlay: {
    flexDirection: "row",
    padding: 18,
    alignItems: "center",
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },

  ingredients: {
    fontSize: 13,
    color: "#777",
    marginBottom: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: "700",
    color: PRIMARY,
  },

  addButton: {
    backgroundColor: PRIMARY,
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  addText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});