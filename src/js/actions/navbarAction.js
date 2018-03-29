export function showNavbarAction() {
    return {
        type: 'SHOW_NAVBAR',
        payLoad: true
    };
}

export function hideNavbarAction() {
    return {
        type: 'HIDE_NAVBAR',
        payLoad: false
    };
}