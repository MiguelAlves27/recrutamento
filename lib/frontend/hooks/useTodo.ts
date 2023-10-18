import { useState } from "react";

export function useTodo(initialItems?: string[]) {
  const [todos, setTodos] = useState<string[]>(initialItems || []);

  const addItem = (title: string) => {
    setTodos((prevTodos) => [...prevTodos, title]);
  };

  const removeItem = (index: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(index, 1);
      return updatedTodos;
    });
  };

  return {
    todos,
    addTodo: addItem,
    removeTodo: removeItem,
  };
}
