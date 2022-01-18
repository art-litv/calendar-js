const baseUrl = 'https://6151a12d4a5f22001701d31f.mockapi.io/events';

export const getEvents = async () => {
  const response = await fetch(baseUrl);
  const events = await response.json();
  return Promise.all(
    events.map(async event => {
      event.id = +event.id;
      event.start = new Date(event.start);
      event.end = new Date(event.end);
      return event;
    }),
  );
};

export const createEvent = async event => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  };
  const response = await fetch(baseUrl, options);
  return response.json();
};

export const updateEvent = async event => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  };
  const response = await fetch(`${baseUrl}/${event.id}`, options);
  return response.json();
};

export const deleteEvent = async eventId => {
  const options = {
    method: 'DELETE',
  };
  const response = await fetch(`${baseUrl}/${eventId}`, options);
  return response.json();
};
