import { getItem } from '../common/storage.js';
import { generateWeekRange, daysOfWeek } from '../common/time.utils.js';
import { setEventFormFields } from '../events/createEvent.js';
import { openModal } from '../common/modal.js';

const createButtonElem = document.querySelector('.create-event-btn');

export const renderHeader = () => {
  const calendarHeaderElem = document.querySelector('.calendar__header');
  calendarHeaderElem.innerHTML = '';

  const firstWeekDay = getItem('displayedWeekStart');
  const displayedDaysArray = generateWeekRange(firstWeekDay);

  displayedDaysArray.forEach(displayedDay => {
    const dayOfWeek = daysOfWeek[displayedDay.getDay()];
    const monthDay = displayedDay.getDate();

    const displayedDayHTML = `
            <div class="calendar__day-label day-label">
                <span class="day-label__day-name">${dayOfWeek}</span>
                <span class="day-label__day-number">${monthDay}</span>
            </div>
        `;

    calendarHeaderElem.innerHTML += displayedDayHTML;
  });
};

createButtonElem.addEventListener('click', () => {
  openModal();
  setEventFormFields(new Date());
});
