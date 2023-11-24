import React from "react";

import { useEventForm } from './event.form/event.form.context';

const EventsHeader = () => {
    const { onAddEvent } = useEventForm();
  return (
    <div>
      <button type="button" className="btn btn-link" onClick={onAddEvent}>
        Створити нове змагання
      </button>
    </div>
  );
};

export default EventsHeader;
