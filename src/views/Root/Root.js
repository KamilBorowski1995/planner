import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ThemeContext } from "context/context";
import { theme } from "theme/theme";

import List from "views/List";
import Calendar from "views/Calendar";

import Login from "views/Login";

import "./Root.css";
import ProtectedRoute from "Functions/ProtectedRoute";

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
            <ProtectedRoute exact path="/" component={List} />
            <ProtectedRoute exact path="/calendar" component={Calendar} />

            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default Root;
