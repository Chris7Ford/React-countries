import React from "react";
import Searchbar from "./Searchbar";
import Countrycard from "./Countrycard";

const Sidebar = (props) => {
    
    return (
        <div className="col-5">
            <Searchbar handleFilter={props.handleFilter}/>
            {!(props.listLoaded) && <p>Loading...</p>}
            <div className="container info">
                {props.filtered_data.map(
                    country => (
                        <Countrycard select_country={props.select_country} key={country.alpha3Code} data={country} toggle_render_true={props.toggle_render_true} />
                    )
                )}
            </div>
        </div>
    )
}

export default Sidebar;