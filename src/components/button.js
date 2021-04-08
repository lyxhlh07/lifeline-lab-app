import React, { Component } from 'react';
import './style.scss';

class Button extends Component {
    render() {
        return (
            <div className="button" onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}

export default Button;