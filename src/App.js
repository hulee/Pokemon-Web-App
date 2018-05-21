import React, { Component } from 'react';
import './style.css';
import PokemonList from './PokemonList.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PokemonList />
      </div>
    );
  }
}

export default App;
