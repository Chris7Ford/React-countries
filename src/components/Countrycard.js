import React from "react";

const Countrycard = (props) => {
    return (
        <div className="row card">
            <span className="col-2 align-middle">
                <img className="thumb" src={props.flag} alt={`{props.name} flag`} />
            </span>
            <span className="col-10 align-middle">
                {props.name}
            </span>
        </div>
    )
}

export default Countrycard;