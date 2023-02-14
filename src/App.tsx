import { Task, TypeTask } from "./components/TaskList";
import { useTodosStore } from "./store";
import React, { useState, useEffect, MouseEvent, FC } from "react";
import darkImage from "./assets/bg-desktop-dark.jpg";
import lightImage from "./assets/bg-desktop-light.jpg";
import sunImage from "./assets/icon-sun.svg";
import moonImage from "./assets/icon-moon.svg";
import Container from "./components/Container";
import { Todo } from "./types/todo";

const App: React.FC = () => {
  const { todos, addTodo, clearCompletedTasks } = useTodosStore();
  const [value, setValue] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [active, setActive] = useState<"all" | "active" | "completed">("all");

  let filteredTasks: Todo[] = [];

  if (active === "all") {
    filteredTasks = todos;
  } else if (active === "active") {
    filteredTasks = todos.filter((task) => !task.completed);
  } else if (active === "completed") {
    filteredTasks = todos.filter((task) => task.completed);
  }

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo({
      id: todos.length + 1,
      text: value,
      completed: false,
    });
    setValue("");
  };
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
            <Container>
              <HeaderText />
              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-5">
                <input
                  type="text"
                  value={value}
                  className="p-4 dark:bg-base-200 bg-base-100 w-full rounded-sm drop-shadow-xl border-0"
                  onChange={(e) => setValue(e.target.value)}
                />
              </form>
              {/* Task List */}
              <div className="drop-shadow-xl dark:shadow-xl mt-5 dark:shadow-lg-400/40 dark:bg-base-200 bg-base-100 max-h-96 overflow-y-auto">
                {filteredTasks.map((task: TypeTask) => (
                  <Task key={task.id} tasks={[task]} />
                ))}
                <div className="p-4  w-full rounded-sm text-base-content border-base-300 border-t flex justify-between content-center">
                  <div className="total flex items-center">
                    <p className="text-base-300 text-xs">
                      {todos.length} items left
                    </p>
                  </div>
                  <div className="filters flex content-between text-center">
                    <button
                      onClick={(e) => setActive("all")}
                      className={`text-xs pr-4 ${
                        active !== "all"
                          ? "text-base-300"
                          : "text-primary font-bold"
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
                        active !== "active"
                          ? "text-base-300"
                          : "text-primary font-bold"
                      }`}
                    >
                      Active
                    </button>
                  </div>
                  <div className="clear">
                    <button
                      className="appearance-none text-base-300 text-xs"
                      onClick={clearCompletedTasks}
                    >
                      Clear Completed
                    </button>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </section>
      </main>
    </>
  );
};

const HeaderText = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  return (
    <div className="flex justify-between">
      <h1 className="text-3xl font-bold text-center text-base-content">Todo</h1>
      <div className="theme-switch">
        <input
          type="checkbox"
          id="theme-switch"
          className="theme-switch-checkbox hidden"
          onClick={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
        />
        <label htmlFor="theme-switch" className="theme-switch-label">
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
  );
};

export default App;
