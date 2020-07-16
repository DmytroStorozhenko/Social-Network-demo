import React from 'react';
import {profileActions} from "../../../Redux/profile_reduser";
import MyPosts, {MapDispatchPropsType, MapStatePropsType} from "./MyPosts";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "../../../Redux/redux-store";


const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    }

};

const MyPostsContainer = compose (
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType >(mapStateToProps, { addPost: profileActions.addPost})
    (MyPosts))

export default MyPostsContainer;
