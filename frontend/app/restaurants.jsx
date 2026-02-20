import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
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

export default function RestaurantsScreen() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const response = await api.get("/restaurants");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6347" />
        <Text style={{ marginTop: 10, fontSize: 16 }}>Loading restaurants...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 16, color: "red" }}>Error loading restaurants</Text>
        <Text>{error?.message || "Unknown error"}</Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No restaurants available</Text>
      </View>
    );
  }

  const renderRestaurant = ({ item }) => (
    
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: "/menu", params: { restaurantId: item.id } })}
    >
      {item.image_url && <Image source={{ uri: item.image_url }} style={styles.image} />}

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        {item.category && <Text style={styles.category}>{item.category}</Text>}
        {item.description && <Text style={styles.description}>{item.description}</Text>}
        {item.rating && <Text style={styles.rating}>Rating: {item.rating.toFixed(1)} / 5</Text>}
        {item.address && <Text style={styles.address}>{item.address}</Text>}
      </View>
    </TouchableOpacity>
            
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurants</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRestaurant}
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
    marginTop: 25,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 200,
  },

  info: {
    padding: 12,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },

  category: {
    fontSize: 14,
    color: "#FF7A00",
    fontWeight: "600",
    marginBottom: 4,
  },

  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },

  rating: {
    fontSize: 14,
    color: "#FF7A00",
    fontWeight: "600",
    marginBottom: 4,
  },

  address: {
    fontSize: 14,
    color: "#666",
  },
});