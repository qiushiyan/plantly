import { Stack } from "expo-router";
import "../styles/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack>
      <Stack.Screen
        name="(app)"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="new"
        options={{ presentation: "modal", title: "New Plant" }}
      />
    </Stack>
  );
}
