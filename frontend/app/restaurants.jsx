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
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading restaurants...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Error loading restaurants</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  const renderRestaurant = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "/menu",
            params: { restaurantId: item.id },
          })
        }
      >
        <Text style={styles.name}>{item.name}</Text>

        {item.address && (
          <Text style={styles.address}>{item.address}</Text>
        )}
      </TouchableOpacity>
    );
  };

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
    backgroundColor: "#fff",
    padding: 16,
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

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  address: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
  },

});
