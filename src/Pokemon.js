import React, { Component, Fragment } from 'react';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';
import './style.css';

class Pokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacityVal: 1.0,
            infoOpen: false,
            loaded: false,
            info: null,
        }
    }

    async _loadInfo() {
        try {
            const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.index}`);
            if (result) {
                const resultJson = await result.json();
                return resultJson;
            }
        } catch (err) {
        }
    }

    onOpenModal = () => {
        if (this.state.loaded === false) {
            this._loadInfo().then((result) => {
                console.log("loaded info");
                console.log(result);
                this.setState({ opacityVal: 0.5, infoOpen: true, loaded: true, info: result });               
            })
        } else {
            console.log("Loaded already");
            console.log(this.state.info)
            this.setState({ opacityVal: 0.5, infoOpen: true })
        }
    }

    onCloseModal = () => {
        this.setState({ opacityVal: 1.0, infoOpen: false });
    }

    render() {
        return(
            <Fragment>
                <div className='PokeBox' style={{opacity: `${this.state.opacityVal}`}} onClick={this.onOpenModal}>
                    #{this.props.index}
                    <img src={require(`./images/pokemon/main-sprites/black-white/${this.props.index}.png`)} alt=''/>
                    {this.props.name}
                </div>
                <Modal open={this.state.infoOpen} onClose={this.onCloseModal} center>
                    <div className='PokeInfo'>
                        <div className='PokeImg'>
                            <img src={require(`./images/pokemon/main-sprites/black-white/${this.props.index}.png`)} alt=''/>
                        </div>
                        <div className='InfoBox'>
                            <div>
                                {this.props.name}
                            </div>
                            <div>
                                {}
                            </div>
                        </div>
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

Pokemon.propTypes = {
    index: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default Pokemon;