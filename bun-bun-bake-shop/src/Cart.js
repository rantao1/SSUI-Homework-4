import React, { Component } from 'react';
import './App.css';
// import { AsyncStorage } from 'AsyncStorage';
import AsyncStorage from './AsyncStorage.js';
import CartItem from './CartItem.js';
import Recommendations from './Recommendations.js';
import { CSSTransition, Transition } from 'react-transition-group';

import Cinnamonroll from './Cinnamon.json';

class Cart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			CartProducts: [],
			Recommend: Cinnamonroll,
			Summary: 0,
			Subtotal: 0,
			Shipping: 3,
			show: false
		};
		setInterval(() => {this.setState({show: false})}, 4000)
	}

	componentWillReceiveProps(nextProps) {
		this.updateCartElements();
		this.updateSummary();
	}

	showAlert() {
		this.setState({show: true})
	}

	handleChange(e) {
		console.log('handle change called');
	}

	updateRecommend() {
		var item = this.state.Recommend
		item = item.sort( function() { return 0.5 - Math.random() } );
		var RecommendItem = [item[0], item[1], item[2], item[3]]
		this.setState({Recommend: RecommendItem})
	}

	updateSummary() {
		var currentSummary = 0;

		for (var i = 0; i < Cinnamonroll.length; i++) {
			AsyncStorage.getItem(i.toString(), (err, result) => {
			if (result === undefined) {
					
				} else {
					var j = JSON.parse(result);

					if (j.productQty === 0) {

					} else {
					currentSummary++;
					}
				}
			});
		}

		if (currentSummary === 0) {
			this.setState({Summary: 0});
		} else {
			this.setState({Summary: 1});
		}
	}

	renderCartSummary() {
		if(this.state.Summary === 0)
			return (this.renderEmpty())
		if(this.state.Summary === 1)
			return (this.renderCart())
	}

	updateCartElements() {
		var elements = []
		var currentSubtotal = 0

		for (var i = 0; i < Cinnamonroll.length; i++) {
			AsyncStorage.getItem(i.toString(), (err, result) => {
			if (result === undefined) {
					
				} else {
					var item = JSON.parse(result);

					if (item.productQty === 0) {

					} else {
						elements.push(item);
						currentSubtotal = currentSubtotal + item.productQty * item.productPrice;
					}
				}
			});
		}

		this.setState({CartProducts: elements, Subtotal: currentSubtotal})
	}

	deleteItem(id) {
		console.log("remove", id);
		var removedItem = this.state.CartProducts[id]
		removedItem.productQty = 0
		AsyncStorage.setItem(removedItem.productId, JSON.stringify(removedItem), () => {
			this.updateSummary();
			this.updateCartElements();
		})
	}

	toAddQty(id) {
		var item = this.state.CartProducts[id]
		item.productQty = item.productQty + 1
		AsyncStorage.setItem(item.productId, JSON.stringify(item), () => {
			this.updateSummary();
			this.updateCartElements();
		});
	}

	toDropQty(id) {
		var item = this.state.CartProducts[id]
		item.productQty = item.productQty - 1
		AsyncStorage.setItem(item.productId, JSON.stringify(item), () => {
			this.updateSummary();
			this.updateCartElements();
		});
	}

	addItem(id) {
		var item = this.state.Recommend[id]

		var addedItem = {
						productId: item.productId,
						productImg: item.productImg,
						productName: item.productName,
						productPrice: item.productPrice,
						productQty: 1
					}

		AsyncStorage.getItem(item.productId, (err, result) => {	
				if (result === undefined) {

					AsyncStorage.setItem(item.productId, JSON.stringify(addedItem), () => {
						this.updateSummary();
						this.updateCartElements();
					});

				} else {
					var i = JSON.parse(result);

					addedItem = {
						productId: item.productId,
						productImg: item.productImg,
						productName: item.productName,
						productPrice: item.productPrice,
						productQty: i.productQty + 1
					}

					AsyncStorage.setItem(item.productId, JSON.stringify(addedItem), () => {
						this.updateSummary();
						this.updateCartElements();
					});
				}
		});

		this.showAlert();

	}

	renderCartElements() {
		var cartElements = []
		for (var i = 0; i < this.state.CartProducts.length; i++) {
			var cartItem = this.state.CartProducts[i]
			cartElements.push(<CartItem onClick = {this.deleteItem.bind(this, i)} productId = {cartItem.productId} productImg = {cartItem.productImg} productName = {cartItem.productName} productPrice = {cartItem.productPrice} productQty = {cartItem.productQty} key = {cartItem.productId} addQty = {this.toAddQty.bind(this, i)} dropQty = {this.toDropQty.bind(this, i)} />)
		}

		return (
			<tbody>
				{cartElements}
			</tbody>
		)
	}

	renderRecommendations() {
		var recommendElements = []

		for(var i=0; i < this.state.Recommend.length; i++) {
			var recommendItem = this.state.Recommend[i]
			recommendElements.push(<Recommendations productId = {recommendItem.productId} productImg = {recommendItem.productImg} productName = {recommendItem.productName} productPrice = {recommendItem.productPrice} productDetail1 = {recommendItem.productDetail1} key = {recommendItem.productId} onClick = {this.addItem.bind(this, i)}/>)
		}

		return(
			<div className="Add-section">
				<div className="Related-product">
					<div className="Related-title">
						<h4>People Also Like</h4>
					</div>

					<div className="Recommendations">
						{recommendElements}
					</div>
				</div>
			</div>
		);
	}

	renderCart() {
		return (
			<div>
				<div className="CartContent">
					<div className="Cart-header">
						<a className="Cart-detail">Cart Detail</a>
					</div>

					<form className="Detail_table">
						<table className="Shop_table" cellSpacing="0">
								{this.renderCartElements()}
						</table>
					</form>

					<div className="Cart-collaterals">
						<div className="Cart-total">
							<div className="Title-wrapper">
								<a className="Cart-detail">Order Summary</a>
							</div>

							<table className="Shop_table">
								<tbody>
									<tr className="Price-subtotal">
										<th>Subtotal</th>
										<td className="Subtotal">
											<p>$ <span className="Price-amount">{this.state.Subtotal}</span></p>
										</td>
									</tr>

									<tr className="Cart_review_totals_shipping">
										<th>Shipping</th>
										<td>
											<span className="Shipping-amount">
												<p>$ 
													<span className="Price-amount">{this.state.Shipping}
													</span>
												</p>
											</span>
										</td>
									</tr>

									<tr className="Order-total">
										<th>Total</th>
										<td>
											<strong><p>$ <span className="Price-amount">{this.state.Subtotal + this.state.Shipping}</span></p></strong>
										</td>
									</tr>
								</tbody>
							</table>

							<div className="Proceed-checkout">
								<a className="Checkout-button">continue to checkout</a>
							</div>
						</div>
					</div>
				</div>

				{this.renderRecommendations()}
			</div>
		)
	}

	renderEmpty() {
		return(
			<div className="Emptycart">
				<h2>Your shopping cart is empty</h2>
				<h4>Head over to the shop and explore our delicious award-winning cinnamon rolls.</h4>

				{this.renderRecommendations()}
			</div>
		);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		this.updateSummary();
		this.updateCartElements();
		this.updateRecommend();
	}

	render() {
		const defaultStyle = {
			transition: 'opacity 3000ms ease-in-out',
			opacity: 0
		}
		const transitionStyles = {
			entering: { opacity: 0 },
			entered: { opacity: 1 },
			exiting: { opacity: 1 },
			exited: { opacity: 0 }
		};

		const Fade = ({ in: inProp }) => (
  			<Transition in={inProp} timeout={3000}>
			    {(state) => (
			      <div style={{
			        ...defaultStyle,
			        ...transitionStyles[state]
			      }} className="Alert">
			        <p>Item added to cart successfully!</p>
			      </div>
			    )}
		  	</Transition>
		);

		return (
			<div onClick={this.props.onClick}>
				
				<div className="Cart">
					<Fade in={!!this.state.show} />
					{this.renderCartSummary()}
				</div>

			</div>
		);
	}
}

export default Cart;






































