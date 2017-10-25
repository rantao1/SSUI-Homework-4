import React, { Component } from 'react';
import './App.css';
import logoWhite from './img/logo-w.png';

class Footer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<footer className="Footer">
                    <div className="Container">
                        <div className="Footer-logo">
                            <img src={logoWhite} alt="footer logo" className="Footer-logo" />
                        </div>

                        <div className="Footer-menu">
                            <ul className="Nav-footer">
                                <li className="Menu-item"><p className="Footer-link">home</p>
                                </li>

                                <li className="Menu-item"><p className="Footer-link">shop</p>
                                </li>

                                <li className="Menu-item"><p className="Footer-link">cart</p>
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
                                    <a href="#">
                                        <i className="fa fa-instagram" aria-hidden="true"></i>
                                    </a>
                                </li>

                                <li className="Twitter">
                                    <a href="#">
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </a>
                                </li>

                                <li className="Facebook">
                                    <a href="#">
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
		);
	}
}

export default Footer;


