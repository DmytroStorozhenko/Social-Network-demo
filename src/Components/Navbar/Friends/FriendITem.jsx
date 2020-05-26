import React from 'react';
import classes from './Friends.module.css';

const FriendItem = (props) => {
    return (
        <div className={classes.friendItem}>
            <div className={classes.ava}>
                <img src={props.ava}/>
            </div>
            <div>
                {props.name}
            </div>
        </div>
    )
}

export default FriendItem;