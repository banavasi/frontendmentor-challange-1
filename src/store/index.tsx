import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Todo, TodoStore } from "../types/todo";

// 1. Define default state
const defaultState: TodoStore = {
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
  toggleTodo: () => {},
  clearCompletedTasks: () => {},
  showCompletedTasks: () => {},
  showActiveTasks: () => {},
};

// 2. Create store and add persistence middleware
export const useTodosStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      ...defaultState,
      addTodo: (newTodo: Todo) => set({ todos: [...get().todos, newTodo] }),
      deleteTodo: (todoId: number) =>
        set({ todos: get().todos.filter((todo: Todo) => todo.id !== todoId) }),
      toggleTodo: (todoId: number) =>
        set({
          todos: get().todos.map((todo: Todo) =>
            todo.id === todoId
              ? { ...todo, completed: !todo.completed } // flip completed flag
              : todo
          ),
        }),
      clearCompletedTasks: () =>
        set({ todos: get().todos.filter((todo: Todo) => !todo.completed) }),
      showCompletedTasks: () =>
        set({ todos: get().todos.filter((todo: Todo) => todo.completed) }),
      showActiveTasks: () =>
        set({ todos: get().todos.filter((todo: Todo) => !todo.completed) }),
    }),
    { name: "todo-store", version: 1.1 }
  )
);