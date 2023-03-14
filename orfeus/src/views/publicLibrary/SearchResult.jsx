import { Card, CardGroup, Container } from "react-bootstrap";
import library_styles from "./PublicLibrary.module.css";
import { useState } from "react";
import { React, useEffect } from 'react';
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import Comment from "./Comment";
import Heart from "react-heart"
import { Link } from "react-router-dom";
import axios from 'axios';
const baseURL = "http://127.0.0.1:4000/";

function SearchResult({ handleItemClick, songs }) {
    const [hoveredSongId, setHoveredSongId] = useState(null);
    const [activeMap, setActiveMap] = useState({});

    const hasAccessToken = localStorage.getItem('access_token') !== null;
    const token = localStorage.getItem('access_token');
    useEffect(() => {

        if (hasAccessToken !== null) {
            axios.get(baseURL + 'liked_songs', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                const likesDict = {};
                for (var i = 0; i < response.data.length; i++) {
                    likesDict[response.data[i]['generated_file_id']] = response.data[i]['like_count']
                }
                setActiveMap(likesDict);
            })
                .catch(error => {
                    console.error('Error deleting fetching user likes', error);
                });
        }
    }, [hasAccessToken, token]);
    function extractTitleFromFilepath(filepath) {
        const startIndex = filepath.indexOf("samples\\") + 8; // 8 is the length of "samples/"
        const endIndex = filepath.lastIndexOf(".mp3");
        const title = filepath.substring(startIndex, endIndex);
        return title;
    }

    const handleHeartClick = (song) => {
    if (activeMap[song.id]) {
        // Song is already liked, so decrement like count
        axios.post(baseURL + "/dislike/" + song.id, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setActiveMap(prevMap => {
                    const newMap = { ...prevMap };
                    delete newMap[song.id]; // Delete the songId entry from the new map
                    return newMap;
                });
                song.like_count = response.data['like_count']
            })
            .catch(error => {
                console.error("Error updating like count: ", error);
            });
    } else {
        // Song is not liked, so increment like count
        axios.post(baseURL + "/like/" + song.id, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setActiveMap(prevMap => ({ ...prevMap, [song.id]: response.data.like_count }));
            })
            .catch(error => {
                console.error("Error updating like count: ", error);
            });
    }
};
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
                                    <Comment hoveredSongId={hoveredSongId} />
                                </div>
                                <Card.Text>
                                    <a href={song.filepath} download><BsFillArrowDownSquareFill /> </a>
                                    {extractTitleFromFilepath(song.filepath)}
                                </Card.Text>

                                {!hasAccessToken && (
                                    <div style={{ width: "2rem" }}>
                                        <Link to="/login">
                                            <Heart
                                                isActive={activeMap[song.id]}
                                                animationTrigger="both"
                                                inactiveColor="rgba(255,125,125,.75)"
                                                activeColor="#e019ae"
                                                style={{ marginTop: '1rem', cursor: 'default' }}
                                                animationDuration={0.1}
                                            />
                                        </Link>
                                        {activeMap[song.id] !== undefined ? activeMap[song.id] : song.like_count}
                                    </div>
                                )}
                                {hasAccessToken && (
                                    <div style={{ width: "2rem" }}>
                                        <Heart
                                            isActive={activeMap[song.id] || false}
                                            onClick={() => handleHeartClick(song)}
                                            animationTrigger="both"
                                            inactiveColor="rgba(255,125,125,.75)"
                                            activeColor="#e019ae"
                                            style={{ marginTop: '1rem' }}
                                            animationDuration={0.1}

                                        />
                                        {activeMap[song.id] !== undefined ? activeMap[song.id] : song.like_count}

                                    </div>)
                                }
                            </Card.Body>
                        </Card>
                    </Container>
                ))}
            </CardGroup>
        </ul>


    );
}

export default SearchResult;
