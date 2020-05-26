let initialState = {
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
};

const sidebarReduser = (state = initialState, action) => {
    return state;
}

export default sidebarReduser;