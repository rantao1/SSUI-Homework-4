import React, { Component } from 'react';
import './App.css';

class ListItem extends Component {

	render() {
		return(
			<div className="Productcard" onClick={this.props.onClick}>
				<div className="Productcard-inner">
					<div className="Product-img">
						<div className="Product-img-wrapper">
							<img className="Show-img" src={this.props.productImg} alt="" />
						</div>
					</div>

					<div className="Product-info-content">
						<span className="Title">{this.props.productName}</span>
					</div>

					<div className="Product-info-price">
						<span className="Currency-sign">$</span>
						<span className="Price">{this.props.productPrice}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default ListItem;