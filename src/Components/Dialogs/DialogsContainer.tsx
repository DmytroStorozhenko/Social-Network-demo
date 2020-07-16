import React from "react";
import {dialogsActions} from "../../Redux/dialogs_reduser";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HOC/withRedirect";
import {compose} from "redux";
import {AppStateType} from "../../Redux/redux-store";

/*
type DialogType = {
    name: string
    id: number
}

type MessageType = {
    message: string
    id: number
}

export type MapStatePropsType = {
    dialogsPage: {
        dialogs: Array<DialogType>
        messages: Array<MessageType>
    }
}

export type MapDispatchPropsType = {
    sendMessage: any
}

type PropsType = MapStatePropsType & MapDispatchPropsType & PropsFromRedux
*/

let mapStateToProps = (state: AppStateType)/*: MapStatePropsType*/ => {
    return {
        dialogsPage: state.dialogsPage,
    }
};
/*
let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
    return {
        sendMessage: (newMessageBody: any) => {
            dispatch(dialogsActions.addMessage(newMessageBody));
        },
    }
};


const connector: any = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
*/

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...dialogsActions}),
    withAuthRedirect
    )(Dialogs)