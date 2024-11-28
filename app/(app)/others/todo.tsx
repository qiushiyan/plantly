import {
  FlatList,
  LayoutAnimation,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { cn } from "~/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { listTodoOptions } from "~/lib/features/todo/queries";
import {
  useAddTodo,
  useClearTodos,
  useDeleteTodo,
  useToggleTodo,
} from "~/lib/features/todo/mutations";
import { defaultTodos } from "~/lib/features/todo";
import * as Haptics from "expo-haptics";

const todos = [
  {
    id: 1,
    title: "Buy milk",
    completed: false,
  },
  {
    id: 2,
    title: "Buy eggs",
    completed: true,
  },
  {
    id: 3,
    title: "Buy bread",
    completed: false,
  },
];

type Todo = (typeof todos)[number];

export default function TodoPage() {
  const { data, isPlaceholderData } = useQuery({
    ...listTodoOptions,
    placeholderData: defaultTodos,
  });
  const { mutate: handleAdd } = useAddTodo();
  const { mutate: handleDelete } = useDeleteTodo();
  const { mutate: handleToggle } = useToggleTodo();
  const { mutate: clearTodos } = useClearTodos();

  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      data={data}
      className={isPlaceholderData ? "opacity-50" : ""}
      contentContainerStyle={{
        padding: 20,
        gap: 10,
      }}
      ListHeaderComponent={
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            className="border-blue-200 border-2 rounded-md mb-4 p-2"
            placeholder="Add new todo"
            returnKeyType="done"
            style={{ flex: 1 }}
            onSubmitEditing={(e) => {
              handleAdd(e.nativeEvent.text);
            }}
          />
          <TouchableOpacity onPress={() => clearTodos()}>
            <MaterialIcons name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      }
      ListEmptyComponent={ListEmptyComponent}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          onDelete={handleDelete}
          onToggle={(id) => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            handleToggle(id);
          }}
        />
      )}
    />
  );
}

function ListEmptyComponent() {
  return <Text>No todos</Text>;
}

function TodoItem({
  todo,
  onDelete,
  onToggle,
}: {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}) {
  return (
    <TouchableOpacity
      className={cn("border-2 rounded-md px-6 py-4", {
        "border-blue-500": todo.completed,
      })}
      style={{ justifyContent: "space-between", flexDirection: "row" }}
      onPress={() => onToggle(todo.id)}
    >
      <Text className="text-lg font-medium">{todo.title}</Text>
      <TouchableOpacity onPress={() => onDelete(todo.id)}>
        <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
