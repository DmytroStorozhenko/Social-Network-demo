import React, {FC} from 'react'
import {InjectedFormProps, reduxForm} from "redux-form"
import {createField, GetStringKeys, Input} from "../Common/FormControls/FormControls"
import {required} from "../../Utils/Validators"
import {connect} from "react-redux"
import {loginThunk} from "../../Redux/auth_reduser"
import {Redirect} from "react-router-dom"
import classes from "./Login.module.css"
import {AppStateType} from "../../Redux/redux-store"
import {Button} from "antd";

type LoginOwnPropsType = {
    captchaUrl: string | null
}
const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginOwnPropsType> & LoginOwnPropsType> =
    ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesKeysType>('Email', 'email', Input, [required])}
            {createField<LoginFormValuesKeysType>('Password', 'password', Input, [required],{type: 'password'})}
            {createField<LoginFormValuesKeysType>(undefined, 'rememberMe', Input, [],{type: 'checkbox'}, 'Remember me')}

            { captchaUrl && <img src={captchaUrl} alt={'Captcha'}/> }

            {captchaUrl && createField<LoginFormValuesKeysType>('Symbols from image...', 'captcha', Input, [required],{})}


            { error &&
            <div className={classes.formSummaryError}>
                {error}
            </div>
            }
            <div>
                {/*<Button>Login</Button>*/}
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginOwnPropsType>({form: 'login'})(LoginForm)

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesKeysType = GetStringKeys<LoginFormValuesType>

const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.loginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h2>Login</h2>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {loginThunk})(Login)
