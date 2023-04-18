import React, { useState, useRef } from 'react';
import {
    TextField,
    Popover,
} from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import axios from "axios";

const baseURL = "http://127.0.0.1:4000/";

const LibraryPlaylistAddButton = ({fetchPlaylists}) => {
    const inputRef = useRef();
    const [text, setText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handlePopoverClose = async (event, reason) => {
        if (reason === 'clickAway') {
            inputRef.current.blur(); // Remove focus from TextField
            setText(''); // Clear the content of the TextField
        }
        if (text.trim() !== '') { // Make sure the text is not empty or just whitespace
            try {
                const response = await axios.post(`${baseURL}/playlist/`, { name: text },
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        }
                    })

                if (response.status === 201) {
                    console.log('Playlist created successfully:', response.data);
                    setText(''); // Clear the TextField
                    fetchPlaylists();
                } else {
                    console.error('Error creating playlist:', response.data);
                }
            } catch (error) {
                console.error('Error creating playlist:', error);
            }
        }
        handleClose(); // Call handleClose to close the Popover
    };
    const handleClick = async (event) => {

        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
            }}
        >
            <TextField
                className='button_styles.playlist_form'
                onClick={handleClick}
                value={text}
                onChange={handleChange}
                id="outlined-textarea"
                label="Create new playlist"
                placeholder="Enter playlist name"
                InputLabelProps={{
                    sx: {
                        color: 'white', // change color here
                    },
                }}
                InputProps={{
                    sx: {
                        color: 'white',
                        '&.MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'lavender',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'lavender',
                            },
                        },
                    },
                }}
                multiline
            />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                disableAutoFocus={true}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >

                <div style={{ padding: '16px' }}>
                    <PlaylistAddIcon
                        onClick={handlePopoverClose}
                        color="inherit"
                        sx={{
                            borderRadius: '50%',
                            bgcolor: 'lavender',
                            '&:hover': {
                                bgcolor: 'lavenderblush',
                            },
                        }}
                    />
                </div>
            </Popover>
        </div>
    );

};

export default LibraryPlaylistAddButton;