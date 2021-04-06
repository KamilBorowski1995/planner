import { useState } from "react";
import List from "views/List";

import { ThemeContext } from "context/context";

import { theme } from "theme/theme";

import "./Root.css";

function Root() {
  const [themeColors, setThemeColors] = useState(theme.colors.dark);
  return (
    <ThemeContext.Provider value={themeColors}>
      <div className="App">
        <List />
      </div>
    </ThemeContext.Provider>
  );
}

export default Root;
