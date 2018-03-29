import axios from 'axios';
import jwt_decode from 'jwt-decode';

export function registerAndLogin(thisParam) {
    const host = process.env.REST_HOST + ':' + process.env.PORT;

    axios.post(host + '/users/register', thisParam.state)
    .then((res) => {
        console.log(res.data);
        axios.post(host + '/users/login', {
            "email": thisParam.state.email,
            "password": thisParam.state.password
        })
        .then((res) => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token);

            thisParam.setState({
                name: '',
                email: '',
                password: '',
                passwordConfirmation: '',
                errorMessages: []
            });

            thisParam.props.onShowNavbarAction();
            thisParam.props.history.push("/start");
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    });
}

export function setLikedImage(thisParam, imageid) {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const userid = decoded.userId;
    const tokenHeader = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    const host = process.env.REST_HOST + ':' + process.env.PORT;
    
    axios.patch(host + '/images/likes/' + imageid, {
        userid: userid
    }, tokenHeader)
    .then((res) => {
        thisParam.setState({
            liked: true
        });

        axios.post(host + '/images/' + imageid, null, tokenHeader)
        .then((result) => {
            console.log(result.data);
            result.data.comments = result.data.comments.reverse();
            thisParam.setState({
                image: result.data
            });
        })
        .catch((error) => {
            console.log(error);
        });
    })
    .catch((err) => {
        console.log(err);
    });
}

export function setUnlikedImage(thisParam, imageid) {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const userid = decoded.userId;
    const tokenHeader = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    const host = process.env.REST_HOST + ':' + process.env.PORT;

    axios.patch(host + '/images/unlikes/' + imageid, {
        userid: userid
    }, tokenHeader)
    .then((res) => {
        console.log(res);
        thisParam.setState({
            liked: false
        });

        axios.post(host + '/images/' + imageid, null, tokenHeader)
        .then((result) => {
            console.log(result.data);
            result.data.comments = result.data.comments.reverse();
            thisParam.setState({
                image: result.data
            });
        })
        .catch((error) => {
            console.log(error);
        });
    })
    .catch((err) => {
        console.log(err);
    });
}

export function setComment(thisParam, comment, imageid) {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const userid = decoded.userId;
    const tokenHeader = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    const host = process.env.REST_HOST + ':' + process.env.PORT;

    axios.post(host + '/users/user/' + userid, null, tokenHeader)
    .then((result) => {
        const name = result.data.name;

        if(thisParam.state.comment !== "") {
            axios.patch(host + '/images/comments/' + imageid, {
                userid: userid,
                name: name,
                comment: comment
            }, tokenHeader)
            .then((res) => {
                console.log(res);
                axios.post(host + '/images/' + imageid, null, tokenHeader)
                .then((result) => {
                    console.log(result.data);
                    result.data.comments = result.data.comments.reverse();
                    thisParam.setState({
                        image: result.data,
                        comment: '',
                        errormessage: ''
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            thisParam.setState({
                errormessage: 'Empty message field...'
            });
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

export function setImage(thisParam) {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const loggedInUserid = decoded.userId;
    const tokenHeader = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    const host = process.env.REST_HOST + ':' + process.env.PORT;

    axios.post(host + '/images', {
        url: thisParam.state.imageUrl,
        userid: loggedInUserid
    }, tokenHeader)
    .then((res) => {
        console.log(res);
        thisParam.setState({
            imageUrl: '',
            successMessage: 'Image saved successfully'
        });
    })
    .catch((err) => {
        console.log(err);
    });
}