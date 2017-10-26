import React, { Component } from 'react';
import './App.css';
import Shop from './Shop.js';
import Cart from './Cart.js';
import Home from './Home.js';
import CartQty from './CartQty.js';
import CartView from './CartView.js';
// import { AsyncStorage } from 'AsyncStorage';
import AsyncStorage from './AsyncStorage.js';

import Cinnamons from './Cinnamon.json';

class App extends Component {
    constructor(props) {
        super(props);
        var products = Cinnamons

        this.state = {
            inventory: products,
            page: 0,
            counter: 0,
            CartProducts: [],
            Subtotal: 0,
            isMouseInside: false,
            animate: false
        };

        setInterval(() => {this.setState({animate: false})}, 2000)
    }
    
    navToHomePage() {
        this.setState({page:0})
    }

    refreshCounter() {
        var currentQty = 0
        var elements = []
        var currentSubtotal = 0

        for (let i = 0; i < this.state.inventory.length; i++) {
            AsyncStorage.getItem(i.toString(), (err, result) => {
                if (result === undefined) {
                        
                } else {
                    var item = JSON.parse(result);
                    currentQty = currentQty + item.productQty;

                    if (item.productQty === 0) {

                    } else {
                        elements.push(item);
                        currentSubtotal = currentSubtotal + item.productQty * item.productPrice;
                    }
                }
            });
        }

        this.setState({counter: currentQty, CartProducts: elements, Subtotal: currentSubtotal})
    }

    renderPageView() {
        if(this.state.page === 0)
            return <Home onClick={this.refreshCounter.bind(this)} />
        if(this.state.page === 1)
            return <Shop onClick={this.refreshCounter.bind(this)} />
        if(this.state.page === 2)
            return <Cart onClick={this.refreshCounter.bind(this)} currentQty = {this.state.counter} />
    }

    renderCartPreview() {
        if(this.state.counter === 0)
            return (this.renderEmpty())
        if(this.state.counter !== 0)
            return (this.renderCartItems())
    }

    renderEmpty() {
        return(
            <ul className="Previewwrapper" onMouseLeave={(ev) => this.setState({isMouseInside: false})}>
                <li className="Previewempty">Your cart is empty</li>
            </ul>
        );
    }

    renderCartItems() {
        var cartItems = []
        for (var i = 0; i < this.state.CartProducts.length; i++) {
            var cartItem = this.state.CartProducts[i]
            cartItems.push(<CartView onClick = {this.deleteItem.bind(this, i)} productId = {cartItem.productId} productImg = {cartItem.productImg} productName = {cartItem.productName} productPrice = {cartItem.productPrice} productQty = {cartItem.productQty} key = {cartItem.productId} addQty = {this.toAddQty.bind(this, i)} dropQty = {this.toDropQty.bind(this, i)} />)
        }

        return (
            <ul className="Previewwrapper" onMouseEnter={(ev) => this.setState({isMouseInside: true})} onMouseLeave={(ev) => this.setState({isMouseInside: false})}>
                <li>
                    <table className="Previewtable">
                        {cartItems}
                    </table>
                </li>
                <li className="Total">Cart total: $ {this.state.Subtotal}</li>
            </ul>
        )
    }

    deleteItem(id) {
        console.log("remove", id);
        var removedItem = this.state.CartProducts[id]
        removedItem.productQty = 0
        AsyncStorage.setItem(removedItem.productId, JSON.stringify(removedItem), () => {
            this.refreshCounter();
            this.setState({animate:true})
        })
    }

    toAddQty(id) {
        var item = this.state.CartProducts[id]
        item.productQty = item.productQty + 1
        AsyncStorage.setItem(item.productId, JSON.stringify(item), () => {
            this.refreshCounter();
        });
    }

    toDropQty(id) {
        var item = this.state.CartProducts[id]
        item.productQty = item.productQty - 1
        AsyncStorage.setItem(item.productId, JSON.stringify(item), () => {
            this.refreshCounter();
        });
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.refreshCounter();
    }

    render() {
        return (
            <div className="App">
                <header className={"Header" + (this.state.show === true? " Addbackground" : "")}>
                    <div className="Row">
                        <div className="Navbar">
                            <div className={"Menu-logo" + (this.state.page === 0 ? " Active" : "")} onClick={this.navToHomePage.bind(this)}><img alt="shop logo" className="Logo" src="https://image.ibb.co/goJ4RR/0_logo.png" />
                            </div>
                            
                            <div className={"Menu-item" + " Cartcounter" + (this.state.page === 2 ? " Active" : "")} onClick={(ev) => this.setState({page:2})}><p className="Text-link" onMouseEnter={(ev) => this.setState({isMouseInside: true})} onMouseLeave={(ev) => this.setState({isMouseInside: false})}>Cart<div className={"" + (this.state.animate === true ? "animated tada" : "")}><CartQty Qty={this.state.counter} /></div></p>
                            </div>

                            <div className={"Menu-item" + (this.state.page === 1 ? " Active" : "")} onClick={(ev) => this.setState({page:1})}><p className="Text-link">Shop</p>
                            </div>

                            <div className={"Menu-item" + (this.state.page === 0 ? " Active" : "")} onClick={this.navToHomePage.bind(this)}><p className="Text-link">Home</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className={"Cartpreview" + (this.state.isMouseInside === true ? " Show" : "")}>
                    {this.renderCartPreview()}
                </div>

                {this.renderPageView()}

                <footer className="Footer">
                    <div className="Container">
                        <div className="Footer-logo">
                            <img src="https://image.ibb.co/mCbDLm/0_logo_w.png" alt="footer logo" className="Footer-logo" />
                        </div>

                        <div className="Footer-menu">
                            <ul className="Nav-footer">
                                <li className={"Menu-item" + (this.state.page === 0 ? " Active" : "")} onClick={this.navToHomePage.bind(this)}><p className="Footer-link">home</p>
                                </li>

                                <li className={"Menu-item" + (this.state.page === 1 ? " Active" : "")} onClick={(ev) => this.setState({page:1})}><p className="Footer-link">shop</p>
                                </li>

                                <li className={"Menu-item" + (this.state.page === 2 ? " Active" : "")} onClick={(ev) => this.setState({page:2})}><p className="Footer-link">cart</p>
                                </li>
                            </ul>
                        </div>

                        <div className="Subscribe-part">
                            <p className="Subscribe-text">never miss new rolls<br />subscribe now!</p>
                            <input className="User-email" type="text" placeholder="Enter your email" />
                            <div className="Subscribe-btn">></div>
                            <div className="Copyright"> © 2017 Bun Bun Bake Shop.  All Rights Reserved.</div>
                        </div>
                        
                        <div className="Social-media">
                            <ul className="Media-list">
                                <li className="Instagram">
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/bunbunsbakeshop/">
                                        <i className="fa fa-instagram" aria-hidden="true"></i>
                                    </a>
                                </li>

                                <li className="Twitter">
                                    <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/hashtag/cinnamonroll?src=hash">
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </a>
                                </li>

                                <li className="Facebook">
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/buzzfeedtasty/">
                                        <i className="fa fa-facebook" aria-hidden="true"></i>
                                    </a>
                                </li>
                            </ul>
                            <div className="Creator-text">
                                <p>Created by Ran Tao, CMU</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default App;
