import React from "react";
import Regions from "../views/regions";
import Competitions from "../views/competitions";

const SettingsApp = (props) => {
    return(<div className="row-wrap">
        <div className="col-flex">
            <Regions />
        </div>
        <div className="col-flex">
            <Competitions />
        </div>
    </div>)
}

export default SettingsApp;