import { StyleSheet, Text, Pressable, Platform } from "react-native";
import * as Haptics from "expo-haptics";
import { theme } from "~/lib/theme";

type Props = {
  title: string;
  onPress: () => void;
};

export function Button({ title, onPress }: Props) {
  const handlePressed = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  return (
    <Pressable onPress={handlePressed}>
      <Text className="text-lg font-bold text-center">{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: theme.colorGreen,
  },
  buttonPressed: {
    backgroundColor: theme.colorLeafyGreen,
  },
});
