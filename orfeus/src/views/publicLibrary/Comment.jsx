import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import library_styles from "./PublicLibrary.module.css";
import axios from 'axios';
const baseURL = "http://127.0.0.1:4000/";

function Comment({ hoveredSongId }) {
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem('access_token');

    const handleCommentIconClick = async () => {
        try {
            const response = await axios.get(baseURL + 'comments/' + hoveredSongId, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            for (var i = 0; i < response.data.length; i++) {
                comments.push(response.data[i])
            }
            setShowCommentModal(true);
        } catch (error) {
            console.error('Error fetching comments', error);
        }
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
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setShowCommentModal(false);
        setComments([]);
    }

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
            <div className="modal-dialog modal-dialog-centered">
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
                                className="form-control"
                                value={commentText}
                                onChange={(event) => setCommentText(event.target.value)}
                                onKeyUp={(event) => setCharacterCount(event.target.value.length)}
                            ></textarea>
                            <small class="text-muted">{characterCount} / 1000</small>
                        </div>
                        <hr />
                        <div>
                            {comments.map((comment) => (
                                <div key={comment.id} className={library_styles.comment_container}>
                                    <p>{comment.text}</p>
                                    <small className="text-muted">By User {comment.user_id}</small>
                                </div>
                            ))}

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => handleCloseModal()}>
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