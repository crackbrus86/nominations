import React from "react";
import { render } from "react-dom";

import EventsContainer from "./views/events.container";
import '../../styles/style-event.scss';

render(<EventsContainer />, document.getElementById("event-editor"));
