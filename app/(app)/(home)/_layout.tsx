import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "~/lib/theme";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: () => (
            <Link href="/new" asChild>
              <Pressable hitSlop={20} style={{ marginRight: 18 }}>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={theme.colorGreen}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="plants/[id]"
        options={{
          title: "",
          headerTintColor: theme.colorBlack,
        }}
      />
    </Stack>
  );
}
