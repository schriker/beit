import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as action from '../../../../store/actions/index';

import { CSSTransition } from 'react-transition-group';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import Spinner from '../../../UI/Spinner/Spinner';
import { Link } from 'react-router-dom';
import { setTouched, onChange } from '../../../../utility/onInputChange';

class UserLogin extends Component {

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
                label: "Password",
                type: "password",
                placeholder: "*******",
                value: "",
                valid: false,
                touched: false,
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

            this.props.login(email, password);

            this.setState({errMsg});
        }

        else {

            let formData = setTouched(this.state);

            let errMsg = "Incorrect email or password!";
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

        let loginErr = null;

        if (this.props.userErr) {
            switch(this.props.userErr.code) {

                case "auth/user-not-found":
                    loginErr = "Wrong e-mail!";
                break;

                case "auth/wrong-password":
                    loginErr = "Wrong password!"
                break;

                case "auth/user-disabled":
                    loginErr = "User disabled!"
                break;

                case "auth/invalid-email":
                    loginErr = "Invaild e-mail!"
                break;

                default: loginErr = null;
            }
        }

        let loginContent = <Spinner />;

        if (this.props.loading) {
            loginContent = <Spinner />
        }

        else if(!this.props.isLogged) {
            loginContent = 
                <form className="modal__form" onSubmit={this.onSubmit}>
                    {loginForm}
                    <div className="modal__reset">
                        <Link to="/">Forgot password?</Link>
                    </div>
                    <div className="modal__err">
                        {loginErr}
                        {this.state.errMsg}
                    </div>
                    <div className="modal__buttons">
                        <Button type="submit" css="green-btn">Login<i className="fas fa-sign-in-alt"></i></Button>
                        <Button clicked={this.props.hideLoginForm} css="purple-btn">Create new account<i className="fas fa-users"></i></Button>
                    </div>
                </form>
        }

        return(
        <CSSTransition in={this.props.show} timeout={200} classNames="fade" mountOnEnter unmountOnExit onExited={this.props.showRegisterForm}>
            {loginContent}
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
        login: (email, password) => dispatch(action.authLogin(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);