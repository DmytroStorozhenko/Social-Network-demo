import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatusThunk, getUserProfileThunk, savePhotoThunk, updateStatusThunk} from "../../Redux/profile_reduser";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOC/withRedirect";

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            /* if (!userId) {
                 this.props.history.push('/login');
             }*/
        }

        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                isOwner={!this.props.match.params.userId}
                savePhoto={this.props.savePhoto}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose(
    connect(
        mapStateToProps,
        {
            getUserProfile: getUserProfileThunk,
            getStatus: getStatusThunk,
            updateStatus: updateStatusThunk,
            savePhoto: savePhotoThunk
        }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
