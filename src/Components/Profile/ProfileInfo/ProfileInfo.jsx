import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from "../../Common/Prealoader/Prealoader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {

    if (!profile) return <Preloader/>

    const onMainPhotoSelected = (ev) => {
        if (ev.target.files.length) {
            savePhoto(ev.target.files[0]);
        }
    }

    return (
        <div>
            <div className={classes.descriptionBlock}>
                <img src={profile.photos.large || userPhoto}/>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks
                    status={status}
                    updateStatus={updateStatus}/>
            </div>
        </div>
    );
};
export default ProfileInfo;
