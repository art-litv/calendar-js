import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';
import shmoment from '../common/shmoment.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector('.navigation__displayed-month');

const navigationHandlers = {
  handleNextWeekArrowClick() {
    const weekShmoment = shmoment(getItem('displayedWeekStart'));
    setItem('displayedWeekStart', getStartOfWeek(weekShmoment.add('days', 7).result()));
  },
  handlePrevWeekArrowClick() {
    const weekShmoment = shmoment(getItem('displayedWeekStart'));
    setItem('displayedWeekStart', getStartOfWeek(weekShmoment.subtract('days', 7).result()));
  },
  handleTodayBtnClick() {
    setItem('displayedWeekStart', getStartOfWeek(new Date()));
  },
};

function renderCurrentMonth() {
  displayedMonthElem.textContent = getDisplayedMonth(getItem('displayedWeekStart'));
}

const onChangeWeek = ({ target }) => {
  const direction = target.closest('button')?.dataset?.direction;
  if (direction === 'next') {
    navigationHandlers.handleNextWeekArrowClick();
  } else if (direction === 'prev') {
    navigationHandlers.handlePrevWeekArrowClick();
  } else if (direction === 'today') {
    navigationHandlers.handleTodayBtnClick();
  }

  renderHeader();
  renderWeek();
  renderCurrentMonth();
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
