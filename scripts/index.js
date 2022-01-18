import { renderTimescale } from './calendar/timescale.js';
import { renderWeek } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import { setItem } from './common/storage.js';
import { getStartOfWeek } from './common/time.utils.js';
import { initEventForm } from './events/createEvent.js';
import { initUpdateEventForm } from './events/updateEvent.js';
import { renderTimeLine } from './calendar/time-line.js';

document.addEventListener('DOMContentLoaded', () => {
  // инициализация всех элементов
  renderTimescale();
  setItem('displayedWeekStart', getStartOfWeek(new Date()));
  setItem('maxEventLength', 6);
  renderWeek();
  renderHeader();
  initNavigation();
  initEventForm();
  initUpdateEventForm();
  renderTimeLine();
  setInterval(renderTimeLine, 60000);
});

window.addEventListener('storage', () => {
  renderWeek();
});
