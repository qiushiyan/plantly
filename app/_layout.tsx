import { Stack, useRouter } from "expo-router";
import "../styles/globals.css";
import { useEffect } from "react";
import * as QuickActions from "expo-quick-actions";
import { useQuickAction } from "expo-quick-actions/hooks";
import { Platform } from "react-native";

export default function Layout() {
  const action = useQuickAction();
  const router = useRouter();

  useEffect(() => {
    if (action?.params) {
      if (typeof action.params.href === "string") {
        router.navigate(action.params.href);
      }
    }
  }, [action, router]);

  useEffect(() => {
    QuickActions.setItems([
      {
        id: "0",
        title: "New Plant",
        icon: Platform.select({
          ios: "symbol:leaf",
          android: "leaf",
        }),
        params: {
          href: "/new",
        },
      },
    ]);
  }, []);

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
      <Stack.Screen
        name="onboarding"
        options={{
          presentation: "modal",
          headerShown: false,
          animation: "fade",
        }}
      />
    </Stack>
  );
}
