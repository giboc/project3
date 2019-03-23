// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// var axios = require("axios");


// var mongojs = require('mongojs');
// let db = mongojs("wow",["char"]);


// class App extends Component {

//   state = {char:[]}

//   componentDidMount(){
//       this.loadChar();
//   }

//   loadChar = () => {
//     fetch('/test')
//       .then(res => {
//         console.log(res.json())

//       })
      
      
//   }

//   render() {
//     return (
//       <div className="App">
//         <h1>Users</h1>

//         {this.state.char}
//         {/* {this.state.char.map(char =>
//           <div key={char.data}>{char.data}</div>
//         )} */}
//       </div>
      
//       // <div className="App">
//       //   <header className="App-header">
//       //     <img src={logo} className="App-logo" alt="logo" />
//       //     <p>
//       //       Edit <code>src/App.js</code> and save to reload.
//       //     </p>
//       //     <a
//       //       className="App-link"
//       //       href="https://reactjs.org"
//       //       target="_blank"
//       //       rel="noopener noreferrer"
//       //     >
//       //       Learn React
//       //     </a>


//       //   </header>


//       //</div>
//     );
//   }
// }

// export default App;



import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Char from './pages/Char';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/char' component={Char}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;



