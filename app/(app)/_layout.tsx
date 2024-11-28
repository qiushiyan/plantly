import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "~/lib/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="others"
          options={{
            title: "Others",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="miscellaneous-services"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
