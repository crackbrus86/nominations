import React from "react";
import moment from "moment";

import { useEvents } from '../events.context';
import { useEventForm } from '../event.form/event.form.context';
import ConfirmDeleteEventModal from "../confirm.delete.event.modal";

moment.locale("uk");

const EventsListItem = ({ event }) => {
  const { onOpenEvent } = useEventForm();
  const { eventIdToDelete, onClickDelete, handleCancelDelete, onDeleteEvent } = useEvents();

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
      <div>
        <button type="button" className="btn btn-primary btn-sm me-2" onClick={() => onOpenEvent(event)}>Відкрити</button>
        <button type="button" className="btn btn-danger btn-sm" onClick={() => onClickDelete(event.id)}>Видалити</button>
      </div>
      <ConfirmDeleteEventModal
        isOpen={!!eventIdToDelete}
        onClose={handleCancelDelete}
        onConfirm={onDeleteEvent}
      />
    </React.Fragment>
  );
};

export default EventsListItem;
