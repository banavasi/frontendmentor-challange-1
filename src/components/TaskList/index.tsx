import React, { MouseEvent, ReactNode } from "react";
import { useTodosStore } from "../../store";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
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
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      className="hover:bg-red-500 cursor-pointer group min-h-16 p-4 h-18 w-full rounded-sm text-base-content border-base-300 border-t first-of-type:border-0"
      animate="visible"
    >
      {tasks.map((task: TypeTask) => (
        <TaskList
          key={task.id}
          id={task.id}
          text={task.text}
          completed={task.completed}
        />
      ))}
    </motion.ul>
  );
};

export const TaskList = ({ id, text, completed }: TypeTask) => {

  const { toggleTodo } = useTodosStore();
  
  const handleCompleteTask = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    toggleTodo(id);
  };
  
  return (
    <motion.li
      className="hover:bg-red-500 cursor-pointer group min-h-16 p-4 h-18 w-full rounded-sm text-base-content border-base-300 border-t first-of-type:border-0"
      data-task-id={id}
      onClick={(e) => handleCompleteTask(e)}
      variants={item}
    >
      <div className="flex justify-between items-center  group-hover:text-white">
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
    </motion.li>
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
