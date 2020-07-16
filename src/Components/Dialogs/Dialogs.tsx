import React, {FC} from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Messages/Message";
import {AddMessageForm} from "./AddMessageForm";
import {DialogsInitialStateType} from "../../Redux/dialogs_reduser";

type DialogType = {
    name: string
    id: number
}

type MessageType = {
    message: string
    id: number
}

type PropsType = {
    dialogsPage: DialogsInitialStateType
    sendMessage: (newMessageText: string) => void
}

export type NewMessageFormType = {
    newMessageBody: string
}

const Dialogs: FC<PropsType> = (props) => {

    let dialogsElements =
        props.dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />);

    let messageElement =
        props.dialogsPage.messages.map(message => <Message message={message.message} id={message.id} key={message.id}/>);

    let addNewMessage = (values: {newMessageBody: string}) => {
        props.sendMessage(values.newMessageBody)
    };

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messageElement}
            </div>
            <AddMessageForm onSubmit={addNewMessage}/>
        </div>
    )
};

export default Dialogs;