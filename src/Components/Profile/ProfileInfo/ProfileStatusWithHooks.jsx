import React, {useEffect, useState} from "react";
import classes from "./ProfileInfo.module.css"

const ProfileStatusWithHooks = (props) => {
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

    const onStatusChange = (ev) => {
        setStatus(ev.currentTarget.value);
    }

    return (
        <div>
            {!editMode ?
                <div>
                   <b>Status</b>: <span onDoubleClick={activateEditMode}>{props.status || 'new status...'}</span>
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