import React from "react";

import Radio from "../../components/radio";
import { useEventSelector } from "./event.selector.context";
import { filters } from "../../types";

const EventSelectorHeader = () => {
  const { filter, setFilter, onFilter } = useEventSelector();

  const filterOptions = [
    { text: "Актуальні змагання", value: filters.actual },
    { text: "Всі змагання", value: filters.all },
  ];

  return (
    <div className="event-selector__filter">
      <h4>Оберіть змагання</h4>
      <form onSubmit={onFilter}>
        <Radio
          options={filterOptions}
          value={filter}
          name="eventFilter"
          onChange={(f) => setFilter(f)}
        />
        <div className="col-auto mt-3">
          <button type="submit" className="btn btn-primary mb-3">
            Показати
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventSelectorHeader;
