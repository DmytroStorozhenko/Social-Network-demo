import React from 'react';
import classes from './Friends.module.css';
import FriendItem from "./FriendITem";

const Friends = (props) => {

    let friendsItem = props.friends.map(f => <FriendItem name={f.name} ava={f.ava}/>);

    return <div>
        <h2>Friends</h2>
        <div className={classes.container}>
            {friendsItem}
        </div>
    </div>
};

export default Friends;