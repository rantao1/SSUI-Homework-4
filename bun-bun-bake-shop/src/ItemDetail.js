import React, { Component } from 'react';
import './App.css';
// import { AsyncStorage } from 'AsyncStorage';
import AsyncStorage from './AsyncStorage.js';

class ItemDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 1,
		};
	}

	handleChange(e) {
		console.log('handle change called');
	}

	handleAdd() {
		var i = this.state.value
		i = i + 1
		this.setState({value: i})
		this.handleChange();
	}

	handleDrop() {
		var i = this.state.value
		if (i>1) {
			i = i - 1
		} else {
			i = 1
		}
		this.setState({value: i})
		this.handleChange();
	}

	addToCart() {
		var Qty = this.state.value

		AsyncStorage.getItem(this.props.productId, (err, result) => {	
				if (result === undefined) {
					
				} else {
					var i = JSON.parse(result);
					Qty = Qty + i.productQty;
				}
		});

		var addedItem = {
			productId: this.props.productId,
			productImg: this.props.productImg,
			productName: this.props.productName,
			productPrice: this.props.productPrice,
			productQty: Qty
		}

		AsyncStorage.setItem(this.props.productId, JSON.stringify(addedItem), () => {
			AsyncStorage.getItem(this.props.productId, (err, result) => {
				console.log(result);
			});
		});

		this.setState({value: 1});
	}

	render() {
		return (
			<div className="Modal">
				<div className="Modal-content">
					<span className="Close" onClick={this.props.onClose}>&times;</span>
					
					<div className="Detail-image-container">
						<img src={this.props.productImg} alt="" className="Product-detail-photo"/>
					</div>

					<div className="Detail-container">
						<span className="Hide">{this.props.productId}</span>

						<h2 className="Detail-text">{this.props.productName}</h2>

						<div className="Ingredient-wrap">
							<img src={this.props.ingredientImg} alt="" className="Ingredient-photo"/>
						</div>

						<div className="Detail-info">
							<p>{this.props.productDetail1}</p>
							<p>{this.props.productDetail2}</p>
						</div>

						<div className="Add-product" >
							<p>Price: $<span id="current-price">{this.props.productPrice * this.state.value}</span></p>
							<div onClick={this.addToCart.bind(this)}>
								<a className="Addcart-btn" onClick={this.props.onClose}>add to cart</a>
							</div>
						</div>

						<div className="Quantity">
							<div className="Quantity-wrapper">
								<p>Qty.</p>
								<button className="Plus-btn" type="button" name="button" onClick={this.handleAdd.bind(this)}>
		                        	<i className="fa fa-plus" aria-hidden="true"></i>
		                        </button>
		                        <input readOnly type="text" className="Input_qty" value={this.state.value} onChange={(e) => {this.handleChange(e)}} />
		                        <button className="Minus-btn" type="button" name="button" onClick={this.handleDrop.bind(this)}>
		                        	<i className="fa fa-minus" aria-hidden="true"></i>
		                        </button>
		                    </div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ItemDetail;