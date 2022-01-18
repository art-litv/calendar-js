import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/createNumbersArray.js';
import { setEventFormFields } from '../events/createEvent.js';
import { openModal } from '../common/modal.js';

const calendarWeekElem = document.querySelector('.calendar__week');

const generateDay = monthDay => {
  const timeSlotsDataTime = createNumbersArray(1, 24);
  return `
        <div class="calendar__day" data-day="${monthDay}">
            ${timeSlotsDataTime
              .map(timeSlotDataTime => {
                return `
                        <div class="calendar__time-slot" data-time="${timeSlotDataTime - 1}">
                        </div>
                    `;
              })
              .join('')}
        </div>
    `;
};

function handleTimeSlotClick({ target }) {
  if (target.classList.contains('calendar__time-slot')) {
    openModal();

    // ['Aug', '-', 'Sep', '2021'] || ['Aug', '2021']
    const dateData = document.querySelector('.navigation__displayed-month').textContent.split(' ');

    const year = dateData[dateData.length - 1];
    const monthDay = target.closest('.calendar__day').dataset.day;

    const isNewMonth = +monthDay >= 1 && +monthDay < 7;
    const doMonthsIntersect = dateData.length > 2;
    const monthName = doMonthsIntersect && isNewMonth ? dateData[2] : dateData[0];

    const startTime = target.dataset.time;
    const dateStart = new Date(`${monthName} ${monthDay} ${year} ${startTime}:00:00`);

    setEventFormFields(dateStart);
  }
}

export const renderWeek = () => {
  const firstWeekDay = getItem('displayedWeekStart');
  calendarWeekElem.innerHTML = '';

  generateWeekRange(firstWeekDay).forEach(date => {
    const monthDay = date.getDate();
    const weekDayHTML = generateDay(monthDay);
    calendarWeekElem.innerHTML += weekDayHTML;
  });

  renderEvents();
};

calendarWeekElem.addEventListener('click', handleTimeSlotClick);
