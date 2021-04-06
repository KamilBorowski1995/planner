import { useState, useEffect } from "react";

import { ThemeContext } from "context/context";
import { theme } from "theme/theme";

import List from "views/List";
import Calendar from "views/Calendar";

import "./Root.css";

function Root() {
  const [themeColors, setThemeColors] = useState(theme.colors.dark);

  //Fukcja tymczasowa dla błędu z przeglądarki
  useEffect(() => {
    setThemeColors(theme.colors.dark);

    const dateNow = new Date();
    const dateString = dateNow.getTime();
    console.log(dateString);
    const editDate = new Date(dateString);
    console.log(editDate);
  }, []);

  return (
    <ThemeContext.Provider value={themeColors}>
      <div className="App">
        <List />
        {/* <Calendar /> */}
      </div>
    </ThemeContext.Provider>
  );
}

export default Root;
