import React, {FC} from "react";
import classes from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../Types/types";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

let User: FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {
    return <div>
                <span>
                    <div>
                        <NavLink to={`/profile/${user.id}`}>
                        <img
                            src={user.photos.small != null ? user.photos.small : userPhoto}
                            alt={''}
                            className={classes.userPhoto}/>
                            </NavLink>
                    </div>
                    <div>
                        {user.followed ?
                            <button disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        unfollow(user.id)
                                    }}>Unfollow</button> :

                            <button disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        follow(user.id)
                                    }}>Follow</button>
                        }
                    </div>
                </span>
        <span>
                    <span>
                       <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{"user.location.city"}</div>
                        <div>{"user.location.country"}</div>
                    </span>
                 </span>
    </div>

}

export default User;