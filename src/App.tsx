/**
 * ul parent
    checkbox text | button
    checkbox text | button
    checkbox text | button

    actions
      total| filters| clear completed
  

 */

import React, {
  useState,
  useEffect,
  MouseEvent,
  SyntheticEvent,
  FC,
} from "react";

type CheckBoxProps = {
  id: number;
};

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

  const handleMouseOver = (e: SyntheticEvent) => {
    console.log("mouse over" + e);
  };
  return (
    <>
      <main data-theme={theme}>
        <section id="hero">
          <picture>
            <source
              srcSet="../src/assets/bg-desktop-dark.jpg"
              media="(prefers-color-scheme: dark)"
              className="h-[45vh] object-cover"
            />
            <img
              src="../src/assets/bg-desktop-light.jpg"
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
                  <h2 className="text-3xl text-base-content mb-6 font-bold">TODO</h2>
                  <input
                    type="text"
                    className="p-4 dark:bg-base-200 bg-base-100 w-full rounded-sm drop-shadow-xl"
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
    console.log(tasks);
  };

  return (
    <ul className="mt-5 drop-shadow-xl dark:shadow-xl dark:shadow-lg-400/40">
      {tasks.map((_, i) => (
        <li
          key={i}
          id={`element-${i}`}
          onClick={(e) => handleCompleteTask(e, i)}
          className="hover:bg-red-500 cursor-pointer group p-4 dark:bg-base-200 bg-base-100 h-18 w-full rounded-sm text-base-content border-base-300 border-t first-of-type:border-0"
        >
          <div className="flex justify-between items-center  group-hover:text-white">
            <div className="flex items-center">
              <label
                className={
                  tasks[i]?.completed
                    ? "line-through text-base-300 flex items-center space-x-2"
                    : "text-base-content flex items-center space-x-2"
                }
              >
                <input
                  type="checkbox"
                  id={`default-checkbox-${i}`}
                  readOnly
                  onClick={(e) => e.stopPropagation()}
                  checked={tasks[i]?.completed}
                  className="h-5 w-5 rounded-full border-1 border-base-300 bg-transparent transition-colors duration-200 ease-in-out"
                />
                <span className="space-x-3">
                  {tasks[i]?.text}
                </span>
              </label>
            </div>
            <IconCross taskId={i} />
          </div>
        </li>
      ))}
      <li className="p-4 dark:bg-base-200 bg-base-100 w-full rounded-sm text-base-content border-base-300 border-t first-of-type:border-0 flex justify-between content-center">
        <div className="total flex items-center">
          <p className="text-base-300 text-xs">2 items left</p>
        </div>
        <div className="filters flex content-between text-center">
          <button className="text-base-300 text-xs pr-4">All</button>
          <button className="text-base-300 text-xs pr-4 text-primary font-bold">
            Active
          </button>
          <button className="text-base-300 text-xs pr-4">Completed</button>
        </div>
        <div className="clear">
          <button className="appearance-none text-base-300 text-xs">
            Clear Completed
          </button>
        </div>
      </li>
    </ul>
  );
};

function IconCross({ taskId }: { taskId: number }) {
  // 1. Define function to handle click events
  const onClickHandel = (e: MouseEvent) => {
    e.stopPropagation();
    console.log("delete" + taskId);
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
