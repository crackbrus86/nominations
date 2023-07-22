import React from "react";

import AlertsContainer from "./alerts.container";
import Events from "./events";
import EventForm from "./event.form/event.form";
import { EventsContextProvider } from "./events.context";
import { EventFormContextProvider } from "./event.form/event.form.context";
import { EventsServicesContextProvider } from "./events.services.context";

const EventsContainer = () => {
  return (
    <EventsServicesContextProvider>
      <EventsContextProvider>
        <AlertsContainer />
        <EventFormContextProvider>
          <Events />
          <EventForm />
        </EventFormContextProvider>
      </EventsContextProvider>
    </EventsServicesContextProvider>
  );
};

export default EventsContainer;
