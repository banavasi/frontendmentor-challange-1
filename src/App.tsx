/**
 * ul
    li (checkbox:input and todo,label:text|delete icon:svg)
    actions
      total:button|filters(active,completed,all):button|clear completed:button
 */

import React, { useState, useEffect, MouseEvent, FC } from "react";
import darkImage from "./assets/bg-desktop-dark.jpg";
import lightImage from "./assets/bg-desktop-light.jpg";
import sunImage from "./assets/icon-sun.svg";
import moonImage from "./assets/icon-moon.svg";
type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const handleColorSchemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    colorSchemeQuery.addEventListener("change", handleColorSchemeChange);
    setTheme(colorSchemeQuery.matches ? "dark" : "light");
    return () => {
      colorSchemeQuery.removeEventListener("change", handleColorSchemeChange);
    };
  }, []);

  return (
    <>
      <main data-theme={theme}>
        <section id="hero">
          <picture>
            <source
              srcSet={darkImage}
              media="(prefers-color-scheme: dark)"
              className="h-[45vh] object-cover"
            />
            <img
              srcSet={lightImage}
              alt="desktop bg dark"
              className="h-[45vh] object-cover"
            />
          </picture>
        </section>
        <section id="form">
          <div className="relative top-[-10rem]">
            {/* <Form /> */}
            {/* Input */}
            <div className="container mx-auto">
              <div className="flex-row">
                <div className="w-3/4 lg:w-2/5  mx-auto">
                  <div className="flex justify-between">
                    <h1 className="text-3xl font-bold text-center text-base-content">
                      Todo
                    </h1>
                    <div className="theme-switch">
                      <input
                        type="checkbox"
                        id="theme-switch"
                        className="theme-switch-checkbox hidden"
                        onClick={() =>
                          setTheme((prev) =>
                            prev === "light" ? "dark" : "light"
                          )
                        }
                      />
                      <label
                        htmlFor="theme-switch"
                        className="theme-switch-label"
                      >
                        {theme !== "light" ? (
                          <div className="theme-switch-inner">
                            <img src={sunImage} alt="" />
                          </div>
                        ) : (
                          <div className="theme-switch-inner">
                            <img src={moonImage} alt="" />
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="p-4 dark:bg-base-200 bg-base-100 w-full rounded-sm drop-shadow-xl border-0"
                  />
                  <TasksList />
                  <p className="mt-5 text-xs text-base-300 text-center">
                    Drag and drop to reorder list
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

const TasksList: FC = () => {
  const [active, setActive] = useState<"all" | "active" | "completed">("all");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 0,
      text: "Drag and drop to reorder listDrag and drop to reorder listDrag and drop to reorder listDrag and drop to reorder listDrag and drop to reorder listDrag and drop to reorder listDrag and drop to reorder list",
      completed: false,
    },
    {
      id: 1,
      text: "Task 2",
      completed: false,
    },
    {
      id: 2,
      text: "Task 4",
      completed: false,
    },
  ]);

  const handleCompleteTask = (e: MouseEvent, i: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === i) {
          task.completed = !task.completed;
        }
        return task;
      })
    );
  };

  let filteredTasks: Task[] = [];
  if (active === "all") {
    filteredTasks = tasks;
  } else if (active === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (active === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }
  useEffect(() => {
    console.log("tasks", tasks);
  }, [tasks]);
  const handleTaskDelete = (i: number) => {
    setTasks(tasks.filter((task) => task.id !== i));
    console.log("handleTaskDelete" + i);
  };
  const handleClearCompleteTask: () => void = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };
  let activeTasks = tasks.filter((task) => !task.completed);
  return (
    <div className="drop-shadow-xl dark:shadow-xl mt-5 dark:shadow-lg-400/40 dark:bg-base-200 bg-base-100 ">
      <ul className="">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, i) => (
            <li
              key={i}
              id={`element-${task.id}`}
              onClick={(e) => handleCompleteTask(e, task.id)}
              className="hover:bg-red-500 cursor-pointer group min-h-16 p-4 h-18 w-full rounded-sm text-base-content border-base-300 border-t first-of-type:border-0"
            >
              <div className="flex justify-between items-center  group-hover:text-white">
                <div className="flex items-center">
                  <label
                    className={
                      task.completed
                        ? "line-through text-base-300 flex items-center space-x-2"
                        : "text-base-content flex items-center space-x-2"
                    }
                  >
                    <input
                      type="checkbox"
                      id={`default-checkbox-${task.id}`}
                      readOnly
                      onClick={(e) => e.stopPropagation()}
                      checked={task.completed}
                      className="h-5 w-5 rounded-full border-1 border-base-300 bg-transparent transition-colors duration-200 ease-in-out"
                    />
                    <span className="space-x-3">{task.text}</span>
                  </label>
                </div>
                <IconCross taskId={task.id} deleteTask={handleTaskDelete} />
              </div>
            </li>
          ))
        ) : (
          <div className="min-h-16 flex justify-center place-items-center">
            <p className="text-base-300">No tasks found</p>
          </div>
        )}
      </ul>
      <div className="p-4  w-full rounded-sm text-base-content border-base-300 border-t flex justify-between content-center">
        <div className="total flex items-center">
          <p className="text-base-300 text-xs">
            {activeTasks.length} items left
          </p>
        </div>
        <div className="filters flex content-between text-center">
          <button
            onClick={(e) => setActive("all")}
            className={`text-xs pr-4 ${
              active !== "all" ? "text-base-300" : "text-primary font-bold"
            }`}
          >
            All
          </button>
          <button
            onClick={(e) => setActive("completed")}
            className={`text-xs pr-4 ${
              active !== "completed"
                ? "text-base-300"
                : "text-primary font-bold"
            }`}
          >
            Completed
          </button>
          <button
            onClick={(e) => setActive("active")}
            className={`text-xs pr-4 ${
              active !== "active" ? "text-base-300" : "text-primary font-bold"
            }`}
          >
            Active
          </button>
        </div>
        <div className="clear">
          <button
            className="appearance-none text-base-300 text-xs"
            onClick={handleClearCompleteTask}
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
};

type TaskItem = {
  taskId: number;
  deleteTask: (taskId: number) => void;
};

function IconCross({ taskId, deleteTask }: TaskItem) {
  // 1. Define function to handle click events
  const onClickHandel = (e: MouseEvent) => {
    deleteTask(taskId);
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

export default App;
