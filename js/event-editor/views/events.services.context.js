import { createContext, useState, useContext } from "react";
import moment from "moment";

const EventsServicesContext = createContext();

const EventsServicesContextProvider = ({ children }) => {
  const MESSAGES_TIMEOUT = 3000;
  const baseUrl = "../wp-content/plugins/nominations/api";
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ error: null, success: null });

  const showSuccess = (successAlert) => {
    setAlert({ ...alert, success: successAlert });
    setTimeout(() => {
        setAlert({ ...alert, success: null });
    }, MESSAGES_TIMEOUT);
  };

  const showError = (errorAlert) => {
    setAlert({ ...alert, error: errorAlert });
    setTimeout(() => {
        setAlert({ ...alert, error: null });
    }, MESSAGES_TIMEOUT);
  };

  const sendPostRequest = async ({ url, body }) => {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  const sendGetRequest = async ({ url, query = null }) => {
    const getUrl = query != null ? `${url}?${new URLSearchParams(query)}` : url;
    return await fetch(getUrl);
  };

  const sendRequest = async ({ url, method, request }) => {
    setIsLoading(true);

    try {
      let response;
      switch (method) {
        case "POST": {
          response = await sendPostRequest({ url, body: request });
          break;
        }
        case "GET": {
          response = await sendGetRequest({ url, query: request});
          break;
        }
        default:
          console.error("Unknown http method called");
      }

      setIsLoading(false);

      const result = await response.json();

      switch (result.status) {
        case "Success": {
          if(result.message !== null)
            showSuccess(result.message);
          if(result.data !== null)
            return result.data;
          break;
        }
        case "Error": {
          showError(result.message);
          break;
        }
        default:
          console.error(`Unknown response status: ${result.status}`);
      }
    } catch (err) {
      setIsLoading(false);
      console.error(`Finished with error: ${err}`);
    }
  };

  const createEvent = async ({ event, genderConfig }) => {
    const url = baseUrl + "/events/AddEvent.php";
    const request = {
      title: event.title,
      location: event.location,
      start_date: event.start_date,
      end_date: event.end_date,
      event_type: event.event_type,
      event_type_id: event.event_type_id,
      is_school: event.is_school,
      is_cup: event.is_cup,
      title_male: genderConfig.male.title,
      title_female: genderConfig.female.title,
    };

    await sendRequest({url, method: "POST", request});
  };

  const getAllEvents = async () => {
    const url = baseUrl + "/events/GetAll.php";
    return await sendRequest({ url, method: "GET" });
  };

  const getEventDetails = async ({ event_id }) => {
    const url = baseUrl + "/events/GetEventDetails.php";
    return await sendRequest({ url, method: "GET", request: { event_id } });
  };

  const deleteEvent = async ({ id }) => {
    const url = baseUrl + "/events/DeleteEvent.php";
    return await sendRequest({ url, method: "POST", request: { id } });
  };

  const updateEvent = async ({ event, genderConfig }) => {
    const url = baseUrl + "/events/UpdateEvent.php";
    const request = {
      id: event.id,
      title: event.title,
      location: event.location,
      start_date: moment(event.start_date).format('YYYY-MM-DD'),
      end_date: moment(event.end_date).format('YYYY-MM-DD'),
      event_type: event.event_type,
      event_type_id: event.event_type_id,
      is_school: event.is_school,
      is_cup: event.is_cup,
      title_male: genderConfig.male.title,
      title_female: genderConfig.female.title,
    };
    return await sendRequest({url, method: "POST", request});
  };

  const getEventTypes = async () => {
    const url = baseUrl + "/events/GetEventTypes.php";
    return await sendRequest({ url, method: "GET" });
  };

  const value = {
    getAllEvents,
    createEvent,
    getEventDetails,
    updateEvent,
    getEventTypes,
    deleteEvent,
    isLoading,
    alert,
  };

  return (
    <EventsServicesContext.Provider value={value}>
      {children}
    </EventsServicesContext.Provider>
  );
};

const useEventsServices = () => {
  const context = useContext(EventsServicesContext);
  if (context === undefined) {
    throw Error("useEventsServices must be used within EventsServicesContextProvider");
  }
  return context;
};

export { EventsServicesContextProvider, useEventsServices };
