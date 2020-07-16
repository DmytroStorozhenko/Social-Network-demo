import {InjectedFormProps, reduxForm} from "redux-form"
import {createField, GetStringKeys, Textarea} from "../../Common/FormControls/FormControls"
import React, {FC} from "react"
import {required} from "../../../Utils/Validators"

type PropsType = {  }
export type AddPostFormValuesType = {
    newPostText: string
}
type AddPostFormValuesKeysType = GetStringKeys<AddPostFormValuesType>

const AddPostForm: FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                 {createField<AddPostFormValuesKeysType>('Your post...', 'newPostText', Textarea, [required])}
             </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm<AddPostFormValuesType, PropsType>({form: 'profileAddPost'})(AddPostForm)