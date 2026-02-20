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
        <ActivityIndicator size="large" color="#FF6347" />
        <Text style={{ marginTop: 10, fontSize: 16 }}>Loading menu...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 16, color: "red" }}>Error loading menu</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        {item.image_url && (
          <Image source={{ uri: item.image_url }} style={styles.image} />
        )}
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          {item.ingredients && (
            <Text style={styles.ingredients}>{item.ingredients}</Text>
          )}
          <Text style={styles.price}>{item.price} MAD</Text>
          <TouchableOpacity
            style={styles.button}
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
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Menu</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    padding: 16,
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

  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 12,
    overflow: "hidden",
  },

  image: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },

  info: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  ingredients: {
    fontSize: 13,
    color: "#666",
    marginVertical: 4,
  },

  price: {
    fontSize: 16,
    color: "#FF6347",
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#FF6347",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});