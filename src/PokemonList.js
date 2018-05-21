import React, { Component } from 'react';
import Pokemon from './Pokemon.js'

class PokemonList extends Component {
    state = {
        list: [],
    };

    componentDidMount() {
        this._getPokemonList();
    }

    async _getPokemonList() {
        try {
            const result = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0');
            if (result) {
                const resultJson = await result.json();
                const listObj = resultJson.results
                const listNames = listObj.map((item) => item.name);

                console.log(listNames);
                this.setState({
                    list: listNames,
                });
            }
        } catch (err) {
        }   
    }

    _renderPokemonList() {
        let component = this.state.list.map((item, index) => 
            <Pokemon key={index} index={index+1} name={`${item[0].toUpperCase() + item.slice(1)}`} />
        );
        return component;
    }

    render() {
        return(
            <section className='PokemonList' style={{backgroundColor: 'LightBlue'}}>
                {this._renderPokemonList()}
            </section>
        );
    }
}

export default PokemonList;