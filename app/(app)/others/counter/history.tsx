import { View, Text, TextInput, StyleSheet } from "react-native";

export default function HistoryPage() {
  return (
    <View style={styles.container}>
      <Text className="text-lg text-red-500">History</Text>
      <TextInput
        className="border-blue-200 border-2 rounded-md p-2 "
        placeholder="text input"
        returnKeyType="done"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
