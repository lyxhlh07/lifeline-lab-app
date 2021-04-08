import React, { Component } from 'react';
import './style.scss';

class Card extends Component {
    render() {
        return (
            <div className="card" style={{ width: this.props.width, marginBottom: this.props.marginBottom }}>
                {this.props.children}
            </div>
        );
    }
}

export default Card;