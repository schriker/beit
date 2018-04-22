import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';

import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';
import UserLogin from './UserLogin/UserLogin';
import UserRegistraion from './UserRegister/UserRegister';
import UserDropDown from './UserDropDown/UserDropDown';

class UserPanel extends Component {

    state = {
        login: true,
        register: false,
        userDropDown: false
    }

    togleDropDown = () => {
        this.setState({userDropDown: !this.state.userDropDown}) 
    }

    hideDropDown = () => {
        this.setState({userDropDown: false})
    }

    showLoginForm = () => {
        this.setState({login: true})
    }

    hideLoginForm = () => {
        this.setState({login: false})
    }

    showRegisterForm = () => {
        this.setState({register: true})
    }

    hideRegisterForm = () => {
        this.setState({register: false})
    }

    render() {

        let modalTitle = this.state.login ? "User login" : "New account";

        let loginButton;

        if (!this.props.isLogged) {
            loginButton = (
                <Button clicked={() => this.props.openModal()} css="green-btn">Login<i className="fas fa-user"></i></Button>
            )
        }

        if (this.props.isLogged) {
            loginButton = (
                <React.Fragment>
                    <div onBlur={() => this.hideDropDown()}>
                        <Button clicked={() => this.togleDropDown()} css="green-btn user__btn">User<i className="fas fa-user"></i></Button>
                        <UserDropDown show={this.state.userDropDown} />
                    </div>
                </React.Fragment>
            )
        }

        return(
            <React.Fragment>
                <Modal 
                    close={() => this.props.closeModal()} 
                    show={this.props.modal} 
                    title={modalTitle}>
                    <UserLogin  
                        show={this.state.login} 
                        hideLoginForm={() => this.hideLoginForm()} 
                        showRegisterForm={() => this.showRegisterForm()} />
                        
                    <UserRegistraion 
                        show={this.state.register} 
                        hideRegisterForm={() => this.hideRegisterForm()} 
                        showLoginForm={() => this.showLoginForm()}/>
                </Modal>
                {loginButton}
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: () => dispatch(action.openModal()),
        closeModal: () => dispatch(action.closeModal())
    }
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.auth.user,
        modal: state.auth.modal
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);