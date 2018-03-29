export const initialState = {
    showNavbar: false
};

export const showNavbarReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SHOW_NAVBAR':
            return action.payLoad;
        case 'HIDE_NAVBAR':
            return action.payLoad;
        default:
            return state;
    }
};
