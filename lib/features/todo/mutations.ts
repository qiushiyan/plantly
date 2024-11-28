import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getStorageItem, setStorageItem } from "../../storage";
import { Todo } from ".";
import { listTodoOptions } from "./queries";

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (text: string) => {
      const todos = await getStorageItem("todos");
      const data = todos ? JSON.parse(todos) : [];
      const newTodo: Todo = {
        id: data.length + 1,
        title: text,
        completed: false,
      };
      await setStorageItem("todos", JSON.stringify([...data, newTodo]));
    },
    onMutate: async (text: string) => {
      const snapshot = queryClient.getQueryData(listTodoOptions.queryKey);
      queryClient.setQueryData(listTodoOptions.queryKey, (prev) => {
        if (!prev) return prev;
        return [
          ...prev,
          { id: prev.length + 1, title: text, completed: false },
        ];
      });

      return () => {
        queryClient.setQueryData(listTodoOptions.queryKey, snapshot);
      };
    },
    onError: (err, variables, rollback) => {
      if (rollback) {
        rollback();
      }
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const todos = await getStorageItem("todos");
      if (todos) {
        const data = JSON.parse(todos) as Todo[];
        const newTodos = data.filter((todo) => todo.id !== id);
        await setStorageItem("todos", JSON.stringify(newTodos));
      }
    },
    onMutate: async (id: number) => {
      const snapshot = queryClient.getQueryData(listTodoOptions.queryKey);

      queryClient.setQueryData(listTodoOptions.queryKey, (prev) => {
        if (!prev) return prev;
        return prev.filter((todo) => todo.id !== id);
      });

      return () => {
        queryClient.setQueryData(listTodoOptions.queryKey, snapshot);
      };
    },
    onError: (err, variables, rollback) => {
      if (rollback) {
        rollback();
      }
    },
  });
};

export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const todos = await getStorageItem("todos");
      if (todos) {
        const data = JSON.parse(todos) as Todo[];
        const idx = data.findIndex((todo) => todo.id === id);
        if (idx === -1) return;

        const newTodos = [
          ...data.slice(0, idx),
          ...data.slice(idx + 1),
          {
            ...data[idx],
            completed: !data[idx].completed,
          },
        ];
        await setStorageItem("todos", JSON.stringify(newTodos));
      }
    },
    onMutate: async (id: number) => {
      const snapshot = queryClient.getQueryData(listTodoOptions.queryKey);

      queryClient.setQueryData(listTodoOptions.queryKey, (prev) => {
        if (!prev) return prev;
        const idx = prev.findIndex((todo) => todo.id === id);
        if (idx === -1) return prev;
        return [
          ...prev.slice(0, idx),
          ...prev.slice(idx + 1),
          {
            ...prev[idx],
            completed: !prev[idx].completed,
          },
        ];
      });

      return () => {
        queryClient.setQueryData(listTodoOptions.queryKey, snapshot);
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: listTodoOptions.queryKey,
      });
    },
    onError: (err, variables, rollback) => {
      if (rollback) {
        rollback();
      }
    },
  });
};

export const useClearTodos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await setStorageItem("todos", JSON.stringify([]));
    },
    onMutate: async () => {
      queryClient.setQueryData(listTodoOptions.queryKey, []);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: listTodoOptions.queryKey,
      });
    },
  });
};
