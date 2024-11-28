import { Link } from "expo-router";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button onPress={() => setCount(count + 1)} title="Increment" />

      <Link href="/others/counter/notification" asChild>
        <Button title="Notifications" />
      </Link>
    </View>
  );
}
