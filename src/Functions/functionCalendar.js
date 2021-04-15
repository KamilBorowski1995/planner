export function selectDate(propsArray) {
  const arrayOnlyDate = propsArray.map(({ date }) => date);
  const newArray = [];

  for (let i = 0; i < arrayOnlyDate.length; i++) {
    if (
      newArray.find(
        (el) =>
          el.year === arrayOnlyDate[i][0] && el.month === arrayOnlyDate[i][1]
      ) === undefined
    ) {
      newArray.push({ year: arrayOnlyDate[i][0], month: arrayOnlyDate[i][1] });
    }
  }

  return newArray;
}

export function getMonth(date) {
  const month = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];
  return month[date - 1];
}

export function handleSelectNotes(notes, date) {
  console.log(date);
  const newArray = notes.filter((el) => {
    return el.date[0] * 1 === date[0] && el.date[1] * 1 === date[1];
  });

  return newArray;
}

export function getYearAndMonth(year, month, date) {
  if (year * 1 === date[0]) {
    return getMonth(month * 1);
  } else {
    const monthName = getMonth(month * 1);
    return `${year} ${monthName} `;
  }
}
