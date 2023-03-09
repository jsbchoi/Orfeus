import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import library_styles from "./PublicLibrary.module.css";
import "react-h5-audio-player/lib/styles.css";
const baseURL = "http://127.0.0.1:4000/";



function TopSongsCarousel({handleItemClick}) {
    const [topSongs, setTopSongs] = useState([]);
    const [hoveredItemId, setHoveredItemId] = useState(null);
    function extractTitleFromFilepath(filepath) {
        const startIndex = filepath.indexOf("samples\\") + 8; // 8 is the length of "samples/"
        const endIndex = filepath.lastIndexOf(".mp3");
        const title = filepath.substring(startIndex, endIndex);
        return title;
    }

    useEffect(() => {
        async function fetchTopSongs() {
            const response = await fetch(baseURL + "/carouselfiles");
            const data = await response.json();
            setTopSongs(data);
        }
        fetchTopSongs();

    }, []);

    return (
        <div>
            <Carousel style={{ height: "60%", width: "100%" }}>
                {topSongs.map((song) => (
                    <Carousel.Item
                        key={song.id}
                        onMouseEnter={() => setHoveredItemId(song.id)}
                        onMouseLeave={() => setHoveredItemId(null)}
                    >
                        <img
                            className={library_styles.top_songs}
                            src="assets/gradient.jpeg"
                            alt="First slide"
                        />
                        {hoveredItemId === song.id && (
                            <img
                                onClick={() => handleItemClick(song)}
                                className={library_styles.play_button}
                                src="assets/play.png"
                                alt="Play button"
                            />
                        )}
                        <Carousel.Caption>
                            <h1>{extractTitleFromFilepath(song.filepath)}</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default TopSongsCarousel;