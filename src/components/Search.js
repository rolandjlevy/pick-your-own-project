import React from 'react';

class Search extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.receiveSearchSubmit();
    }

    handleChange(event) {
        this.props.receiveSearchInput(event.target.value);
    }

    render () {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        onChange={this.handleChange} 
                        id="search" 
                        type="text"
                        className="search" 
                        placeholder="Search for a city..." 
                        autoComplete="city"
                    />
                    {/* <button type="submit">Search</button> */}
                </form>
            </div>
        )
    }
}

export default Search;