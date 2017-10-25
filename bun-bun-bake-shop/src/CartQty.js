import React, { Component } from 'react';
import './App.css';

class CartQty extends Component {

	render() {
		return (
			<input readOnly type="text" id="Cart-quantity" value={this.props.Qty} />
		);
	}
}

export default CartQty;