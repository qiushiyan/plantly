import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      showBadge: false,
    });
  }

  // false in the simulator
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    if (existingStatus !== "granted") {
      // even if we don't check for existingStatus, it will not show the popup if the permission is denied before
      const { status } = await Notifications.requestPermissionsAsync();
      return status;
    } else {
      return existingStatus;
    }
  } else {
    return null;
  }
}
