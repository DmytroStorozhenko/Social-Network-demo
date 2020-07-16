import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReduser from "./profile_reduser";
import dialogsReduser from "./dialogs_reduser";
import sidebarReduser from "./sidebar_reduser";
import usersReduser from "./users_reduser";
import authReduser from "./auth_reduser";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReduser from "./app_reduser";

let rootReduser = combineReducers({
    profilePage: profileReduser,
    dialogsPage: dialogsReduser,
    sidebar: sidebarReduser,
    usersPage: usersReduser,
    auth: authReduser,
    form: formReducer,
    app: appReduser,
});

type RootReduserType = typeof rootReduser // (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReduserType>

//type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReduser, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
window.__store__ = store

export default store