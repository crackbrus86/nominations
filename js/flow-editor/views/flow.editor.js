import React from "react";

import EventDetails from "./event.details/event.details";
import { EventSelectorProvider } from "./event.selector/event.selector.context";
import EventSelector from "./event.selector/event.selector";
import { FlowsContextProvider } from './flows.context';

const FlowEditor = () => {
  return (
    <FlowsContextProvider>
      <EventSelectorProvider>
        <EventSelector />
        <EventDetails />
      </EventSelectorProvider>
    </FlowsContextProvider>
  );
};

export default FlowEditor;
