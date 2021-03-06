import React, {FC} from "react";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../Types/types";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

let Users: FC<PropsType> = (
    {
        currentPage,
        totalUsersCount,
        pageSize, onPageChanged,
        users, ...props
    }) => {
    return <div>
        <Paginator currentPage={currentPage}
                   totalItemsCount={totalUsersCount}
                   pageSize={pageSize}
                   onPageChanged={onPageChanged}/>
        <div>
            {
                users.map(user =>
                    <User key={user.id}
                          user={user}
                          followingInProgress={props.followingInProgress}
                          follow={props.follow}
                          unfollow={props.unfollow}/>
                )
            }
        </div>

    </div>
}

export default Users;