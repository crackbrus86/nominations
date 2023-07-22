import React from "react";
import moment from "moment";

import { useEventForm } from '../event.form/event.form.context';

moment.locale("uk");

const EventsListItem = ({ event }) => {
  const { onOpenEvent } = useEventForm();
  return (
    <React.Fragment>
      <div className="d-flex w-100 justify-content-between" onClick={() => onOpenEvent(event)}>
        <h5 className="mb-1">{event.title}</h5>
        <small>
          {event.is_cup && (
            <i className="fa fa-trophy cup-marker" aria-hidden="true"></i>
          )}
          {event.is_school && <span className="school-marker">ДЮСШ</span>}
        </small>
      </div>
      <p className="mb-1">{event.location}</p>
      <small>
        {moment(event.start_date).format("D MMM, YYYY")} -{" "}
        {moment(event.end_date).format("D MMM, YYYY")}
      </small>
    </React.Fragment>
  );
};

export default EventsListItem;
