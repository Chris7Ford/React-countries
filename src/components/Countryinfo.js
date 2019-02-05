import React from "react";

const Countryinfo = (props) => {

    let bigStyle = {
        backgroundImage: `url('${props.data.flag}')`
    }

    return(
        <div className="col-7">
            <div class="card cinfo text-center info">
            <img src={props.data.flag} className="bg"/>
              <div class="card-body">
                <h5 class="card-title">{props.data.name}</h5>
                <p class="card-text">Capital: {props.data.capital}</p>
                <a href="#" class="btn btn-primary">More information</a>
              </div>
            </div>
        </div>
    )
}

export default Countryinfo;