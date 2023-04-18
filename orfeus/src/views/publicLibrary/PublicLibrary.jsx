import library_styles from "./PublicLibrary.module.css";
import { useState, useEffect } from "react";
import SearchBar from "./search";
import axios from "axios";
import MuiCarousel from "./MuiCarousel";
import { Typography } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Grid, Card, CardContent } from "@mui/material";
import SongItem from "./SongItem.jsx";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import UserPlaylists from "./LibraryPlaylistCards";
import FavoriteIcon from '@mui/icons-material/Favorite';
const baseURL = "http://127.0.0.1:4000/";
const MusicDB = () => {
  const [songs, setSongs] = useState([]);

  function fetchData() {
    return axios
      .get(baseURL + "/carouselfiles")
      .then((response) => response.data)
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchData()
      .then((data) => {
        console.log(data);
        setSongs(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return songs;
};

const filterExamples = (songList, query) => {
  if (!query) {
    return songList;
  }

  return songList.filter((song) => {
    const songName = song.filepath.toLowerCase();
    return songName.includes(query);
  });
};

//This is where we place actual code for the music player code.
const Library = () => {

  const songs = MusicDB();
  const [searchQuery, setSearchQuery] = useState("");
  const filteredExamples = filterExamples(songs, searchQuery);
  const [activeMap, setActiveMap] = useState({});
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const fetchPlaylists = async () => {
    // Fetch playlists from the server
    const response = await axios.get(`${baseURL}/playlist/`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
    setPlaylists(response.data);
  };
  // const fetchLikedSongs = async () => {
  //   // Fetch liked songs from the serveruseEffect(() => {
  //   if (token !== null) {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(baseURL + "/carouselfiles");
  //         const data = response.data;
  //         setSongs(data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  const fetchUserLikes = async () => {
    try {
      const response = await axios.get(baseURL + 'liked_songs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const likesDict = {};
      for (var i = 0; i < response.data.length; i++) {
        likesDict[response.data[i]['generated_file_id']] = response.data[i]['like_count']
      }
      setActiveMap(likesDict);
    } catch (error) {
      console.error('Error fetching user likes', error);
    }
  };

  const handleHeartClick = (song) => {
    if (activeMap[song.id]) {
      // Song is already liked, so decrement like count
      axios.post(baseURL + "/dislike/" + song.id, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.status === 401) {
            localStorage.removeItem('access_token');
            navigate('/login');
          } else {
            setActiveMap(prevMap => {
              const newMap = { ...prevMap };
              delete newMap[song.id]; // Delete the songId entry from the new map
              return newMap;
            });
          }
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
          if (response.status === 401) {
            localStorage.removeItem('access_token');
            navigate('/login');
          }
          setActiveMap(prevMap => ({ ...prevMap, 
                                        [song.id]: response.data.like_count 
                                    }));
        })
        .catch(error => {
          console.error("Error updating like count: ", error);
        });
    }
  }

  useEffect(() => {
    if (token !== null) {
      fetchPlaylists();
      fetchUserLikes();
    }
  }, [token]);
  function extractTitleFromFilepath(filepath) {
    // 8 is the length of "samples/"
    const startIndex = filepath.indexOf("samples\\") + 8; 
    const endIndex = filepath.lastIndexOf(".mp3");
    const title = filepath.substring(startIndex, endIndex);
    return title;
  }
  function sortByLike(songs) {
    const sortedArr = songs.sort((a, b) => b.like_count - a.like_count);
    const top5Songs = sortedArr.slice(0, 3);
    return top5Songs;
  }
  const sortedByLikeSongs = sortByLike(songs);
  const songCards = sortedByLikeSongs.map((song) => {
    return (
      <Grid
        item
        key={song.id}
        xs={12}
        sm={6}
        md={4}
        sx={{
          position: "relative",
          marginTop: "5%",
          paddingLeft: "2%",
          left: "4%",
        }}
      >
        <Card
          sx={{
            width: "75%",
            background: "linear-gradient(135deg, #AB47BC 0%, transparent 80%)",
            border: "black",
            height: "110%",
            alignContent: "center",
            transition: "transform 0.2s ease-in-out", // add a transition effect for smoother animation
            ":hover": {
              transform: "scale(1.05)", // scale up the card when hovering
              "& div": {
                opacity: 1, // show the icon on hover
              },
            },
          }}
        >

          <CardContent>
            <Typography color="white" variant="h2" sx={{
              fontSize: "13px",
              top: 0, // Aligns the content to the top
              right: 0,
            }}>
              {extractTitleFromFilepath(song.filepath)}
            </Typography>

            <IconButton 
              sx={{ color: "white" }}
            >
              <FavoriteIcon /> {song.like_count}

            </IconButton>
            <IconButton
              sx={{
                width: "25%",
                height: "25%",
                color: "white",
                position: "absolute",
                top: "85%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0, // hide the icon button by default
                transition: "opacity 0.2s ease-in-out", // add a transition effect for smoother animation
                ":hover": {
                  opacity: 1, // show the icon button on hover
                },
              }}
            >
              <PlayCircleIcon></PlayCircleIcon>
            </IconButton>

          </CardContent>
        </Card>
      </Grid>
    );
  });

  return (
    <>
      <Grid container spacing={2} style={{ flexWrap: 'wrap' }} sx={{
        flexDirection: { xs: "column-reverse", sm: "row" },
      }}>
        <Grid item xs={2} sm={2} /> {/* Add this line to create a side bar on the left */}

        {/* The main content grid */}
        <Grid item xs={12} sm={8}>
          <Grid container spacing={2} style={{ flexWrap: 'wrap' }} sx={{
            flexDirection: { xs: "column-reverse", sm: "row" },
          }}>
            <Grid item xs={7} sx={{ order: { xs: 1, sm: 2 } }}>
              <div className={library_styles.flex_item_inner}>
                <Box
                  sx={{
                    maxWidth: "70vw",
                    maxHeight: "50vh",
                    backgroundColor: "#211F1F",
                    borderRadius: 1,
                    padding: "32px",
                    marginTop: 2,
                    marginLeft: 2,
                  }}
                >
                  <Typography sx={{ fontSize: "30px", color: "white" }}>
                    Top 3 songs
                    <div style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}>
                      {songCards}
                    </div>
                  </Typography>
                </Box>
              </div>

              <div className={library_styles.flex_item_inner}>
                <Box
                  sx={{
                    maxWidth: "70vw", // set width with vw unit
                    maxHeight: "50vh",
                    backgroundColor: "#211F1F",
                    borderRadius: 1,
                    marginTop: 2,
                    marginLeft: 2,
                    padding: "32px"
                  }}
                >
                  <Typography sx={{ fontSize: "30px", color: "white" }}>
                    Your Playlists
                    <UserPlaylists playlists={playlists}
                      setPlaylists={setPlaylists}
                      fetchPlaylists={fetchPlaylists}
                      activeMap={activeMap}
                      handleHeartClick={handleHeartClick}
                    />
                  </Typography>
                </Box>
              </div >
            </Grid >

            <Grid item xs={5} sx={{ order: { xs: 1, sm: 2 } }}>
              <SearchBar
                className={library_styles.searchbar}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              {filteredExamples.map((song) => (
                <SongItem
                  id={song.id}
                  like_count={song.like_count}
                  song_name={extractTitleFromFilepath(song.filepath)}
                  song={song}
                  activeMap={activeMap}
                  handleHeartClick={handleHeartClick}
                  playlists={playlists}
                  fetchPlaylists={fetchPlaylists}
                />
              ))}
            </Grid>
          </Grid >
        </Grid>

        <Grid item xs={2} sm={2} /> {/* Add this line to create a side bar on the right */}
      </Grid>
    </>
  );
}
export default Library;
