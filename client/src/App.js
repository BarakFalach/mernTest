import React, {Fragment} from 'react'
import './App.css';

const App = () => {
  return (
    <div className ='App'>
      <header>
       <h1> log in screen</h1>
      </header>
      <div id = "input_div">
        <i>Name</i>
        <i>onther name</i>
      </div>
      <div id = "input_div">
        <input id = "input1"/>
        <input/>
      </div>
      <div id = "input_div">
        <button>Submit</button>
      </div>
    </div>
  );
}

export default App;
