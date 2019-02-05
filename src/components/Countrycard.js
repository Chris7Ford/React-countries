import React from "react";

const Countrycard = (props) => {
    return (
        <div onClick={() => {props.select_country(props.data)}} className="row card">
            <span className="col-2 align-middle">
                <img className="thumb" src={props.data.flag} alt={`${props.data.name} flag`} />
            </span>
            <span className="col-10 align-middle">
                {props.data.name}
            </span>
        </div>
    )
}

export default Countrycard;