import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import axios from 'axios';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
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
                <div>
                    {/* <img
                        src="assets/comment.png"
                        alt="Comment icon"
                        onClick={handleCommentIconClick}
                    /> */}
                    <ChatBubbleOutlineIcon onClick={handleCommentIconClick} />
                </div>
            ) : null}
            <div className="modal-dialog modal-dialog-centered">
                <Modal
                    backdrop="static"
                    keyboard={false}
                    show={showCommentModal}
                    onHide={() => setShowCommentModal(false)}
                    centered
                    backgroundColor="grey"
                >
                    <Modal.Title>What do you think?</Modal.Title>
                    <Modal.Body
                        backgroundColor="grey"
                        >
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
                                <div key={comment.id} >
                                    <p>{comment.text}</p>
                                    <small className="text-muted">By {comment.username}</small>
                                </div>
                            ))}

                        </div>
                    </Modal.Body>
                    <Modal.Footer
                        backgroundColor="grey"
                    >
                        <Button
                            variant="contained"
                            onClick={() => handleCloseModal()}
                            sx={{
                                marginRight: 1,
                                backgroundColor: '#9c27b0',
                                '&:hover': {
                                    backgroundColor: '#7b1fa2',
                                },
                            }}
                        >
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleCommentSubmit}
                            sx={{
                                backgroundColor: '#ab47bc',
                                '&:hover': {
                                    backgroundColor: '#8e24aa',
                                },
                            }}
                        >
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </>

    );
}

export default Comment;