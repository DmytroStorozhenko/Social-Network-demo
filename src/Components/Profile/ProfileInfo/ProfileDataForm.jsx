import React from "react";
import {createField, Input, Textarea} from "../../Common/FormControls/FormControls";
import {reduxForm} from "redux-form";
import classes from "../../Login/Login.module.css";

const ProfileDataForm = ({profile, handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        <div><button>Save</button></div>
        { error &&
        <div className={classes.formSummaryError}>
            <span>{error}</span>
        </div>
        }
        <div>
            <b>Full name</b>: {createField('Your full name', 'fullName', Input, [] )}
        </div>
        <div>
            <b>About me</b>:
            {createField( 'Something about you..', 'aboutMe', Textarea, [] )}
        </div>
        <div>
            <b>Looking for a job</b>: {createField('','lookingForAJob', Input, [], {type: 'checkbox'})}
        </div>
        <div>
            <b>My professional skills</b>:
            {createField('Skills:', 'lookingForAJobDescription', Textarea, [] )}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={classes.contact}>
                <b> {key}: {createField(key, 'contacts.' + key, Input, [] )}</b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataReduxForm;
