import React, { Component } from 'react';
import './App.css';

class CartItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tada: false
		};

		setInterval(() => {this.setState({tada: false})}, 2000)
	}

	render() {
			return(
				<tr className="Cart_item">
					<td className="Item-thumbnail">
						<img className="Cart-post-image" alt="" src={this.props.productImg} />
					</td>

					<td className="Item-name">
	                    <a>{this.props.productName}</a>
	                </td>

					<td className="Item-quantity">
						<div onClick={(ev) => this.setState({tada: true})}>
							<button className="Plus-btn" type="button" name="button" onClick={this.props.addQty}>
								<i className="fa fa-plus" aria-hidden="true"></i>
							</button>
						</div>
						<div className={"" + (this.state.tada === true ? "animated tada" : "")}>
							<input readOnly type="text" className="Input_qty" value={this.props.productQty} />
						</div>
						<div onClick={(ev) => this.setState({tada: true})}>
							<button className="Minus-btn" type="button" name="button" onClick={this.props.dropQty}>
				                <i className="fa fa-minus" aria-hidden="true"></i>
				            </button>
			            </div>
					</td>

					<td className="Product-subtotal">
						<p>$
							<input readOnly type="text" className="Sub-price" value={parseInt(this.props.productQty, 10) * parseInt(this.props.productPrice, 10)}/>
						</p>
					</td>

					<td className="Product-remove">
						<span className="Remove" onClick={this.props.onClick}>&times;</span>
					</td>
				</tr>
			);
	}
}

export default CartItem;