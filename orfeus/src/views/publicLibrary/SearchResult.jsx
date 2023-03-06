import { Card, CardGroup, Container } from "react-bootstrap";
import library_styles from "./PublicLibrary.module.css";
import { useState } from "react";

function SearchResult({ handleItemClick, songs }) {
    const [hoveredSongId, setHoveredSongId] = useState(null);
    function extractTitleFromFilepath(filepath) {
        const startIndex = filepath.indexOf("samples\\") + 8; // 8 is the length of "samples/"
        const endIndex = filepath.lastIndexOf(".mp3");
        const title = filepath.substring(startIndex, endIndex);
        return title;
    }

    return (
        <ul className={library_styles.generated_song_list}>
            <CardGroup>
                {songs.map((song) => (
                    <Container fluid className="mb-1">
                        <Card
                            bg="secondary"
                            style={{ width: "100%" }}
                            className={library_styles.song_card}
                        >
                            <Card.Body 
                                onMouseEnter={() => setHoveredSongId(song.id)}
                                onMouseLeave={() => setHoveredSongId(null)}
                                onClick={() => handleItemClick(song)}
                            >
                                <Card.Text>
                                    {extractTitleFromFilepath(song.filepath)}
                                    {songs.artist_id}
                                    {songs.genre_id}
                                </Card.Text>
                                {hoveredSongId === song.id && (
                                    <img
                                        className={library_styles.search_play_button}
                                        src="assets/play.png"
                                        alt="Play button"
                                    />
                                )}
                            </Card.Body>
                        </Card>
                    </Container>
                ))}
            </CardGroup>
        </ul>
    );
}

export default SearchResult;
