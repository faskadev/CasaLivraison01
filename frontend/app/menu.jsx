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
        <ActivityIndicator size="large" />
        <Text>Loading menu...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Error loading menu</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
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
        {item.image_url && (
          <Image
            source={{ uri: item.image_url }}
            style={styles.image}
          />
        )}
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price} MAD</Text>
        {item.ingredients && (
          <Text style={styles.ingredients}>
            {item.ingredients}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Menu</Text>

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

  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  price: {
    fontSize: 16,
    color: "green",
    marginTop: 4,
  },

  ingredients: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
  },

});
