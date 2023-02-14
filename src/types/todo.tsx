export type Todo = {
    id: number;
    text: string;
    completed: boolean;
  };

export type TodoStore = {
    todos: Todo[];
    addTodo: (newTodo: Todo) => void;
    deleteTodo: (todoId: number) => void;
    toggleTodo: (todoId: number) => void;
    clearCompletedTasks: () => void;
    showCompletedTasks: () => void;
    showActiveTasks: () => void;
    updateOrder: (newOrder: Todo[]) => void;
  };