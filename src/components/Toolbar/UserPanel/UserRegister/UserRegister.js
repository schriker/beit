import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../../store/actions/index';

import { CSSTransition } from 'react-transition-group';
import Spinner from '../../../UI/Spinner/Spinner';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import { onChange, setTouched } from '../../../../utility/onInputChange';

class UserRegistration extends Component {

    state = {
        loginForm: {
            email: {
                label: "E-Mail",
                type: "email",
                placeholder: "Your e-mail",
                value: "",
                valid: false,
                touched: false,
            },
            password: {
                label: "Password - min. 6 characters",
                type: "password",
                placeholder: "*******",
                value: "",
                valid: false,
                touched: false,
            },
            terms: {
                type: "checkbox",
                value: false,
                valid: false,
                touched: false
            }
        },
        isFormValid: false,
        errMsg: null
    }

    onInputChange = (event, elementId) => {

        const formData = onChange(this.state, event, elementId);

        let formValid = true;

        for ( let key in formData ) {
            formValid = formData[key].valid && formValid;
        }

        if (formValid) {
            let errMsg = null;
            this.setState({errMsg});
        }

        this.setState({loginForm: formData, isFormValid: formValid});
    }

    onSubmit = (event) => {

        event.preventDefault();

        let errMsg = null;

        if (this.state.isFormValid) {
            const email = this.state.loginForm.email.value;
            const password = this.state.loginForm.password.value;

            this.props.register(email, password);

            this.setState({errMsg});
        }

        else {

            let formData = setTouched(this.state);
        
            let errMsg = "Fill form correctly!";
            this.setState({errMsg: errMsg, loginForm: formData});
            
        }

    }

    render() {
        let loginFormElementArr =[];
        for (let key in this.state.loginForm)
        {
            loginFormElementArr.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }
        const loginForm = loginFormElementArr.map(element => {
            return(
                <Input 
                    key = {element.id}
                    name = {element.id}
                    valid = {element.config.valid}
                    touched = {element.config.touched}
                    label = {element.config.label}
                    type = {element.config.type}
                    placeholder = {element.config.placeholder}
                    value = {element.config.value}
                    changed= {(event) => this.onInputChange(event, element.id)}/>
            )
        })

        let registerErr = null;

        if (this.props.userErr) {
            switch(this.props.userErr.code) {

                case "auth/email-already-in-use":
                    registerErr = "E-mail already exist!";
                break;

                case "auth/weak-password":
                    registerErr = "Password to weak!"
                break;

                case "auth/operation-not-allowed":
                    registerErr = "Operation not allowed!"
                break;

                case "auth/invalid-email":
                    registerErr = "Invaild e-mail!"
                break;

                default: registerErr = null;
            }
        }

        let registerContent = <Spinner />

        if (this.props.loading) {
            registerContent = <Spinner />
        }

        else if (!this.props.isLogged) {
            registerContent = 
                <form className="modal__form" onSubmit={this.onSubmit}>
                    {loginForm}
                    <div className="modal__err">
                        {registerErr}
                        {this.state.errMsg}
                    </div>
                    <div className="modal__buttons">
                        <Button type="submit" css="green-btn">Register<i className="fas fa-key"></i></Button>
                        <Button clicked={this.props.hideRegisterForm} css="purple-btn">Back to login<i className="fas fa-sign-in-alt"></i></Button>
                    </div>
                </form>
        }

        return(
        <CSSTransition in={this.props.show} timeout={200} classNames="fade" mountOnEnter unmountOnExit onExited={this.props.showLoginForm}>
            {registerContent}
        </CSSTransition>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.auth.user,
        loading: state.auth.loading,
        userErr: state.auth.userErr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (email, password) => dispatch(action.authRegister(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);