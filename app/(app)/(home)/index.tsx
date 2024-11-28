import { FlatList } from "react-native";
import { PlantCard } from "~/components/plant-card";
import { usePlantStore } from "~/lib/store/plants";
import { theme } from "~/lib/theme";
import { StyleSheet } from "react-native";
import { Button } from "~/components/ui/button";
import { useRouter } from "expo-router";

export default function Page() {
  const { plants } = usePlantStore();
  const router = useRouter();
  return (
    <FlatList
      data={plants}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      renderItem={(plant) => <PlantCard plant={plant.item} />}
      ListEmptyComponent={
        <Button
          title="Add your first plant"
          onPress={() => {
            router.navigate("/new");
          }}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    padding: 12,
  },
});
