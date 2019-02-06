import React from "react";

class Countryinfo extends React.Component {

    constructor() {
        super();
        this.state = {
            neighbors: null,
            neighbors_loaded: false,
            wikiHTML: null
        }
        this.get_neighboring_flags = this.get_neighboring_flags.bind(this);
        this.select_neighbor = this.select_neighbor.bind(this);
        this.get_wiki_info = this.get_wiki_info.bind(this);
    }

    get_neighboring_flags = (props) => {
        this.setState({neighbors: [], neighbors_loaded: false});
        for (let i = 0; i < props.data.borders.length; i++) {
            fetch(`https://restcountries.eu/rest/v2/alpha/${props.data.borders[i]}`)
                .then(res => res.json())
                .then(data => {
                    this.setState({ neighbors: [...this.state.neighbors, data.flag], neighbors_loaded: true })
            });
        }
        setTimeout(() => {
            this.props.toggle_render_false();
        }, 300);
    }

    select_neighbor = (code) => {
        this.props.toggle_render_true();
        fetch(`https://restcountries.eu/rest/v2/alpha/${code}`)
        .then(res => res.json())
        .then(data => {
            this.props.select_country(data)
      });
    }

    get_wiki_info = () => {
        console.log("we are in the function");
        fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=${this.props.data.name.split(" ").join("_").toLowerCase()}&redirects=true&origin=*&exsentences=10&formatversion=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                wikiHTML: data.query.pages[Object.keys(data.query.pages)[0]].extract.replace(/<\/?[^>]+(>|$)/g, "")
            }, () => {console.log(this.state)})
      });
    }

    componentDidMount() {
        if (this.props.render_neighbor)
            this.get_neighboring_flags(this.props);
        this.get_wiki_info();
    }

    componentWillReceiveProps(nextProps) {
        this.get_wiki_info();
        this.setState({
            neighbors: Array.from(new Set(this.state.neighbors))
        })
        setTimeout(() => {
            if (this.props.render_neighbor)
                this.get_neighboring_flags(this.props);
          }, 100);
    }

    render() {
        return(
            <div className="col-7">
                <div className="card cinfo text-center info">
                <img src={this.props.data.flag} className="bg"/>
                  <div className="card-body">
                    <h5 className="card-title">{this.props.data.name}</h5>
                    <p className="card-text">
                        Capital: {this.props.data.capital} <br />
                        Region: {this.props.data.region} <br />
                        Subregion: {this.props.data.subregion} <br />
                        Population: {this.props.data.population} <br />
                        Area: {this.props.data.area} <br />
                        {/*If you originated from {this.props.data.name}, then you are {this.props.data.demonym} <br />*/}
                        Currencies: {this.props.data.currencies.map(currency => (
                            `${currency.name} (${currency.symbol}) `
                        ))} <br />
                        Languages: {this.props.data.languages.map(currency => (
                            `${currency.name} (${currency.nativeName}) `
                        ))} <br />
                        Neighbors: {this.state.neighbors_loaded && this.state.neighbors.map(neighbor => (
                            <img onClick={() => {this.select_neighbor(neighbor.split("/").pop().split(".")[0])}} src={neighbor} className="thumb" key={neighbor.split("/")[neighbor.length - 1]}/>
                        ))} <br /><br /><br />
                        <div className="content">
                            {this.state.wikiHTML}
                        </div>
                    </p>
                    <a href="#" className="btn btn-primary">More information</a>
                  </div>
                </div>
            </div>
        )
    }
}

export default Countryinfo;