import React from "react";

import { useEventSelector } from "./event.selector.context";
import { useFlows } from '../flows.context';
import EventSelectorHeader from "./event.selector.header";
import EventsList from "./events.list";
import Preloader from "../../../components/preloader/preloader";
import "../../../../styles/style-flows.scss";

const EventSelector = () => {
  const { loading, onFilter } = useEventSelector();
  const { currentEvent } = useFlows();

  if(!!currentEvent) return null;

  React.useEffect(() => {
    onFilter();
  }, []);

  return (
    <div className="event-selector">
      <EventSelectorHeader />
      <EventsList />
      <Preloader loading={loading} />
    </div>
  );
};

export default EventSelector;
