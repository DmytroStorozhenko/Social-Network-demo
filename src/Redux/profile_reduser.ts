import {FormAction, stopSubmit} from "redux-form"
import {PhotosType, PostsType, ProfileType} from "../Types/types"
import {profileAPI} from "../Api/ProfileApi"
import {BaseThunkType, InferActionsTypes} from "./redux-store"


let initialState = {
    posts: [] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: ''
};

export type ProfileInitialStateType = typeof initialState


const profileReduser = (state = initialState, action: ActionsType): ProfileInitialStateType => {
    switch (action.type) {
        case 'PROFILE/ADD-POST':
            let newPost = {
                id: state.posts.length + 1,
                message: action.newPostBody,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        case 'PROFILE/SET_USER_PROFILE':
            return {
                ...state, profile: action.profile
            }
        case 'PROFILE/SET_STATUS':
            return {
                ...state, status: action.status
            }
        case 'PROFILE/DELETE_POST':
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
            }

        case 'PROFILE/SAVE_PHOTO_SUCCESS':
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state
    }
};

export const profileActions = {
    addPost: (newPostBody: string) => ({type: 'PROFILE/ADD-POST', newPostBody} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'PROFILE/SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'PROFILE/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'PROFILE/SAVE_PHOTO_SUCCESS', photos} as const),
}

type ActionsType = InferActionsTypes<typeof profileActions>


export const getUserProfileThunk = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(profileActions.setUserProfile(data))
}

export const getStatusThunk = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(profileActions.setStatus(data))
}

export const updateStatusThunk = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(profileActions.setStatus(status))
    }
}

export const savePhotoThunk = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(profileActions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfileThunk = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)

    if (data.resultCode === 0) {
        if (userId != null) dispatch(getUserProfileThunk(userId))
        else throw new Error("userId can't be null")
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

type ThunkType = BaseThunkType<ActionsType | FormAction>


export default profileReduser