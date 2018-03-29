import axios from 'axios';
import jwt_decode from 'jwt-decode';

export function login(thisParam, errorMessages) {
    const host = 'https://instagram-clone-api.herokuapp.com';
    // const host = process.env.REST_HOST + ':' + process.env.PORT;

    axios.post(host + '/users/login', {
        "email": thisParam.state.email,
        "password": thisParam.state.password
    })
    .then((res) => {
        localStorage.setItem('token', res.data.token);

        thisParam.props.onShowNavbarAction();
        thisParam.props.history.push("/start");
    })
    .catch((err) => {
        errorMessages.push('Unauthorized user');

        thisParam.setState({
            errorMessages: errorMessages
        });

        const modal = document.querySelector('.modal');
        modal.style.display = "block";
    });
}

export function authorization(thisParam) {
    const token = localStorage.getItem('token');
    const host = 'https://instagram-clone-api.herokuapp.com';
    // const host = process.env.REST_HOST + ':' + process.env.PORT;

    axios.post(host + '/users/auth', null, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err);
        thisParam.props.onHideNavbarAction();
        thisParam.props.history.push("/login");
    });
}

export function authAndGetSpecUserImages(thisParam) {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const loggedInUserid = decoded.userId;
    const tokenHeader = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    const host = 'https://instagram-clone-api.herokuapp.com';
    // const host = process.env.REST_HOST + ':' + process.env.PORT;

    axios.post(host + '/users/auth', null, tokenHeader)
    .then((res) => {
        console.log(res.data);
        axios.post(host + '/users/user/' + loggedInUserid, null, tokenHeader)
        .then((res) => {
            console.log(res.data);
            thisParam.setState({
                user: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });

        axios.post(host + '/images/user/' + loggedInUserid, null, tokenHeader)
        .then((res) => {
            console.log(res.data);
            thisParam.setState({
                images: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
        thisParam.props.onHideNavbarAction();
        thisParam.props.history.push("/login");
    });
}

export function checkIfValidToken() {
    const token = localStorage.getItem('token');
    const tokenHeader = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    const host = 'https://instagram-clone-api.herokuapp.com';
    // const host = process.env.REST_HOST + ':' + process.env.PORT;

    axios.post(host + '/users/logout', null, tokenHeader)
    .then((res) => {
        console.log(res);
        localStorage.removeItem('token');

    })
    .catch((err) => {
        console.log(err);
    });
}

export function getAllImages(thisParam) {
    const token = localStorage.getItem('token');
    const tokenHeader = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    const host = 'https://instagram-clone-api.herokuapp.com';
    // const host = process.env.REST_HOST + ':' + process.env.PORT;

    axios.post(host + '/images/allimages', null, tokenHeader)
    .then((res) => {
        console.log(res.data);
        thisParam.setState({
            images: res.data
        });
    })
    .catch((err) => {
        console.log(err);
        thisParam.props.onHideNavbarAction();
        thisParam.props.history.push("/login");
    });
}

export function getSpecImageAndUser(thisParam, imageId) {
    const token = localStorage.getItem('token');
    const tokenHeader = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    const host = 'https://instagram-clone-api.herokuapp.com';
    // const host = process.env.REST_HOST + ':' + process.env.PORT;

    axios.post(host + '/images/' + imageId, null, tokenHeader)
    .then((res) => {
        res.data.comments = res.data.comments.reverse();
        thisParam.setState({
            image: res.data
        });

        const userid = res.data.userid;
        const decoded = jwt_decode(token);
        const loggedInUserid = decoded.userId;

        for(let i = 0; i < res.data.likes.length; i++) {
            console.log(loggedInUserid + ' : ' + res.data.likes[i].userid);
            if(loggedInUserid === res.data.likes[i].userid) {
                thisParam.setState({
                    liked: true
                });
                break;
            }
        }

        axios.post(host + '/users/user/' + userid, null, tokenHeader)
        .then((result) => {
            thisParam.setState({
                user: result.data
            });

            const modal = document.querySelector('.modal');
            modal.style.display = "block";
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    });
}