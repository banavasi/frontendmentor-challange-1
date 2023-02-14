import React, { MouseEvent, ReactNode } from "react";
import { useTodosStore } from "../../store";
import { motion, AnimatePresence, Reorder } from "framer-motion";

const container = {
  hidden: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    x: -16,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -16,
  },
};

export type TypeTask = {
  id: number;
  text: string;
  completed: boolean;
};

type TaskItem = {
  taskId: number;
  deleteTask?: (taskId: number) => void;
};

type TaskListProps = {
  tasks: TypeTask[];
  handleCompleteTask?: (e: React.MouseEvent, i: number) => void;
  handleTaskDelete?: (i: number) => void;
  handleClearCompleteTask?: () => void;
  active?: "all" | "active" | "completed";
  setActive?: React.Dispatch<
    React.SetStateAction<"all" | "active" | "completed">
  >;
};

export const Task = ({ tasks }: TaskListProps) => {
  const { updateOrder } = useTodosStore();
  return (
    <Reorder.Group
      values={tasks}
      variants={container}
      initial="hidden"
      animate="visible"
      exit="exit"
      onReorder={updateOrder}
      className="max-h-96 overflow-y-auto min-h-16 dark:shadow-lg-400/40 shadow-lg"
    >
      {tasks.length > 0 ? (
        <AnimatePresence>
          {tasks.map((task: TypeTask, i: number) => (
            <Reorder.Item
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
              whileDrag={{ backgroundColor: "#e3e3e3" }}
              key={task.id}
              value={task}
              className="dark:bg-base-200 bgbase-100 cursor-pointer p-4 w-full rounded-sm text-base-content border-base-300 border-t"
              data-task-id={task.id}
              variants={item}
            >
              <TaskList
                key={task.id}
                id={task.id}
                text={task.text}
                completed={task.completed}
              />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      ) : (
        <div className="text-base-content text-center p-4 dark:bg-base-200 bgbase-100 cursor-pointer w-full rounded-sm border-base-300 border-t">No tasks yet</div>
      )}
    </Reorder.Group>
  );
};

export const TaskList = ({ id, text, completed }: TypeTask) => {
  const { toggleTodo } = useTodosStore();

  const handleCompleteTask = (e: MouseEvent<HTMLDivElement>) => {
    toggleTodo(id);
  };

  return (
    <div
      className="flex justify-between items-center  group-hover:text-white"
      onClick={(e) => handleCompleteTask(e)}
    >
      <div className="flex items-center">
        <label
          className={
            completed
              ? "line-through text-base-300 flex items-center space-x-2"
              : "text-base-content flex items-center space-x-2"
          }
        >
          <input
            type="checkbox"
            id={`default-checkbox-${id}`}
            readOnly
            onClick={(e) => handleCompleteTask(e)}
            checked={completed}
            className="h-5 w-5 rounded-full border-1 border-base-300 bg-transparent transition-colors duration-200 ease-in-out"
          />
          <span className="space-x-3">{text}</span>
        </label>
      </div>
      <IconCross taskId={id} />
    </div>
  );
};

function IconCross({ taskId }: TaskItem) {
  // 1. Define function to handle click events
  const { deleteTodo } = useTodosStore();
  const onClickHandel = (e: MouseEvent) => {
    deleteTodo(taskId);
    e.stopPropagation();
  };

  // 2. Return SVG icon wrapped in span with onClick event handler
  return (
    <span onClick={onClickHandel}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path
          fill="#494C6B"
          fillRule="evenodd"
          d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
        />
      </svg>
    </span>
  );
}
