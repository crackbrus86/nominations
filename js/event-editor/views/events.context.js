import React from "react";

import { useEventsServices } from './events.services.context';

const EventsContext = React.createContext();

//temporary data
const eventTypeList = [
  { id: 1, eventType: "POWERLIFTING", name: "пауерліфтинг" },
  { id: 2, eventType: "BENCH_PRESS", name: "жим лежачи" },
  { id: 3, eventType: "POWERLIFTING_CLASSIC", name: "класичний пауерліфтинг" },
  { id: 4, eventType: "BENCH_PRESS_CLASSIC", name: "класичний жим лежачи" },
];

const EventsContextProvider = ({ children }) => {
  const { getAllEvents, getEventTypes } = useEventsServices();
  const [events, setEvents] = React.useState([]);
  const [eventTypes, setEventTypes] = React.useState([]);

  const loadEvents = async () => {
    const data = await getAllEvents();
    const nextEvents = data.map(x => ({...x, start_date: new Date(x.start_date), end_date: new Date(x.end_date)}));
    setEvents(nextEvents);
  }

  const loadEventTypes = async () => {
    const data = await getEventTypes();
    setEventTypes(data);
  }

  const value = {
    events,
    eventTypes,
    setEvents,
    loadEvents,
    loadEventTypes
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
