import {
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Platform,
  Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { startTransition, useState } from "react";
import { theme } from "~/lib/theme";
import * as Haptics from "expo-haptics";
import * as FileSystem from "expo-file-system";

import { Image } from "~/components/ui/image";
import { usePlantStore } from "~/lib/store/plants";

export default function NewScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [days, setDays] = useState("");
  const [imageUri, setImageUri] = useState("");
  const { addPlant } = usePlantStore();

  const handleSubmit = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (!name) {
      return Alert.alert("Validation Error", "Give your plant a name");
    }
    if (!days) {
      return Alert.alert(
        "Validation Error",
        `How often does ${name} need to be watered?`
      );
    }
    if (Number.isNaN(Number(days))) {
      return Alert.alert(
        "Validation Error",
        "Watering frequency must be a be a number"
      );
    }

    let savedImageUri: string | undefined;
    if (imageUri) {
      savedImageUri =
        FileSystem.documentDirectory +
        `${new Date().getTime()}-${imageUri.split("/").slice(-1)[0]}`;
      await FileSystem.copyAsync({
        from: imageUri,
        to: savedImageUri,
      });
    }

    startTransition(() => {
      addPlant(name, Number(days), savedImageUri);
      router.replace("/");
    });
  };

  const handleChooseImage = async () => {
    if (Platform.OS === "web") {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={styles.centered}
        onPress={handleChooseImage}
        activeOpacity={0.8}
      >
        {imageUri ? <Image imageUri={imageUri} /> : <Image logo />}
      </TouchableOpacity>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="E.g. Casper the Cactus"
        autoCapitalize="sentences"
      />
      <Text style={styles.label}>Watering Frequency (every x days)</Text>
      <TextInput
        value={days}
        onChangeText={setDays}
        style={styles.input}
        placeholder="E.g. 6"
        keyboardType="number-pad"
      />
      <Pressable className="bg-[#d0e57e] rounded-md p-4" onPress={handleSubmit}>
        <Text className="text-xl font-bold text-center">Add Plant</Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
}

const buttonStyles = StyleSheet.create({
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colorLightGrey,
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  centered: {
    alignItems: "center",
    marginBottom: 24,
  },
});
