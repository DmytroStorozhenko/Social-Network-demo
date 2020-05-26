import React from 'react';
import {addPostAC} from "../../../Redux/profile_reduser";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {compose} from "redux";

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostBody) => {
            dispatch(addPostAC(newPostBody));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }

};

const MyPostsContainer = compose (
    connect(mapStateToProps, mapDispatchToProps)
    (MyPosts))

export default MyPostsContainer;
