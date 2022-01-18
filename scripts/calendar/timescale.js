import { createNumbersArray } from '../common/createNumbersArray.js';

export const renderTimescale = () => {
  const hoursRange = createNumbersArray(1, 23);
  document.querySelector('.calendar__time-scale').innerHTML = hoursRange
    .map(
      hour =>
        `
                <div class="time-slot">
                    <span class="time-slot__time">${hour}:00</span>
                </div>
            `,
    )
    .toString()
    .replaceAll(',', '');
};
