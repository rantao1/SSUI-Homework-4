import React, { Component } from 'react';
import './App.css';

class Recommendations extends Component {

	render() {
		return(
			<div className="Product">
				<div className="Product-image">
					<img className="Product-thumbnail" src={this.props.productImg} alt="" />
				</div>

				<div className="Product-info">
					<h5>{this.props.productName} <br />$ {this.props.productPrice}</h5>
					<p>{this.props.productDetail1}</p>
				</div>

				<div className="More-btn" onClick={this.props.onClick}>
				add to cart
				</div>
			</div>
		);
	}
}

export default Recommendations;