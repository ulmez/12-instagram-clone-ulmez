import React from 'react';
import axios from 'axios';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { showNavbarAction, hideNavbarAction } from '../../../actions/navbarAction';

import { setLikedImage, setUnlikedImage, setComment } from '../../../helpers/restSet';
import { getAllImages, getSpecImageAndUser } from '../../../helpers/restGet';

class Explore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            image: {},
            user: {},
            comment: '',
            errormessage: '',
            liked: false
        };

        this.onClickImage = this.onClickImage.bind(this);
        this.onClickLike = this.onClickLike.bind(this);
        this.onClickUnlike = this.onClickUnlike.bind(this);
        this.onAddComment = this.onAddComment.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        getAllImages(this);
    }

    onClickImage(event) {
        this.setState({
            liked: false
        });

        const imageId = event.target.id;
        
        getSpecImageAndUser(this, imageId);
    }

    onCloseModalWindow() {
        const modal = document.querySelector('.modal');
        modal.style.display = "none";
    }

    onClickLike() {
        const imageid = this.state.image._id;

        this.setState({
            errormessage: ''
        });

        setLikedImage(this, imageid);
    }

    onClickUnlike() {
        this.setState({
            errormessage: ''
        });

        const imageid = this.state.image._id;

        setUnlikedImage(this, imageid);
    }

    onAddComment() {
        const imageid = this.state.image._id;
        const comment = this.state.comment;

        setComment(this, comment, imageid);
    }

    onChange(event) {
        this.setState({
            comment: event.target.value
        });
    }

    render() {
        return (
            <div>
                <div className="modal">
                    <div className="modal-content-explore">
                        <span onClick={this.onCloseModalWindow} className="close">&times;</span>
                        <div className="image"><img src={this.state.image.url} className="thumbnail" /></div>
                        <div className="username"><b>{this.state.user.name}</b></div>
                        <div className="comments">
                            {this.state.image.comments && this.state.image.comments.map((comment, i) => (
                                <div key={i} className="bottom-margin-comments"><b>{comment.name}</b> {comment.comment}</div>
                            ))}
                        </div>
                        <div className="like-unlike-insert-comment-box">
                            <div>
                                {
                                    !this.state.liked
                                    ?
                                        <b><span onClick={this.onClickLike} className="link">Like</span></b>
                                    :
                                        <b><span onClick={this.onClickUnlike} className="link gray-text-color">Unlike</span></b>
                                }
                            </div>
                            <div>{this.state.image.likes && this.state.image.likes.length} <b>likes</b></div>
                            <div><input type="text" onChange={this.onChange} value={this.state.comment} placeholder="Add a comment..." /><button onClick={this.onAddComment} className="small-button">Add</button></div>
                            {this.state.errormessage !== '' && <div className="red-text-color">{this.state.errormessage}</div>}
                        </div>
                    </div>
                </div>
                <div className='user-image-box'>
                    <div>
                        <div>&nbsp;</div>
                        <h3 className="center-text">Image list</h3>
                        <div>
                            {this.state.images.map((image) => (
                                <img key={image._id} id={image._id} onClick={this.onClickImage} className="thumbnail" src={image.url} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapActionsToProps = {
    onShowNavbarAction: showNavbarAction,
    onHideNavbarAction: hideNavbarAction
};

export default withRouter(connect(null, mapActionsToProps)(Explore));