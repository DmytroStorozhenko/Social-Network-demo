import React, {ChangeEvent, FC, useState} from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from "../../Common/Prealoader/Prealoader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";
import ProfileDataReduxForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../Types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) return <Preloader/>


    const onMainPhotoSelected = (ev: ChangeEvent<HTMLInputElement>) => {
        if (ev.target.files?.length) {    //or "if (ev.target && ev.target.files.length)"
            savePhoto(ev.target.files[0]);
        }
    }

    type ContactType = {
        contactTitle: string
        contactValue: string
    }

    const Contact: FC<ContactType>= ({contactTitle, contactValue}) => {
        return <div className={classes.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    }

    type ProfileDataPropsType = {
        profile: ProfileType
        isOwner: boolean
        goToEditMode: () => void
    }

    const ProfileData: FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
        return (
            <div className={classes.profileInfo}>
                <div>
                    <b>Full name</b>: {profile.fullName}
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
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}
                </div>
                {isOwner &&
                <div>
                    <button onClick={goToEditMode}>edit...</button>
                </div>
                }
            </div>
        )
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then( () => {
                setEditMode(false);
            }
        );
    }

    return (
        <div className={classes.descriptionBlock}>

            <div className={classes.avatarBlock}><img src={profile.photos.large || userPhoto} className={classes.avatar} alt={""}/>
                {isOwner && <div className={classes.fileSelect}>
                    <input type={'file'} onChange={onMainPhotoSelected} id='file'/>
                    <label htmlFor={'file'}>Choose file...</label>
                </div>
                }
            </div>

            <div className={classes.status}>
                <ProfileStatusWithHooks
                    status={status}
                    updateStatus={updateStatus}/>
            </div>

            <div className={classes.profileData}>
                {editMode
                    ? <ProfileDataReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile}
                                   isOwner={isOwner}
                                   goToEditMode={() => {
                                       setEditMode(true)
                                   }}/>}
            </div>
        </div>
    );
};
export default ProfileInfo;
