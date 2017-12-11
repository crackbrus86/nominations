import React from "react";
import {render} from "react-dom";
import $ from "jquery";
import NomMnmApp from "./views/layout";

var regId = $("#nm-app").data("rel");

render(<NomMnmApp region={regId} />, document.getElementById("nm-app"));