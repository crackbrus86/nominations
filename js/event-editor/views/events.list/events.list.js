import React from "react";
import moment from "moment";

import EventsListItem from "./events.list.item";
import LoadingIndicator from "../../components/loading.indicator";
import { useEvents } from "../events.context";
import { useEventsServices } from '../events.services.context';

moment.locale("uk");

const EventsList = () => {
  const { events, loadEvents, loadEventTypes } = useEvents();
  const { isLoading } = useEventsServices();

  React.useEffect(() => {
    loadEvents();
    loadEventTypes();
  }, []);

  if (!events.length)
    return (
      <div className="alert alert-light" role="alert">
        Немає змагань
      </div>
    );
  return (
    <div className="events-list">
      <ul className="list-group">
        {events.map((item) => (
          <li key={item.id} className="list-group-item">
            <EventsListItem event={item} />
          </li>
        ))}
      </ul>
      <LoadingIndicator isOpen={isLoading} />
    </div>
  );
};

export default EventsList;
