import React from 'react';
import Logo from './Logo/Logo';
import UserPanel from './UserPanel/UserPanel';
// import Navigation from './Navigation/Navigation';

const Toolbar = () => {
    return(
        <div className="header-bg">
            <header className="app-header">
                <Logo />
                <nav>
                    {/* <Navigation /> */}
                    <UserPanel />
                </nav>
            </header>
        </div>
    )
}

export default Toolbar;