import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import library_styles from "./PublicLibrary.module.css";
import axios from 'axios';
const baseURL = "http://127.0.0.1:4000/";

function Comment({hoveredSongId}) {
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const token = localStorage.getItem('access_token');

    const handleCommentIconClick = () => {
        setShowCommentModal(true);
    };

    const handleCommentSubmit = (event) => {
        axios.post(baseURL + 'comment', {
            generated_file_id: hoveredSongId,
            comment: commentText
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.error('Error posting comment', error);
        }); 
        setShowCommentModal(false); 
    };

    return (
        <>
            {localStorage.getItem('access_token') ? (
                <div className={library_styles.comment_icon_container}>
                    <img
                        className={library_styles.comment_icon}
                        src="assets/comment.png"
                        alt="Comment icon"
                        onClick={handleCommentIconClick}
                    />
                </div>
            ) : null}
            <div class="modal-dialog modal-dialog-centered">
                <Modal
                    backdrop="static"
                    keyboard={false}
                    show={showCommentModal}
                    onHide={() => setShowCommentModal(false)}
                    centered
                >
                    <Modal.Title>What do you think?</Modal.Title>
                    <Modal.Body>
                        <div>
                            <textarea
                                id="commentText"
                                rows="3"
                                placeholder="Enter your comment here..."
                                class="form-control"
                                value={commentText}
                                onChange={(event) => setCommentText(event.target.value)}
                                onKeyUp={(event) => setCharacterCount(event.target.value.length)}
                            ></textarea>
                            <small class="text-muted">{characterCount} / 1000</small>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowCommentModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleCommentSubmit}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </>

    );
}

export default Comment;