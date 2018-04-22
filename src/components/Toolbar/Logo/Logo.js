import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className="app-logo">
            <h1><Link to="/">Beit</Link></h1>
            <p>IT Devs board</p>
        </div>
    )
}

export default Logo;