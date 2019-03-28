import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Char extends Component {
    // Initialize the state
    constructor(props) {
        super(props);
        this.state = {
            char: "",
            realm: "",
            back: "",
            chest: "",
            feet: "",
            finger1: "",
            finger2: "",
            hands: "",
            head: "",
            legs: "",
            mainHand: "",
            neck: "",
            shoulder: "",
            tabard: "",
            trinket1: "",
            trinket2: "",
            waist: "",
            wrist: "",

            initial: true
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
                char = char[0];
                console.log(char);
                console.log(char.name);
                this.setState({
                     char: char.name,
                    realm: char.realm,
                    back: char.items.back.name,
                    chest: char.items.chest.name,
                    feet: char.items.feet.name,
                    finger1: char.items.finger1.name,
                    finger2: char.items.finger2.name,
                    hands: char.items.hands.name,
                    head: char.items.head.name,
                    legs: char.items.legs.name,
                    mainHand: char.items.mainHand.name,
                    neck: char.items.neck.name,
                    shoulder: char.items.shoulder.name,
                    tabard: char.items.tabard.name,
                    trinket1: char.items.trinket1.name,
                    trinket2: char.items.trinket2.name,
                    waist: char.items.waist.name,
                    wrist: char.items.wrist.name,
                    initial: false
                })

            });
    }
    render() {
        const { char } = this.state;
        if (this.state.initial)
            return (<div className="App">
                <h1>Loading...</h1>
            </div>);
        else {

            return (
                <div className="App">
                    <h1>Character Info</h1>
                    {/* Check to see if any items are found*/}
                    {console.log(this.state)}
                    Character: {this.state.char}<br />
                    Realm: {this.state.realm} <br />
                    <h2>Equipment</h2><br />
                    Back: {this.state.back}<br />
                    Chest: {this.state.chest}<br />
                    Feet: {this.state.feet}<br />
                    Finger 1: {this.state.finger1}<br />
                    Finger2: {this.state.finger2}<br />
                    Hands: {this.state.hands}<br />
                    Head: {this.state.head}<br />
                    Legs: {this.state.legs}<br />
                    Main Hand: {this.state.mainHand}<br />
                    Neck: {this.state.neck}<br />
                    Shoulder: {this.state.shoulder}<br />
                    Tabard: {this.state.tabard}<br />
                    Trinket 1: {this.state.trinket1}<br />
                    Trinket 2: {this.state.trinket2}<br />
                    Waist: {this.state.waist}<br />
                    Wrist: {this.state.wrist}<br />




                    <Link to="./">Return</Link>

                </div>
            );
        }
    }
}

export default Char;

