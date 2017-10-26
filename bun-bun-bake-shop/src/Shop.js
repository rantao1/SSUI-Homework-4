import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem.js';
import ItemDetail from './ItemDetail.js';
import { CSSTransition, Transition } from 'react-transition-group';

import Cinnamon from './Cinnamon.json';

class Shop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detail: null,
			show: false
		}
		setInterval(() => {this.setState({show: false})}, 4000)
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	showAlert() {
		this.setState({show: true})
	}

	selectItem(id) {
		var item = Cinnamon[id]
		var detailView = <ItemDetail onClose = {(event) => this.setState({detail:null})} showAlert = {this.showAlert.bind(this)} productId = {item.productId} productImg = {item.productImg} productName = {item.productName} productPrice = {item.productPrice} productDetail1 = {item.productDetail1} productDetail2 = {item.productDetail2} ingredientImg = {item.ingredientImg} productPrice = {item.productPrice} />
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
			<div className="Wrapper" onClick={this.props.onClick}>
				<section className="Product-list">
					<div className="Intro-text">
						<div>
          					<Fade in={!!this.state.show} />
        				</div>

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

