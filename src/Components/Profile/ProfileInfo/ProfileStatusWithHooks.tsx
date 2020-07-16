import React, {ChangeEvent, FC, useEffect, useState} from "react";
import classes from "./ProfileInfo.module.css"

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}


const ProfileStatusWithHooks: FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status);
        },[props.status]
    );

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setStatus(ev.currentTarget.value);
    }

    return (
        <div>
            {!editMode ?
                <div className={classes.statusText}>
                    <span onDoubleClick={activateEditMode}>{props.status || 'New status...'}</span>
                </div> :
                <div>
                    <input onChange={onStatusChange}
                           autoFocus={true}
                           onBlur={deactivateEditMode}
                           value={status}/>
                </div>
            }
        </div>
    )
}


export default ProfileStatusWithHooks;