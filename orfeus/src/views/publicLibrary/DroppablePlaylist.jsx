import React from 'react';
import { useDrop } from 'react-dnd';
import { Card } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';


const DroppablePlaylist = ({ playlist, onSongDropped, songId, ...props }) => {
    const [isSongInPlaylist, setIsSongInPlaylist] = useState(false);
    const [{ isOver }, drop] = useDrop(() => ({
        accept: isSongInPlaylist ? 'none' : 'song',
        drop: (item) => {
            setIsSongInPlaylist(playlist.songs.some((song) => song.id === item.id));
            if (!isSongInPlaylist) {
                onSongDropped(playlist.id, item.id);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    useEffect(() => {
        setIsSongInPlaylist(playlist.songs.some((song) => song.id === songId));
    }, [songId]);
    return (
        <div ref={drop} style={{ backgroundColor: isOver && !isSongInPlaylist ? '#ab47bc55' : 'transparent', position: 'relative' }}>
            <Card {...props} />
        </div>
    );
};

export default DroppablePlaylist;
