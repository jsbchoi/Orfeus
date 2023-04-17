import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { List } from '@mui/material/';
import PlaylistItem from './PlaylistSongItem';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LibraryPlaylistAddButton from './LibraryAddPlaylist';
import { Modal, Box, Button, Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const baseURL = "http://127.0.0.1:4000/";

const UserPlaylists = ({ activeMap, handleHeartClick, playlists, setPlaylists, fetchPlaylists }) => {
    const [expanded, setExpanded] = React.useState({});
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [open, setOpen] = useState(false);
    const [deletedPlaylist, setDeletedPlaylist] = useState(null);

    const handleClickOpen = (playlist) => {
        setDeletedPlaylist(playlist)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteConfirmation = async () => {
        await handleDelete(deletedPlaylist.id);
        setOpen(false);
    };

    function extractTitleFromFilepath(filepath) {
        const startIndex = filepath.indexOf("samples\\") + 8; // 8 is the length of "samples/"
        const endIndex = filepath.lastIndexOf(".mp3");
        const title = filepath.substring(startIndex, endIndex);
        return title;
    }

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const handleExpandClick = (id) => {
        setCurrentPlaylist(playlists.find((playlist) => playlist.id === id));
    };

    const handleDelete = async (id) => {
        const response = await axios.delete(`${baseURL}/playlist/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
        setPlaylists(playlists.filter((playlist) => playlist.id !== id));
    };


    return (
        <>
            <LibraryPlaylistAddButton fetchPlaylists={fetchPlaylists} />
            <Grid container spacing={2}>
                {playlists.map((playlist) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={playlist.id}>
                        <Card sx={{
                            marginTop: 2,
                            maxWidth: 345,
                            // background: "linear-gradient(to bottom, #e5eaf5, #d0bdf4, #8458b3)",
                            // background: "linear-gradient(135deg, #AB47BC 0%, #1976d2 50%, transparent 80%)",
                            background: "linear-gradient(135deg, #AB47BC 0%, transparent 100%)",

                            color: "white",

                            transition: "transform 0.2s ease-in-out", // add a transition effect for smoother animation
                            ":hover": {
                                transform: "scale(1.05)", // scale up the card when hovering
                                "& div": {
                                    opacity: 1, // show the icon on hover
                                },
                            },
                        }}>
                            <CardHeader
                                title={playlist.name}
                            />
                            {playlist.songs.length === 0 ? (
                                <Typography>Add songs</Typography>
                            ) : (
                                <Typography>{playlist.songs.length} songs</Typography>
                            )}
                            <CardActions disableSpacing>
                                <IconButton aria-label="remove"
                                    sx={{ color: "white" }}
                                >
                                    <DeleteForeverIcon onClick={() => handleClickOpen(playlist)} />

                                </IconButton>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Delete Playlist"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure you want to delete {deletedPlaylist?.name} ?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={handleDeleteConfirmation} color="primary" autoFocus>
                                            Delete
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <ExpandMore
                                    expand={expanded[playlist.id]}
                                    onClick={() => handleExpandClick(playlist.id)}
                                    aria-expanded={expanded[playlist.id]}
                                    aria-label="show more"
                                >
                                    <MenuOpenIcon
                                        sx={{ color: "white" }}
                                    />
                                </ExpandMore>
                            </CardActions>
                            <Modal open={currentPlaylist !== null} onClose={() => setCurrentPlaylist(null)}>
                                <div>
                                    <Box sx={{ p: 2, bgcolor: 'grey.800', maxWidth: 600, paddingTop: 10, margin: 'auto' }}>
                                        <Typography color="white" variant="h5">{currentPlaylist?.name}</Typography>
                                        <List>
                                            {currentPlaylist?.songs.map((song) => (
                                                <PlaylistItem
                                                    key={song.id}
                                                    id={song.id}
                                                    like_count={song.like_count}
                                                    song_name={extractTitleFromFilepath(song.filepath)}
                                                    song={song}
                                                    activeMap={activeMap}
                                                    handleHeartClick={handleHeartClick}
                                                />
                                            ))}
                                        </List>
                                        <Button variant="contained" onClick={() => setCurrentPlaylist(null)}>Close</Button>
                                    </Box>
                                </div>
                            </Modal>

                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default UserPlaylists;
