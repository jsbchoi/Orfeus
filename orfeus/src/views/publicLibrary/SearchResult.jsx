import { Card, CardGroup, Container } from "react-bootstrap";
import library_styles from "./PublicLibrary.module.css";
import { useState } from "react";
import Comment from "./Comment";

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
                                className={library_styles.card_body}
                            >
                                <div className={library_styles.play_comment_container}>
                                    {hoveredSongId === song.id && (
                                        <img
                                            onClick={() => handleItemClick(song)}
                                            className={library_styles.search_play_button}
                                            src="assets/play.png"
                                            alt="Play button"
                                        />
                                    )}
                                    <Comment hoveredSongId={hoveredSongId}/>
                                </div>
                                <Card.Text>
                                    {extractTitleFromFilepath(song.filepath)}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>
                ))}
            </CardGroup>
        </ul>


    );
}

export default SearchResult;
