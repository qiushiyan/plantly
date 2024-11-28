import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text className="text-slate-800 text-xl tracking-tighter">
        Hello world 2
      </Text>
      <StatusBar style="auto" />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => {
            router.push("/others/counter");
          }}
        >
          <Text>Counter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => {
            router.push("/others/todo");
          }}
        >
          <Text>Manage todo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => {
            router.push("/others/counter/history");
          }}
        >
          <Text>History</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Button title="onboarding" onPress={() => router.push("/onboarding")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "blue",
  },
});
