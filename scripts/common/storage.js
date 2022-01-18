/*
const storage = {
  // используется для update / delete операций
  selectedEventId: null,
  // хранит дату понедельника той отображаемой недели
  displayedWeekStart: null,
  // максимальный временной промежуток при создании события (в часах)
  maxEventLength: 6,
  // хранит массив всех событий
  events: [],
  // это все данные, которые вам нужно хранить для работы приложения
};
*/

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = key => {
  const value = JSON.parse(localStorage.getItem(key));
  return Date.parse(value) ? new Date(value) : value;
};

// пример объекта события
// const eventExample = {
//     id: 0.7520027086457333, // id понадобится для работы с событиями
//     title: 'Title',
//     description: 'Some description',
//     start: new Date('2020-03-17T01:10:00.000Z'),
//     end: new Date('2020-03-17T04:30:00.000Z'),
// }
