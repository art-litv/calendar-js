function createTimeLineElem() {
  const timeLineElem = document.createElement('div');
  timeLineElem.classList.add('time-line');

  const timeLineCircle = document.createElement('div');
  timeLineCircle.classList.add('time-line__circle');

  const timeLineBar = document.createElement('div');
  timeLineBar.classList.add('time-line__bar');

  timeLineElem.append(timeLineCircle, timeLineBar);

  return timeLineElem;
}

export function renderTimeLine() {
  // remove timeline element if exists (for interval render)
  const timeLine = document.querySelector('.time-line');
  if (timeLine) {
    timeLine.remove();
  }

  const currentDate = new Date();
  const pxPerHour = document.querySelector('.calendar__time-slot').offsetHeight;

  const currentDayElem = document.querySelector(
    `.calendar__day[data-day="${currentDate.getDate()}"]`,
  );
  const currentTimeSlotElem = currentDayElem.querySelector(
    `.calendar__time-slot[data-time="${currentDate.getHours()}"]`,
  );

  const timeLineElem = createTimeLineElem();
  currentTimeSlotElem.append(timeLineElem);

  timeLineElem.style.top = `${
    (currentDate.getMinutes() / 60) * pxPerHour - timeLineElem.offsetHeight / 2
  }px`;
}
