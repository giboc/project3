import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Axios from 'axios';


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

            yourCrit: 0,
            yourHaste: 0,
            yourMastery: 0,
            yourVersatility: 0,


            critIdeal: 0,
            hasteIdeal: 0,
            masteryIdeal: 0,
            versatilityIdeal: 0,
            simDPS: 0,

            image: "",

            optimal1: "",
            optimal2: "",
            optimal3: "",

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

                    yourCrit: char.stats.critRating,
                    yourHaste: char.stats.hasteRating,
                    yourMastery: char.stats.masteryRating,
                    yourVersatility: char.stats.versatility,

                    image: `https://render-us.worldofwarcraft.com/character/${char.thumbnail}`,

                    initial: false
                })

            }).then(() => {
                let input = {
                    class: getClass(this.state.class, 1),
                    spec: (this.state.spec).toLowerCase()
                }
                Axios.post('/api/secondary', { input })
                    .then(response => {
                        this.setState({
                            critIdeal: response.data.crit + "%",
                            hasteIdeal: response.data.haste + "%",
                            masteryIdeal: response.data.mastery + "%",
                            versatilityIdeal: response.data.versatility + "%",
                            simDPS: response.data.dps
                        })
                        console.log(response)
                        let statArray = [];  
                        let insertStat = (stat, value) => {
                            let statBlock = {
                                name: "",
                                value: 0
                            }
                            statBlock.name = stat;
                            statBlock.value = value;
                            return statBlock;
                        };

                        
                        statArray.push(insertStat("Crit", response.data.crit))
                        statArray.push(insertStat("Haste", response.data.haste))
                        statArray.push(insertStat("Mastery", response.data.mastery))
                        statArray.push(insertStat("Versatility", response.data.versatility))

                        statArray.sort( function(a,b) {
                            return a.value - b.value;
                        });
                        console.log(statArray)
                        this.setState({
                            optimal1: statArray[3].name,
                            optimal2: statArray[2].name
                        })
                        if (statArray[1].value === statArray[2].value){
                            this.setState({
                                optimal3: statArray[1].name
                            })
                        }
                    });
            })
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
                    Class: {getClass(this.state.class, 0)}<br />
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
                            <h2>Secondary Stat Breakdown (Patchwerk)</h2>
                            <h3>Ideal distribution:</h3>
                            Crit: {this.state.critIdeal}<br />
                            Haste: {this.state.hasteIdeal}<br />
                            Mastery: {this.state.masteryIdeal}<br />
                            Versatility: {this.state.versatilityIdeal}<br />
                            Sim DPS: {this.state.simDPS}<br />

                            <br /><h3>Your distribution:</h3>
                            Crit: {this.state.yourCrit} ({(this.state.yourCrit / (this.state.yourCrit + this.state.yourHaste + this.state.yourMastery + this.state.yourVersatility) * 100.00).toFixed(2)}%)<br />
                            Haste: {this.state.yourHaste} ({(this.state.yourHaste / (this.state.yourCrit + this.state.yourHaste + this.state.yourMastery + this.state.yourVersatility) * 100.00).toFixed(2)}%)<br />
                            Mastery: {this.state.yourMastery} ({(this.state.yourMastery / (this.state.yourCrit + this.state.yourHaste + this.state.yourMastery + this.state.yourVersatility) * 100.00).toFixed(2)}%)<br />
                            Versatility: {this.state.yourVersatility} ({(this.state.yourVersatility / (this.state.yourCrit + this.state.yourHaste + this.state.yourMastery + this.state.yourVersatility) * 100.00).toFixed(2)}%)<br />

                        </Col>
                    </Row>

                    <br />
                    <h1>Gear replacements!</h1>
                    Your best stats are: <br />
                    1) {this.state.optimal1} <br />
                    2) {this.state.optimal2} <br />
                    {this.state.optimal3 != "" &&
                        <p>3) {this.state.optimal3} </p>
                    } <br />







                        <Link to="./">Return</Link>
                </Container>
            </div>
        );
    }
}
}

export default Char;

