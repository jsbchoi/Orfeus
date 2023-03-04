import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import library_styles from "./PublicLibrary.module.css";
import "react-h5-audio-player/lib/styles.css";
const baseURL = "http://127.0.0.1:5000/";



function TopSongsCarousel({handleItemClick}) {
    const [topSongs, setTopSongs] = useState([]);
    const [hoveredItemId, setHoveredItemId] = useState(null);
    function extractTitleFromFilename(filename) {
        const startIndex = filename.indexOf("samples\\") + 8; // 8 is the length of "samples/"
        const endIndex = filename.lastIndexOf(".mp3");
        const title = filename.substring(startIndex, endIndex);
        return title;
    }

    useEffect(() => {
        async function fetchTopSongs() {
            const response = await fetch(baseURL + "/getCarouselFiles");
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
                        onClick={() => handleItemClick(song)}
                    >
                        <img
                            className={library_styles.top_songs}
                            src="assets/gradient.jpeg"
                            alt="First slide"
                        />
                        {hoveredItemId === song.id && (
                            <img
                                className={library_styles.play_button}
                                src="assets/play.png"
                                alt="Play button"
                            />
                        )}
                        <Carousel.Caption>
                            <h1>{extractTitleFromFilename(song.filepath)}</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default TopSongsCarousel;