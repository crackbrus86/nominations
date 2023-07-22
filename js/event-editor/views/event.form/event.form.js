import React from "react";

import { useEvents } from "../events.context";
import { useEventForm } from "./event.form.context";
import { useEventsServices } from '../events.services.context';
import CheckBox from "./controls/check.box";
import DateBox from "./controls/date.box";
import ExitWithoutSavingModal from "./exit.without.saving.modal";
import TextBox from "./controls/text.box";
import SelectBox from "./controls/select.box";
import GenderConfig from "./gender.config";
import LoadingIndicator from "../../components/loading.indicator";
import ConfirmDeleteEventModal from "./confirm.delete.event.modal";

const EventForm = () => {
  const { eventTypes } = useEvents();

  const {
    event,
    setEvent,
    errors,
    showExitWithoutSaving,
    onChangeTitle,
    onCloseEvent,
    onSaveEvent,
    onCloseExitWithoutSavingModal,
    onCloseWithoutSaving,
    onCreateEvent,
    onUpdateEvent,
    showConfirmDelete,
    onDeleteEvent,
    handleClickOnDelete,
    handleCancelDelete,
  } = useEventForm();

  const { isLoading } = useEventsServices();

  const eventTypeOptions = eventTypes.map((eventType) => ({
    value: eventType.eventType,
    text: eventType.name,
  }));

  const handleEventTypeChange = (v) => {
    const eventType = eventTypes.find(et => et.eventType === v);
    setEvent({...event, event_type: v, event_type_id: !!eventType ? eventType.id : null });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!event.id)
      await onCreateEvent();
    else
      await onUpdateEvent();
  };

  return (
    event && (
      <div className="event-form">
        <form onSubmit={handleSubmit}>
          <TextBox
            value={event.title}
            label="Назва"
            onChange={(v) => onChangeTitle(v)}
            required
            error={errors.title}
          />
          <SelectBox
            value={event.event_type}
            label="Вид змагань"
            items={eventTypeOptions}
            onChange={(v) => handleEventTypeChange(v)}
            required
            error={errors.event_type}
          />
          <TextBox
            value={event.location}
            label="Місце проведення"
            onChange={(v) => setEvent({ ...event, location: v })}
            required
            error={errors.location}
          />
          <DateBox
            value={event.start_date}
            label="Дата початку"
            onChange={(v) => setEvent({ ...event, start_date: v })}
            required
            error={errors.start_date}
          />
          <DateBox
            value={event.end_date}
            label="Дата завершення"
            onChange={(v) => setEvent({ ...event, end_date: v })}
            required
            error={errors.end_date}
          />
          <CheckBox
            value={event.is_school}
            label="Це змагання для учнів ДЮСШ"
            onChange={(v) => setEvent({ ...event, is_school: v })}
          />
          <CheckBox
            value={event.is_cup}
            label="Це змагання типу “Кубок”"
            onChange={(v) => setEvent({ ...event, is_cup: v })}
          />
          <GenderConfig />
          <button
            type="button"
            className="btn btn-light me-4"
            onClick={onCloseEvent}
          >
            Назад
          </button>
          {!event.id && (
            <button type="submit" className="btn btn-primary">
              Створити
            </button>
          )}
          {!!event.id && (
            <button type="submit" className="btn btn-primary me-4">
              Зберегти
            </button>
          )}
          {!!event.id && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleClickOnDelete}
            >
              Видалити
            </button>
          )}
        </form>
        <ExitWithoutSavingModal
          isOpen={showExitWithoutSaving}
          onCloseWindow={onCloseExitWithoutSavingModal}
          onExitWithoutSaving={onCloseWithoutSaving}
          onSave={onSaveEvent}
        />
        <ConfirmDeleteEventModal
          isOpen={showConfirmDelete}
          onClose={handleCancelDelete}
          onConfirm={onDeleteEvent}
        />
        <LoadingIndicator isOpen={isLoading} />
      </div>
    )
  );
};

export default EventForm;
