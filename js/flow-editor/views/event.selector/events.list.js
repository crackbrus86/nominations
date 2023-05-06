import React from "react";
import classnames from "classnames";
import moment from "moment";

import { useEventSelector } from "./event.selector.context";
import { useFlows } from '../flows.context';

moment.locale("uk");

const EventsList = () => {
  const { events, selectedEventId, setSelectedEventId } = useEventSelector();
  const { setCurrentEvent } = useFlows();

  return (
    <div className="event-selector__list">
      {!!events.length && (
        <ul className="list-group">
          {events.map((x) => {
            const isActive = x.id === selectedEventId;
            return (
              <li
                key={x.id}
                className={classnames(
                  "list-group-item d-flex justify-content-between align-items-start",
                  { active: isActive }
                )}
                onClick={() => setSelectedEventId(x.id)}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    {x.name} {x.expired && <i className="fa fa-lock lock"></i>}
                  </div>
                  {`${x.location} ${moment(x.startsAt).format(
                    "D MMM, YYYY"
                  )} - ${moment(x.endsAt).format("D MMM, YYYY")}`}
                </div>
                {isActive && (
                  <button type="button" className="btn btn-light btn-sm mt-2" onClick={() => setCurrentEvent(x)}>
                    Потоки
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default EventsList;
