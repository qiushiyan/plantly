import { LinearGradient } from "expo-linear-gradient";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { View, Text, Button, StyleSheet, Platform } from "react-native";
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
      <View>
        <Image logo />
        <Text style={styles.heading}>Plantly</Text>
      </View>

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
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
    padding: 24,
  },
  heading: {
    fontSize: 36,
    color: theme.colorWhite,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: Platform.select({
      ios: "Caveat-Regular",
      android: "Caveat_400Regular",
    }),
  },
});
