import React from "react";

import EventsHeader from "./events.header";
import EventsList from "./events.list/events.list";
import { useEventForm } from "./event.form/event.form.context";

const Events = () => {
  const { event } = useEventForm();

  return (
    !event && (
      <React.Fragment>
        <EventsHeader />
        <EventsList />
      </React.Fragment>
    )
  );
};

export default Events;
