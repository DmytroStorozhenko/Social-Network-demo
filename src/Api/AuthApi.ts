import {instance, APIResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum} from "./Api"

type AuthMeResponseDataType = {
        id: number
        email: string
        login: string
}
type LoginResponseDataType = {
        userId: number
}

export const authAPI = {
    authMe() {
        return instance.get<APIResponseType<AuthMeResponseDataType>>(`auth/me`).then(response => response.data)
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(response => response.data)
    },

    logout() {
        return instance.delete(`auth/login`)
    }
}