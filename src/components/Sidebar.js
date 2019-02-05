import React from "react";
import Searchbar from "./Searchbar";
import Countrycard from "./Countrycard";

class Sidebar extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            country: "",
            listLoaded: false
        }
    }

    componentDidMount() {
        fetch("https://restcountries.eu/rest/v2/all")
		.then(res => res.json())
		.then(data => {
            console.log(Object.values(data));
            this.setState({
				listLoaded: true,
				data: data
			})
		});
    }

    render() {
        return (
            <div className="col-4">
                <Searchbar />
                {!(this.state.listLoaded) && <p>Loading...</p>}
                <div className="container sidebar">
                    {this.state.data.map(
                        country => (
                            <Countrycard key={country.alpha3Code} name={country.name} flag={country.flag} />
                        )
                    )}
                </div>
            </div>
        )
    }
}

export default Sidebar;