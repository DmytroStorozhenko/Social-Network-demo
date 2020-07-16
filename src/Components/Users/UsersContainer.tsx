import React from "react";
import {
    unfollowThunk,
    followThunk,
    getUsersThunk
} from "../../Redux/users_reduser";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../Common/Prealoader/Prealoader";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersData,
    getUsers
} from "../../Redux/Selectors/UserSelectors";
import {UserType} from "../../Types/types";
import { AppStateType } from "../../Redux/redux-store";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    getUsersThunk: (currentPage: number, pageSize: number) => void
    followThunk: (userId: number) => void
    unfollowThunk: (userId: number) => void
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount = () => {
        const {currentPage, pageSize} = this.props
        this.props.getUsersThunk(currentPage, pageSize)
    };

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsersThunk(pageNumber, pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.followThunk}
                unfollow={this.props.unfollowThunk}
                followingInProgress={this.props.followingInProgress}/>
        </>
    }
}
/*
// this is 'mapStateToProps' without selectors:

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}*/

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersData(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};

/*const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>*/

export default compose(
   connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
          {
            followThunk,
            unfollowThunk,
            getUsersThunk
        })
)(UsersContainer)