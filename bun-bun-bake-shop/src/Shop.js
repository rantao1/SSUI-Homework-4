import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem.js';
import ItemDetail from './ItemDetail.js';

import Cinnamon from './Cinnamon.json';

class Shop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detail: null,
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}


	selectItem(id) {
		console.log("selected", id);
		var item = Cinnamon[id]
		var detailView = <ItemDetail onClose = {(event) => this.setState({detail:null})} productId = {item.productId} productImg = {item.productImg} productName = {item.productName} productPrice = {item.productPrice} productDetail1 = {item.productDetail1} productDetail2 = {item.productDetail2} ingredientImg = {item.ingredientImg} productPrice = {item.productPrice} />
		this.setState({detail: detailView})
	}

	renderDetailView() {
		if(this.state.detail !== null) {
			return this.state.detail
		}
	}

	renderInventory() {
		var elements = []
		for(var i=0; i < Cinnamon.length; i++) {
			var item = Cinnamon[i]

			elements.push(<ListItem onClick = {this.selectItem.bind(this, i)} productId = {item.productId} productImg = {item.productImg} productName = {item.productName} productPrice = {item.productPrice} key = {item.productId} />)
		}

		return (
			<div className="Wrapper" onClick={this.props.onClick}>
				<section className="Product-list">
					<div className="Intro-text">
						<h3 className="Ship-text">We are in Pittsburgh PA but...<br /> we ship our award-winning fresh rolls to anywhere in the USA!</h3>
					</div>
					
					<div className="List-item">
						{elements}
						{this.renderDetailView()}
					</div>

				</section>
			</div>
		)

	}

	render() {
		return (
			this.renderInventory()
		);
	}
}

export default Shop;

