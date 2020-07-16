import React, {Component, FC, lazy} from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializeAppThunk} from "./Redux/app_reduser";
import Preloader from "./Components/Common/Prealoader/Prealoader";
import store, {AppStateType} from "./Redux/redux-store";
import {withSuspense} from "./HOC/withSuspense";
import UsersContainer from "./Components/Users/UsersContainer";

const DialogsContainer = lazy(() => import('./Components/Dialogs/DialogsContainer'))
//const UsersContainer = lazy(() => import('./Components/Users/UsersContainer'))
const ProfileContainer = lazy(() => import('./Components/Profile/ProfileContainer'))

const SuspendedProfilesContainer = withSuspense(ProfileContainer)
const SuspendedDialogsContainer = withSuspense(DialogsContainer)

type StatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = { initializeAppThunk: () => void }

class App extends Component<StatePropsType & DispatchPropsType> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error occured");
    }
    componentDidMount() {
        this.props.initializeAppThunk();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);}

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/'
                               render={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/profile/:userId?'
                               render={() => <SuspendedProfilesContainer/>}/>
                        <Route path='/dialogs'
                               render={() => <SuspendedDialogsContainer/>}/>
                        <Route path='/users'
                               render={() => <UsersContainer/>}/>
                        <Route path='/login'
                               render={() => <Login/>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})


let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeAppThunk})
)(App);

const MySocialNetworkApp: FC = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
};

export default MySocialNetworkApp;
