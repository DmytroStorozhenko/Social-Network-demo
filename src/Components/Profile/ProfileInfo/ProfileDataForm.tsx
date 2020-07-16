import React, {FC} from "react";
import {createField, GetStringKeys, Input, Textarea} from "../../Common/FormControls/FormControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import loginClasses from "../../Login/Login.module.css";
import classes from "./ProfileDataForm.module.css";
import {ProfileType} from "../../../Types/types";

type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({profile, handleSubmit, error}) => {
    return <form onSubmit={handleSubmit} className={classes.profileDataForm}>
        {error &&
        <div className={loginClasses.formSummaryError}>
            <span>{error}</span>
        </div>
        }
        <div>
            <b>Full name</b>: {createField<ProfileTypeKeys>('Your full name', 'fullName', Input, [])}
        </div>
        <div>
            <b>About me</b>:
            {createField('Something about you..', 'aboutMe', Textarea, [])}
        </div>
        <div>
            <b>Looking for a
                job</b>: {createField<ProfileTypeKeys>('', 'lookingForAJob', Input, [], {type: 'checkbox'})}
        </div>
        <div>
            <b>My professional skills</b>:
            {createField<ProfileTypeKeys>('Skills:', 'lookingForAJobDescription', Textarea, [])}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={loginClasses.contact}>
                <b> {key}: {createField(key, 'contacts.' + key, Input, [])}</b>
            </div>
        })}
        </div>
        <div><button>Save</button></div>
    </form>
}

const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataReduxForm;
