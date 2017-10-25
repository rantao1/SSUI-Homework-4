import React, { Component } from 'react';
import './App.css';
import FeaturedItem from './FeaturedItem.js';
import ItemDetail from './ItemDetail.js';

import Cinnamon from './Cinnamon.json';

class Home extends Component {
	constructor(props) {
		super(props);
		var products = Cinnamon

		this.state = {
			featured: products,
			detail: null,
		}
	}

	selectItem(id) {
		console.log("selected", id);
		var item = this.state.featured[id]
		var detailView = <ItemDetail onClose = {(ev) => this.setState({detail:null})} productId = {item.productId} productImg = {item.productImg} productName = {item.productName} productPrice = {item.productPrice} productDetail1 = {item.productDetail1} productDetail2 = {item.productDetail2} ingredientImg = {item.ingredientImg}/>
		this.setState({detail: detailView})
	}

	renderDetailView() {
		if(this.state.detail !== null) {
			return this.state.detail
		}
	}

	updateFeatured() {
		var item = this.state.featured
		item = item.sort( function() { return 0.5 - Math.random() } );
		var featuredItem = [item[0], item[1], item[2], item[3]]
		this.setState({featured: featuredItem})
	}

	componentDidMount() {
		window.scrollTo(0, 0)
        this.updateFeatured();
    }

	renderFeatured() {
		var elements = []
		for(var i=0; i < this.state.featured.length; i++) {
			var item = this.state.featured[i]
			elements.push(<FeaturedItem onClick = {this.selectItem.bind(this, i)} productId = {item.productId} productImg = {item.productImg} productName = {item.productName} productPrice = {item.productPrice} productDetail1 = {item.productDetail1} key = {item.productId} />)
		}

		return (
			<div className="Wrapper" onClick={this.props.onClick}>
				<section className="Feature-intro">
					<div className="Image-container">
						<img className="Bg-img" src="https://image.ibb.co/maQvY6/0_home_top_img.jpg" alt="" />
						<div className="On-image">
							<h1 className="Welcome-font">welcome to</h1>
							<h2>bun bun bake shop</h2>
						</div>
						<img className="Scroll-down" src="https://image.ibb.co/ikppt6/0_scroll.png" alt="" />
					</div>
				</section>

				<section className="Feature-product">
					<div className="Container">
						<div className="Intro-text">
							<h3>We make award-winning cinnamon rolls in Pittsburgh!</h3>
							<h4>We’re not your typical cinnamon roll shop. We offer more than just your average ‘Old Fashioned’ roll. We have a variety of different flavors that are waiting to be explored, all made with the highest quality ingredients to tickle your taste buds.<br />All of our award-winning cinnamon rolls can be ordered online and delivered to your place.</h4>
						</div>
						<div className="Product-container">
							{elements}
							{this.renderDetailView()}
						</div>
					</div>
				</section>
			</div>
		)

	}

	render() {
		return (
			this.renderFeatured()
		);
	}
}

export default Home;