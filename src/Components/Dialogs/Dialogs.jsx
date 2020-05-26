import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Messages/Message";
import {AddMessageForm} from "./AddMessageForm";

const Dialogs = (props) => {

    let dialogsElements =
        props.dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>);

    let messageElement =
        props.dialogsPage.messages.map(message => <Message message={message.message} key={message.id} id={message.id}/>);

      let addNewMessage = (values) => {
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