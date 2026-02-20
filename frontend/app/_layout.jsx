import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "react-native";


const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      
      
      <StatusBar barStyle="dark-content" />

      
      <Stack
        screenOptions={{
          headerShown: false, 
          contentStyle: {
            backgroundColor: "#743c3c", 
          },
        }}
      />

    </QueryClientProvider>
  );
}