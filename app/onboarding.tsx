import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { View, Text, Button, StyleSheet } from "react-native";
import { Image } from "~/components/ui/image";
import { hasFinishedOnboardingAtom } from "~/lib/store/onboarding";
import { theme } from "~/lib/theme";

export default function OnboardingPage() {
  const [finishedOnboarding, setFinishedOnboarding] = useAtom(
    hasFinishedOnboardingAtom
  );

  const router = useRouter();

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[theme.colorGreen, theme.colorAppleGreen, theme.colorLimeGreen]}
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false, animation: "fade" }} />
      <Image logo />
      <Button
        title="Finish onboarding"
        onPress={() => {
          setFinishedOnboarding(true);
          router.replace("/");
        }}
      />
      <Text>onboarding finished {finishedOnboarding ? "true" : "false"}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
  },
});
