export const todoKeys = {
  all: () => ["todos"],
  item: (id: number) => [...todoKeys.all(), id],
};

export const defaultTodos = [
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

export type Todo = (typeof defaultTodos)[number];
