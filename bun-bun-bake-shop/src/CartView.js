import React, {  Component } from 'react';
import './App.css';

class CartView extends Component {

	render() {
		return(
			<tbody>
				<tr className="Cart_item">
					<td className="Item-thumbnail">
						<img className="Cart-post-image" alt="" src={this.props.productImg} />
					</td>

					<td className="Item-name">
	                    <a>{this.props.productName}</a>
	                </td>

					<td className="Item-quantity">
						<button className="Plus-btn" type="button" name="button" onClick={this.props.addQty}>
							<i className="fa fa-plus" aria-hidden="true"></i>
						</button>
						<input readOnly type="text" className="Input_qty" value={this.props.productQty} />
						<button className="Minus-btn" type="button" name="button" onClick={this.props.dropQty}>
			                <i className="fa fa-minus" aria-hidden="true"></i>
			            </button>
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
			</tbody>
		);
	}
}

export default CartView;