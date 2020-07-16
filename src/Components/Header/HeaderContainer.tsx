import React from 'react';
import Header, {MapDispatchPropsType, MapStatePropsType} from "./Header";
import {logoutThunk} from "../../Redux/auth_reduser";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";

class HeaderContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {
		render () {
		return <Header {...this.props} />
	}
};

let mapStateToProps = (state: AppStateType) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login
});

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
	(mapStateToProps, {logoutThunk}
)(HeaderContainer)