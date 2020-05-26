import React, {lazy, Suspense} from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
//import DialogsContainer from "./Components/Dialogs/DialogsContainer";
//import UsersContainer from "./Components/Users/UsersContainer";
//import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializeAppThunk} from "./Redux/app_reduser";
import Preloader from "./Components/Common/Prealoader/Prealoader";
import store from "./Redux/redax-store";

const DialogsContainer = lazy(() => import('./Components/Dialogs/DialogsContainer'));
const UsersContainer = lazy(() => import('./Components/Users/UsersContainer'));
const ProfileContainer = lazy(() => import('./Components/Profile/ProfileContainer'));

class App extends React.Component {

    componentDidMount() {
        this.props.initializeAppThunk();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Suspense fallback={<div><Preloader/></div>}>
                        <Switch>
                            <Route path='/profile/:userId?'
                                   render={() => <ProfileContainer/>}/>
                            <Route path='/dialogs'
                                   render={() => <DialogsContainer/>}/>
                            <Route path='/users'
                                   render={() => <UsersContainer/>}/>
                        </Switch>
                    </Suspense>
                    <Route path='/login'
                           render={() => <Login/>}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})


let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeAppThunk})
)(App);

const MySocialNetworkApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
};

export default MySocialNetworkApp;
