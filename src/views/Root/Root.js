import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ThemeContext } from "context/context";
import { theme } from "theme/theme";

import List from "views/List";
import Calendar from "views/Calendar";

import Login from "views/Login";

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
    <BrowserRouter>
      <ThemeContext.Provider value={themeColors}>
        <div className="App">
          <Switch>
            {/* <Route exact path="/" component={List} /> */}
            <Route exact path="/" component={Login} />
            <Route path="/calendar" component={Calendar} />
          </Switch>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default Root;
