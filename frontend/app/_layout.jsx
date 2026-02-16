import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout() {

  return (
    <QueryClientProvider client={queryClient}>

      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="restaurants" options={{ title: "Restaurants" }} />
        <Stack.Screen name="menu" options={{ title: "Menu" }} />
        <Stack.Screen name="order" options={{ title: "Order" }} />
        <Stack.Screen name="myOrders" options={{ title: "My Orders" }} />
      </Stack>

    </QueryClientProvider>

  );

}
