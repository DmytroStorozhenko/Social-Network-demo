import profileReduser from "./profile_reduser";
import dialogsReduser from "./dialogs_reduser";
import sidebarReduser from "./sidebar_reduser";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12},
                {id: 2, message: 'It\'s my first post', likesCount: 3}
            ],
            newPostText: 'add new post'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dmytro'},
                {id: 2, name: 'Nastya'},
                {id: 3, name: 'Aleksey'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How are your it-camasutra'},
                {id: 3, message: 'Yo'}
            ],
            newMessageText: ''
        },
        sidebar: {
            friends: [
                {
                    ava: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRPC9J6KVO48QZ3eRJiyUZiUlJgmsN_whpUca91_qk77W8HAYY-',
                    name: 'Dmytro'
                },
                {
                    ava: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRsXHgwQGFwmvQFB1OOdNSuNh_5TbdVdObzr1sP9eN7yxDyymMc',
                    name: 'Nastya'
                },
                {
                    ava: 'https://mtdata.ru/u23/photo561D/20113975150-0/original.jpg',
                    name: 'Aleksey'
                }
            ]
        }

    },
    _callSubscriber () {
        console.log('ololo');
    },

    getState () {
        return this._state;
    },
    subscribe (observer) {
        this._callSubscriber = observer;
    },

    dispatch (action) {
        this._state.profilePage = profileReduser(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReduser(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReduser(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
};

export default store;
window.store = store;