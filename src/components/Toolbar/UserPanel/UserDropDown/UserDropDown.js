import React from 'react';
import { CSSTransition } from 'react-transition-group';
import * as action from '../../../../store/actions/index'; 
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const UserDropDown = (props) => {
    return(
        <CSSTransition in={props.show} timeout={200} classNames="fade" mountOnEnter unmountOnExit >
        <div className="user__dropdown">
            <div className="arrow arrow--position-dropdown"></div>
            <ul>
                <li><Link to="/add-offer"><i className="fas fa-plus"></i>Post new CV</Link></li>
                <li><Link to="/my-offers"><i className="fas fa-edit"></i>Your CV</Link></li>
                <li><a onClick={props.signOut}><i className="fas fa-power-off"></i>Logout</a></li>
            </ul>
        </div>
        </CSSTransition>
    )
}

const mapDispatchToProps = (dispatch) =>
{
    return{
        signOut: () => dispatch(action.authLogout())
    }
}

export default connect(null, mapDispatchToProps)(UserDropDown);