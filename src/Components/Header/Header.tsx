import React, {FC} from 'react';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import Logo from '../../assets/images/free_horizontal_on_white_by_logaster (1).png'

export type MapStatePropsType = {
	isAuth: boolean
	login: string | null
}
export type MapDispatchPropsType = {
	logoutThunk: () => void
}

const Header: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
	return (
		<header className={classes.header}>
			<img src={Logo}/>

		<div className={classes.loginBlock}>
			{props.isAuth ?
				<div>{props.login} <button onClick={props.logoutThunk}>Log out</button></div>
				: <NavLink to={'/login'}>Login</NavLink>}
		</div>

		</header>
	)
}

export default Header;