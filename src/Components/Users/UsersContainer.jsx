import React from "react";
import {
    unfollowThunk,
    followThunk,
    setCurrentPageAC,
    toggleFollowingProgressAC, getUsersThunk
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
} from "../../Redux/Selectors/UserSelectors.jsx";


class UsersContainer extends React.Component {

    componentDidMount = () => {
        const {currentPage, pageSize} = this.props;
        this.props.getUsersThunk(currentPage, pageSize);
    };

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.getUsersThunk(pageNumber, pageSize);
    };

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
                toggleFollowingProgress={this.props.toggleFollowingProgressAC}
                followingInProgress={this.props.followingInProgress}/>
        </>
    };
}
/*
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
};*/

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersData(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};


export default compose(
    connect(mapStateToProps,
        {
            followThunk,
            unfollowThunk,
             // setCurrentPage: setCurrentPageAC,
            toggleFollowingProgressAC,
            getUsersThunk
        })
)(UsersContainer);


