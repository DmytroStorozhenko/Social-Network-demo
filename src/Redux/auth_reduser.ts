import {ResultCodeForCaptchaEnum, ResultCodesEnum} from "../Api/Api"
import {FormAction, stopSubmit} from "redux-form"
import { BaseThunkType, InferActionsTypes} from "./redux-store"
import {authAPI} from "../Api/AuthApi";
import {securityAPI} from "../Api/SecurityApi";


let initialState = {
    userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};
export type AuthInitialStateType = typeof initialState;


const authReduser = (state = initialState, action: ActionsType): AuthInitialStateType => {
    switch (action.type) {
        case 'AUTH/SET_USER_DATA':
        case 'AUTH/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.data,
            }
        default:
            return state;
    }
}


export const authActions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => (
        {type: 'AUTH/SET_USER_DATA', data: {userId, email, login, isAuth}} as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'AUTH/GET_CAPTCHA_URL_SUCCESS', data: {captchaUrl}} as const)
}

type ActionsType = InferActionsTypes<typeof authActions>


export const getAuthUserDataThunk = (): ThunkType => async (dispatch) => {
    let authMeData = await authAPI.authMe();
    if (authMeData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = authMeData.data;
        dispatch(authActions.setAuthUserData(id, email, login, true));
    }
}

export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch: any) => {
    let loginResponse = await authAPI.login(email, password, rememberMe, captcha);
    if (loginResponse.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserDataThunk())
    } else {
        if (loginResponse.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrlThunk())
        }
        let message = loginResponse.messages.length > 0 ? loginResponse.messages[0] : 'Shit happens';
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logoutThunk = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(authActions.setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrlThunk = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(authActions.getCaptchaUrlSuccess(captchaUrl));
}

type ThunkType = BaseThunkType<ActionsType | FormAction>


export default authReduser;