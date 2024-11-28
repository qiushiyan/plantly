import { Stack } from "expo-router";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="notification" options={{ headerShown: false }} />
      <Stack.Screen name="history" options={{ headerShown: false }} />
    </Stack>
  );
}
