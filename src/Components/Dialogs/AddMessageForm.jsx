import {Field, reduxForm} from "redux-form";
import React from "react";
import {Textaarea} from "../Common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../Utils/Validators";

const maxLength100 = maxLengthCreator(100);

const MessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textaarea}
                       name={'newMessageBody'}
                       placeholder={'write your message'}
                       validate={[required, maxLength100]}/>
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    )
}

export const AddMessageForm = reduxForm({form: 'dialogAddMessageForm'})(MessageForm);
