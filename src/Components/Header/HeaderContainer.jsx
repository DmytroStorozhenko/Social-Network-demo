import React from 'react';
import Header from "./Header";
import {logoutThunk} from "../../Redux/auth_reduser";
import {connect} from "react-redux";
import {compose} from "redux";

class HeaderContainer extends React.Component {
		render () {
		return <Header {...this.props} />
	}
};

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login
});

export default compose (
	connect (mapStateToProps, {logoutThunk})
)(HeaderContainer)