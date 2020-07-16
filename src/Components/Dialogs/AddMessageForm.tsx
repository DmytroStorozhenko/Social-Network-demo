import {InjectedFormProps, reduxForm} from "redux-form";
import React, {FC} from "react";
import {createField, Textarea} from "../Common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../Utils/Validators";
import {NewMessageFormType} from "./Dialogs";
import {LoginFormValuesType} from "../Login/Login";

const maxLength100 = maxLengthCreator(100);

type PropsType = {}
type NewMessageFormKeysType = Extract<keyof NewMessageFormType, string>

const MessageForm: FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormKeysType>('write your message', 'newMessageBody', Textarea, [required, maxLength100])}
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    )
}

export const AddMessageForm = reduxForm<NewMessageFormType, PropsType>({form: 'dialogAddMessageForm'})(MessageForm);
