import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Char extends Component {
    // Initialize the state
    constructor(props) {
        super(props);
        this.state = {
            char: []
        }
    }

    // Fetch the list on first mount
    componentDidMount() {
        this.getChar();
    }

    // Retrieves the list of items from the Express app
    getChar = () => {
        fetch('/api/char')
        .then(res => res.json())
        .then(char => {
            console.log(char[0]);
            this.setState(char[0]);
            console.log(this.state);
        })
            
    };

    render() {
        const { char } = this.state;

        return (
            <div className="App">
                <h1>List of Items</h1>
                {/* Check to see if any items are found*/}
                Character: {this.state.name}<br />
                Realm: {this.state.realm} <br />
                
            <Link to="./">Return</Link>

            </div>
        );
    }
}

export default Char;

