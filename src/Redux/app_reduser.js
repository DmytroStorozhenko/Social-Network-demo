import {getAuthUserDataThunk} from "./auth_reduser";

const INITIALIZED_SUCCESS = 'APP/INITIALIZED_SUCCESS';

let initialState = {
   initialized: false,
};

const appReduser = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
            default:
            return state;
    }
};

export const initializedSuccessAC = () => ({type: INITIALIZED_SUCCESS});

export const initializeAppThunk = () => async (dispatch) => {
    let promiseAuth = dispatch(getAuthUserDataThunk());
    await Promise.all([promiseAuth]);
            dispatch(initializedSuccessAC())
    }

export default appReduser;