import React from 'react';
import Toolbar from '../Toolbar/Toolbar';
import Footer from '../Footer/Footer';

const Layout = (props) => {
    return (
        <React.Fragment>
            <Toolbar />
            <div className="wrapper">
                {props.children}
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Layout;