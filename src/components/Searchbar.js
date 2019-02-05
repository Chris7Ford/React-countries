import React from "react";

const Searchbar = () => {
 return (
    <div className="row">
        <div className="input-group col-12">
          <input type="text" className="form-control" placeholder="Search for..." />
          <span className="input-group-btn">
          </span>
        </div>
    </div>
 )
}

export default Searchbar;