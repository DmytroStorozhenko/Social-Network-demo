import {InferActionsTypes} from "./redux-store";


let initialState = {
    dialogs: [
        /*{id: 1, name: 'Dmytro'},
        {id: 2, name: 'Nastya'},
        {id: 3, name: 'Aleksey'}*/
    ] as Array<DialogsType>,
    messages: [/*
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Hello'}*/
    ] as Array<Messages>,
};

type DialogsType = {
    id: number
    name: string
}
type Messages = {
    id: number
    message: string
}
export type DialogsInitialStateType = typeof initialState;


const dialogsReduser = (state = initialState, action: ActionsType)
    : DialogsInitialStateType  => {
    switch (action.type) {
        case 'DIALOGS/SEND-MESSAGE':
            let messageText = action.newMessageBody;
            let newMessage = {
                id: state.messages.length + 1,
                message: messageText,
            };
            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        default:
            return state;
    }
};

export const dialogsActions = {
    sendMessage: (newMessageBody: string) => ({type: 'DIALOGS/SEND-MESSAGE', newMessageBody} as const)
}

type ActionsType = InferActionsTypes<typeof dialogsActions>

export default dialogsReduser;