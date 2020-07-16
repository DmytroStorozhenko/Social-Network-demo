import {getAuthUserDataThunk} from "./auth_reduser";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";


let initialState = {
   initialized: false
};

export type AppInitialStateType = typeof initialState


const appReduser = (state = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
            default:
            return state
    }
};


export const appActions = {
    initializedSuccess: () => ({type: 'APP/INITIALIZED_SUCCESS'} as const)
}

type ActionsType = InferActionsTypes<typeof appActions>



export const initializeAppThunk = (): ThunkType => async (dispatch) => {
    let promiseAuth = dispatch(getAuthUserDataThunk())
    await Promise.all([promiseAuth])
            dispatch(appActions.initializedSuccess())
    }

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>


export default appReduser