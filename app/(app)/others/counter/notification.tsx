import { Stack, Tabs, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { registerForPushNotificationsAsync } from "~/lib/permission";
import * as Notifications from "expo-notifications";

export default function Details() {
  const router = useRouter();
  const params = useLocalSearchParams();

  async function handleNotification() {
    if ((await registerForPushNotificationsAsync()) === "granted") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You've got mail! 📬",
          body: "Here is the notification body",
          data: { data: "goes here" },
        },

        trigger: { seconds: 2 },
      });
    } else {
      Alert.alert(
        "Permission Denied",
        "Please enable notifications in settings"
      );
    }
  }

  return (
    <View style={styles.container}>
      <Tabs.Screen
        options={{
          title: params.name as string,
        }}
      />
      <Text
        onPress={() => {
          router.setParams({ name: `${Math.random()}` });
        }}
      >
        Update the title
      </Text>
      <Button
        title="go back"
        onPress={() => {
          router.back();
        }}
      />
      <Button title="Send Notification" onPress={() => handleNotification()} />
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
