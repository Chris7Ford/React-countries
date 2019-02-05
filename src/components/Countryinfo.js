import React from "react";

const Countryinfo = (props) => {
    return(
        <div className="col-7">
            <p>{props.data.name}</p>
        </div>
    )
}

export default Countryinfo;