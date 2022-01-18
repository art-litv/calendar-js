import { getItem, setItem } from '../common/storage.js';
import { getDateTime } from '../common/time.utils.js';
import { closePopup } from '../common/popup.js';
import { renderEvents, handleEventClick, setUpdateFormFields } from './events.js';
import { validators, validateEvent } from '../validation/validation.js';
import { getEvents, deleteEvent, updateEvent } from '../common/api.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

const updateEventFormElem = document.querySelector('.update-event-form');
const updateFormFieldElems = updateEventFormElem.querySelectorAll('.update-event-form__field');
const closeUpdateEventFormBtn = document.querySelector('.update-event__close-btn');

function clearUpdateEventForm() {
  updateFormFieldElems.forEach(updateFormFieldElem => {
    updateFormFieldElem.value = '';
  });
}

function onCloseUpdateEventForm() {
  closePopup();
  clearUpdateEventForm();
}

async function validateUpdatedEvent(formData, selectedEventId) {
  const validatedEvent = {
    id: selectedEventId,
    title: formData.title || '(No title)',
    description: formData.description,
    start: getDateTime(formData.date, formData.startTime),
    end: getDateTime(formData.date, formData.endTime),
  };

  const errors = await validateEvent(validatedEvent, [
    validators.isEventCrossing,
    validators.exceedsTimeLength,
    validators.isInvalidEventTime,
  ]);

  return errors.filter(error => error);
}

export async function onUpdateEvent(event) {
  event && event.preventDefault();
  const formData = Object.fromEntries(new FormData(updateEventFormElem));

  document.querySelectorAll('.error-text').forEach(errorTextElem => {
    errorTextElem.remove();
  });

  const selectedEventId = getItem('selectedEventId');
  const events = await getEvents();
  const eventToUpdate = events.find(calendarEvent => calendarEvent.id === selectedEventId);

  const foundErrors = validateUpdatedEvent(formData, selectedEventId);
  if (foundErrors.length) {
    foundErrors.forEach(foundError => {
      updateEventFormElem.innerHTML += `<span class="error-text">${foundError}</span>`;
    });
    setUpdateFormFields(eventToUpdate);
    return;
  }

  eventToUpdate.title = formData.title;
  eventToUpdate.description = formData.description;
  eventToUpdate.start = getDateTime(formData.date, formData.startTime);
  eventToUpdate.end = getDateTime(formData.date, formData.endTime);

  await updateEvent(eventToUpdate);

  clearUpdateEventForm();
  closePopup();

  renderEvents();
}

async function onDeleteEvent() {
  // достаем из storage массив событий и selectedEventId
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
  const selectedEventId = getItem('selectedEventId');
  await deleteEvent(selectedEventId);
  setItem('selectedEventId', null);

  closePopup();
  renderEvents();
}

updateEventFormElem.addEventListener('submit', () => {
  try {
    onUpdateEvent();
  } catch (err) {
    alert('Could not update event');
  }
});
closeUpdateEventFormBtn.addEventListener('click', onCloseUpdateEventForm);

deleteEventBtn.addEventListener('click', () => {
  try {
    onDeleteEvent();
  } catch (err) {
    alert('Could not update event');
  }
});
weekElem.addEventListener('click', event => {
  try {
    handleEventClick(event);
  } catch (err) {
    alert('Could not fetch event data');
  }
});

export function initUpdateEventForm() {
  updateEventFormElem.addEventListener('submit', onUpdateEvent);
  closeUpdateEventFormBtn.addEventListener('click', onCloseUpdateEventForm);
}
