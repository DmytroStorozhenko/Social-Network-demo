const ADD_MESSAGE = 'DIALOGS/ADD-MESSAGE';

let initialState = {
    dialogs: [
        /*{id: 1, name: 'Dmytro'},
        {id: 2, name: 'Nastya'},
        {id: 3, name: 'Aleksey'}*/
    ],
    messages: [/*
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Hello'}*/
    ],
};

const dialogsReduser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
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

export const addMessageAC = (newMessageBody) => ({type: ADD_MESSAGE, newMessageBody});

export default dialogsReduser;