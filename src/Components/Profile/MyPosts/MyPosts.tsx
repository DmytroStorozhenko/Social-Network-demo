import React, {FC} from 'react'
import classes from './MyPosts.module.css'
import Post from './Post/Post'
import AddPostForm, {AddPostFormValuesType} from "./addPostForm"
import {PostsType} from "../../../Types/types"

export type MapStatePropsType = {
    posts: Array<PostsType>
}

export type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts:FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    let postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} id={p.id}/>)

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onAddPost}/>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts