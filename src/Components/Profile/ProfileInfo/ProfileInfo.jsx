import React, {useState} from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from "../../Common/Prealoader/Prealoader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";
import ProfileDataReduxForm from "./ProfileDataForm.jsx";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) return <Preloader/>
    /*-----------'Func for upload avatar'-----------*/
    const onMainPhotoSelected = (ev) => {
        if (ev.target.files.length) {
            savePhoto(ev.target.files[0]);
        }
    }

    /*-----------'Create contact'-----------*/
    const Contact = ({contactTitle, contactValue}) => {
        return <div className={classes.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    }

    /*-----------ProfileDataComponent------------*/
    const ProfileData = ({profile, isOwner, goToEditMode}) => {
        return (
            <div className={classes.profileInfo}>
                {isOwner &&
                <div>
                    <button onClick={goToEditMode}>edit...</button>
                </div>
                }
                <div>
                    <b>Full name</b>: {profile.fullname}
                </div>
                <div>
                    <b>About me</b>: {profile.aboutMe}
                </div>
                <div>
                    <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
                </div>
                {profile.lookingForAJob &&
                <div>
                    <b>My professional skills</b>: {profile.lookingForAJobDescription}
                </div>
                }
                <div>
                    <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
                </div>
            </div>
        )
    }

    /*-----------Func for submit profile data------------*/
    const onSubmit = (formData) => {
        saveProfile(formData).then( () => {
                setEditMode(false);
            }
        );
    }

    return (
        <div className={classes.descriptionBlock}>

            {/*-----------'Avatar'-----------*/}
            <div className={classes.avatar}><img src={profile.photos.large || userPhoto} alt={""}/>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            </div>

            {/*-----------'Status'-----------*/}
            <div className={status}>
                <ProfileStatusWithHooks
                    status={status}
                    updateStatus={updateStatus}/>
            </div>

            {/*-----------'Profile info'-----------*/}
            <div>
                {editMode
                    ? <ProfileDataReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile}
                                   isOwner={isOwner}
                                   goToEditMode={() => {
                                       setEditMode(true)
                                   }}/>}
            </div>
            {/*-----------*/}
        </div>
    );
};
export default ProfileInfo;
