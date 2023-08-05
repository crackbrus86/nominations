import React from "react";

import { useEventsServices } from './events.services.context';

const EventsContext = React.createContext();

const EventsContextProvider = ({ children }) => {
  const { getAllEvents, getEventTypes, deleteEvent } = useEventsServices();
  const [events, setEvents] = React.useState([]);
  const [eventTypes, setEventTypes] = React.useState([]);
  const [eventIdToDelete, setEventIdToDelete] = React.useState(null);

  const loadEvents = async () => {
    const data = await getAllEvents();
    const nextEvents = data.map(x => ({...x, start_date: new Date(x.start_date), end_date: new Date(x.end_date)}));
    setEvents(nextEvents);
  }

  const loadEventTypes = async () => {
    const data = await getEventTypes();
    setEventTypes(data);
  }

  const onClickDelete = (id) => {
    setEventIdToDelete(id);
  }

  const handleCancelDelete = () => {
    setEventIdToDelete(null);
  }

  const onDeleteEvent = async () => {
    await deleteEvent({ id: eventIdToDelete });
    setEventIdToDelete(null);
    await loadEvents();
  }

  const value = {
    events,
    eventTypes,
    eventIdToDelete,
    setEvents,
    loadEvents,
    loadEventTypes,
    onClickDelete,
    handleCancelDelete,
    onDeleteEvent
  };
  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
};

const useEvents = () => {
  const context = React.useContext(EventsContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within EventsContextProvider");
  }
  return context;
};

export { EventsContextProvider, useEvents };
