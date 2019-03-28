import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';


let getClass = (id, type) => {
    if (type === 0) {
        switch (id) {
            case 1: return "Warrior";
            case 2: return "Paladin";
            case 3: return "Hunter";
            case 4: return "Rogue";
            case 5: return "Priest";
            case 6: return "Death Knight";
            case 7: return "Shaman";
            case 8: return "Mage";
            case 9: return "Warlock";
            case 10: return "Monk";
            case 11: return "Druid";
            case 12: return "Demon Hunter";
            default: return "No class";
        }
    }
    else if (type === 1) {
        switch (id) {
            case 1: return "warrior";
            case 2: return "paladin";
            case 3: return "hunter";
            case 4: return "rogue";
            case 5: return "priest";
            case 6: return "death_knight";
            case 7: return "shaman";
            case 8: return "mage";
            case 9: return "warlock";
            case 10: return "monk";
            case 11: return "druid";
            case 12: return "demon_hunter";
            default: return "error";
        }
    }
}

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

            spec: "",

            crit: 0,
            haste: 0,
            mastery: 0,
            versatility: 0,

            image: "",

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

                    class: char.class,
                    spec: char.talents[0].spec.name,

                    image: `https://render-us.worldofwarcraft.com/character/${char.thumbnail}`,

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

                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                        crossOrigin="anonymous"
                    />
                    <Container>


                        <h1>Character Info</h1><br />

                        <Image src={this.state.image} /><br />

                        Character: {this.state.char}<br />
                        Realm: {this.state.realm} <br />
                        Class: {getClass(this.state.class,0)}<br />
                        Spec: {this.state.spec} <br />

                        <Row>

                            <Col>
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
                            </Col>
                            <Col>
                                <h2>Secondary Stat Breakdown</h2>
                                Crit: {this.state.crit}<br />
                                Haste: {this.state.haste}<br />
                                Mastery: {this.state.mastery}<br />
                                Versatility: {this.state.versatility}<br />
                            </Col>
                        </Row>





                        <Link to="./">Return</Link>
                    </Container>
                </div>
            );
        }
    }
}

export default Char;

