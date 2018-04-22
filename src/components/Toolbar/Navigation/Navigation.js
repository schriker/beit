import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <ul>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/about-us">About Us</NavLink></li>
            <li><NavLink to="/help">Help</NavLink></li>
        </ul>
    )
}

export default Navigation;