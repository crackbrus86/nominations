import React from "react";

const OfficialForm = (props) => {
    if(props.nomination.type !== "official") return null;
    return (<div>Official</div>);
}
export default OfficialForm;