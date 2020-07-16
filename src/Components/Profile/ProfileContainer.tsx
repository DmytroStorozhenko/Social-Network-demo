import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatusThunk,
    getUserProfileThunk,
    savePhotoThunk,
    saveProfileThunk,
    updateStatusThunk
} from "../../Redux/profile_reduser";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOC/withRedirect";
import {ProfileType} from "../../Types/types";
import {AppStateType} from "../../Redux/redux-store";

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
    userId: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>;


class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            /* if (!userId) {
                 this.props.history.push('/login');
             }*/
        }

        this.props.getUserProfile(userId as number);
        this.props.getStatus(userId as number);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
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
                savePhoto={this.props.savePhoto}
                saveProfile={this.props.saveProfile}/>
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose<React.ComponentType>(
    connect(
        mapStateToProps,
        {
            getUserProfile: getUserProfileThunk,
            getStatus: getStatusThunk,
            updateStatus: updateStatusThunk,
            savePhoto: savePhotoThunk,
            saveProfile: saveProfileThunk
        }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
