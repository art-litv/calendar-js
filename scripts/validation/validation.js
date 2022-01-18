import { getItem } from '../common/storage.js';
import { getEvents } from '../common/api.js';

const errorMessages = {
  eventCrossing: 'Event at the specified time already exists',
  exceedsTimeLength: `Event exceeds the maximum time length of ${getItem('maxEventLength')} hours`,
  invalidEventTime: "Time gap between event's start and end must be at least 30 minutes",
};

export const validators = {
  async isEventCrossing(eventToCheck) {
    let events;
    try {
      events = await getEvents();
    } catch (err) {
      alert('Could not fetch events');
      return undefined;
    }
    events = events.filter(event => event.id !== eventToCheck.id);

    const crossingEvent = events.find(
      event =>
        (eventToCheck.start <= event.start && eventToCheck.end >= event.start) ||
        (eventToCheck.start >= event.start && eventToCheck.start <= event.end),
    );

    return crossingEvent ? 'eventCrossing' : undefined;
  },

  async exceedsTimeLength(eventToCheck, timeLength = 6) {
    const eventTimeLengthMili = Math.abs(eventToCheck.end - eventToCheck.start);

    const timeLengthMinutes = timeLength * 60;
    const eventTimeLengthMinutes = Math.floor(eventTimeLengthMili / 1000 / 60);

    return eventTimeLengthMinutes > timeLengthMinutes ? 'exceedsTimeLength' : undefined;
  },

  async isInvalidEventTime(eventToCheck, minTimeDiff = 30) {
    // Если между промежутками меньше `minTimeDiff` минут или start > end,
    // тогда время события некорректное
    const eventTimeDiffMinutes = Math.floor((eventToCheck.end - eventToCheck.start) / 1000 / 60);
    return eventTimeDiffMinutes < minTimeDiff ? 'invalidEventTime' : undefined;
  },
};

export const validateEvent = async (event, validatorsArr) => {
  const validationPromises = validatorsArr.map(async validator => {
    const validationType = await validator(event);
    return errorMessages[validationType];
  });

  return Promise.all(validationPromises);
};
