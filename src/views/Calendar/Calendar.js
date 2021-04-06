import { useState, useEffect } from "react";

import MobileTemplate from "templates/MobileTemplate";

function Calendar() {
  const [heightWrapperNav, setHeightWrapperNav] = useState(50);
  const [size, setSize] = useState(150);

  useEffect(() => {
    const heightSite = document.body.clientHeight;
    setSize(heightSite - heightWrapperNav);
  }, [size, heightWrapperNav]);

  const setHeight = (height) => setHeightWrapperNav(height);

  return (
    <MobileTemplate setHeight={setHeight}>
      <p>Calendar</p>
    </MobileTemplate>
  );
}

export default Calendar;
