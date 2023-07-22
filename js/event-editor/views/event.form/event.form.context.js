import React from "react";
import moment from "moment";

import { useEventsServices } from '../events.services.context';
import { useEvents } from "../events.context";

const EventFormContext = React.createContext();

const defaultGenderConfig = {
    male: { title: "", auto: true },
    female: { title: "", auto: true },
  };

const EventFormContextProvider = ({ children }) => {
  const { eventTypes } = useEvents();

  const { createEvent, getEventDetails, updateEvent, deleteEvent } = useEventsServices();
  const [event, setEvent] = React.useState(null);
  const [eventSnapshot, setEventSnapshot] = React.useState(null);
  const [showExitWithoutSaving, setShowExitWithoutSaving] = React.useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
  const [errors, setErrors] = React.useState({
    title: null,
    event_type: null,
    location: null,
    start_date: null,
    end_date: null,
    maleTitle: null,
    femaleTitle: null,
  });

  const [genderConfig, setGenderConfig] = React.useState({...defaultGenderConfig});

  const onAddEvent = () => {
    const newEvent = {
      id: null,
      title: "",
      location: "",
      start_date: null,
      end_date: null,
      event_type: "",
      is_school: false,
      is_cup: false,
      event_type_id: null,
    };
    setEvent(newEvent);
    setEventSnapshot(newEvent);

    setGenderConfig({ ...defaultGenderConfig });
  };

  const onOpenEvent = async (event) => {
    const eventDetails = await getEventDetails({ event_id: event.id });
    const maleInfo = eventDetails.find(x => x.gender === 'male');
    const femaleInfo = eventDetails.find(x => x.gender === 'female');
    const eventType = eventTypes.find(type => type.eventType == event.event_type);
    if(!!eventType)
      event.event_type_id = eventType.id;

    setEvent(event);
    setEventSnapshot(event);
    setGenderConfig({
      male: { 
        title: maleInfo ? maleInfo.name : genderConfig.male.title,
        auto: false
      },
      female: {
        title: femaleInfo ? femaleInfo.name : genderConfig.female.title,
        auto: false
      }
    });
  };

  const setMale = ({ title, auto }) => {
    setGenderConfig({
      ...genderConfig,
      male: { title: auto ? `${event.title} (чоловіки)` : title, auto },
    });
  };

  const setFemale = ({ title, auto }) => {
    setGenderConfig({
      ...genderConfig,
      female: { title: auto ? `${event.title} (жінки)` : title, auto },
    });
  };

  const isFormValid = () => {
    const nextErrors = {
      title: !event.title ? "Введіть назву змагань" : null,
      event_type: !event.event_type ? "Оберіть вид змагань" : null,
      location: !event.location ? "Вкажіть місце проведення" : null,
      start_date: !event.start_date ? "Оберіть дату початку змагань" : null,
      end_date: !event.end_date ? "Оберіть дату завершення змагань" : null,
      maleTitle: !genderConfig.male.title
        ? "Введіть назву для змагань чоловіків"
        : null,
      femaleTitle: !genderConfig.female.title
        ? "Введіть назву для змагань жінок"
        : null,
    };

    if (
      !nextErrors.start_date &&
      !nextErrors.end_date &&
      moment(event.start_date).isAfter(event.end_date)
    )
      nextErrors.end_date =
        "Дата завершення змагань передує даті початку змагань";
    setErrors(nextErrors);

    for (let error in nextErrors) {
      if (nextErrors[error] !== null) return false;
    }
    return true;
  };

  const onChangeTitle = (title) => {
    const maleTitle = !!title ? `${title} (чоловіки)` : "";
    const femaleTitle = !!title ? `${title} (жінки)` : "";

    setEvent({ ...event, title });
    setGenderConfig({
      male: {
        ...genderConfig.male,
        title: genderConfig.male.auto ? maleTitle : genderConfig.male.title,
      },
      female: {
        ...genderConfig.female,
        title: genderConfig.female.auto
          ? femaleTitle
          : genderConfig.female.title,
      },
    });
  };

  const handleCloseEvent = () => {
    setEvent(null);
    setGenderConfig(defaultGenderConfig);
  };

  const onCloseEvent = () => {
    if (JSON.stringify(event) != JSON.stringify(eventSnapshot))
      setShowExitWithoutSaving(true);
    else handleCloseEvent();
  };

  const onSaveEvent = () => {
    setShowExitWithoutSaving(false);
    handleCloseEvent();
  };

  const onCloseExitWithoutSavingModal = () => {
    setShowExitWithoutSaving(false);
  };

  const onCloseWithoutSaving = () => {
    setShowExitWithoutSaving(false);
    handleCloseEvent();
  };

  const onCreateEvent = async () => {
    const isValid = isFormValid();
    if (!isValid) return;
    
    await createEvent({ event, genderConfig });
    handleCloseEvent();
  };

  const onUpdateEvent = async () => {
    const isValid = isFormValid();
    if(!isValid) return;

    await updateEvent({ event, genderConfig });
    handleCloseEvent();
  };

  const handleClickOnDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  const onDeleteEvent = async () => {
    await deleteEvent({ id: event.id });
    setShowConfirmDelete(false);
    handleCloseEvent();
  };

  const value = {
    event,
    genderConfig,
    errors,
    showExitWithoutSaving,
    showConfirmDelete,
    onAddEvent,
    setEvent,
    setMale,
    setFemale,
    isFormValid,
    onChangeTitle,
    onOpenEvent,
    onCloseEvent,
    onSaveEvent,
    onCloseExitWithoutSavingModal,
    onCloseWithoutSaving,
    onCreateEvent,
    onUpdateEvent,
    onDeleteEvent,
    handleClickOnDelete,
    handleCancelDelete,
  };
  return (
    <EventFormContext.Provider value={value}>
      {children}
    </EventFormContext.Provider>
  );
};

const useEventForm = () => {
  const context = React.useContext(EventFormContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within EventFormContextProvider");
  }
  return context;
};

export { EventFormContextProvider, useEventForm };
