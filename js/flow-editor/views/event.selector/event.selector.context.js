import React from "react";

import { filters } from "../../types";
import * as services from "../../services/services";

const EventSelectorContext = React.createContext();

const EventSelectorProvider = ({ children }) => {
  const [filter, setFilter] = React.useState(filters.actual);
  const [loading, setLoading] = React.useState(false);
  const [events, setEvents] = React.useState([]);
  const [selectedEventId, setSelectedEventId] = React.useState(null);

  const onFilter = (e = null) => {
    if (e) e.preventDefault();
    setLoading(true);
    services.getCompetitions({ filter }).then((response) => {
      setLoading(false);
      const eventsRaw = JSON.parse(response);
      const nextEvents = eventsRaw.map((x) => ({
        ...x,
        startsAt: new Date(x.startsAt),
        endsAt: new Date(x.endsAt),
        isACup: /true/.test(x.isACup),
        isForJuniors: /true/.test(x.isForJuniors),
        expired: !!parseInt(x.expired),
      }));
      setEvents(nextEvents);
    });
  };

  const value = {
    filter,
    loading,
    events,
    selectedEventId,
    setSelectedEventId,
    setFilter,
    onFilter,
  };
  return (
    <EventSelectorContext.Provider value={value}>
      {children}
    </EventSelectorContext.Provider>
  );
};

const useEventSelector = () => {
  const context = React.useContext(EventSelectorContext);
  if (context === undefined) {
    throw new Error(
      "useEventSelector must be used within a EventSelectorProvider"
    );
  }
  return context;
};

export { EventSelectorProvider, useEventSelector };
