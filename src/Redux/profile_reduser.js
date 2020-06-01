import {profileAPI} from "../Api/Api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'PROFILE/ADD-POST';
const SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE';
const SET_STATUS = 'PROFILE/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'PROFILE/SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [],
    profile: null,
    status: '',
};

const profileReduser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.posts.length + 1,
                message: action.newPostBody,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state, status: action.status
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state, profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }
};

export const addPostAC = (newPostBody) => ({type: ADD_POST, newPostBody});
export const setUserProfileAC = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatusAC = (status) => ({type: SET_STATUS, status});
export const savePhotoSuccessAC = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});

export const getUserProfileThunk = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfileAC(response.data));
}


export const getStatusThunk = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatusAC(response.data));
}

export const updateStatusThunk = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatusAC(status));
    }
}

export const savePhotoThunk = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccessAC(response.data.data.photos));
    }
}

export const saveProfileThunk = (file) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(file);

    if (response.data.resultCode === 0) {
    dispatch(getUserProfileThunk(userId));
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}) );
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReduser;