import React, { useState, useEffect } from "react";
import Form from "./components/Form";
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
          <div className="relative top-[-6rem]">
            {/* <Form /> */}
            {/* Input */}
            <div className="container mx-auto">
              <div className="flex-row">
                <div className="w-3/4 lg:w-2/5  mx-auto">
                  <input
                    type="text"
                    className="p-4 bg-base-200 w-full rounded-sm"
                  />
                  <ul className="mt-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <li className="p-4 bg-base-200 shadow-current  h-18 w-full rounded-sm text-base-content border-base-100 border-t">
                        test-{i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
