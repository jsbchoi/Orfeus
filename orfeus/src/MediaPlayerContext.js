import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
const MediaPlayerContext = createContext();

export const useMediaPlayer = () => {
    const context = useContext(MediaPlayerContext);
    if (!context) {
        throw new Error('useMediaPlayer must be used within a MediaPlayerProvider');
    }
    return context;
};

export const MediaPlayerProvider = ({ children }) => {
    const [selectedSong, setSelectedSong] = useState(null);
    const value = { selectedSong, setSelectedSong };
    useEffect(() => {
        console.log("MediaPlayerProvider selectedSong:", selectedSong);
    }, [selectedSong]);
    return (
        <MediaPlayerContext.Provider value={value}>
            {children}
        </MediaPlayerContext.Provider>
    );
};