import React from 'react';
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormControls/FormControls";
import {required} from "../../Utils/Validators";
import {connect} from "react-redux";
import {loginThunk} from "../../Redux/auth_reduser";
import {Redirect} from "react-router-dom";
import {compose} from "redux";
import classes from "./Login.module.css"

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', Input, [required])}
            {createField('Password', 'password', Input, [required],{type: 'password'})}
            {createField(null, 'checkbox', Input, [],{type: 'checkbox'}, 'Remember me')}

            { error &&
            <div className={classes.formSummaryError}>
                <span>{error}</span>
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.loginThunk(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) return <Redirect to={'/profile'}/>

    return <div>
        <h2>Login</h2>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default compose (
    connect (
        mapStateToProps, {loginThunk})
)(Login)