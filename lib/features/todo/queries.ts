import { queryOptions } from "@tanstack/react-query";
import { getStorageItem, setStorageItem } from "../../storage";
import { delay } from "../../utils";
import { defaultTodos, todoKeys } from ".";

export const listTodoOptions = queryOptions({
  queryKey: todoKeys.all(),
  queryFn: async () => {
    await delay(1000);
    const data = await getStorageItem("todos");
    if (data) {
      return JSON.parse(data) as typeof defaultTodos;
    }

    await setStorageItem("todos", JSON.stringify(defaultTodos));

    return defaultTodos;
  },
});
