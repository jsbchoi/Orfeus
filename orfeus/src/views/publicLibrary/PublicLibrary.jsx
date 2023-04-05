import library_styles from "./PublicLibrary.module.css";
import { useState, useEffect } from "react";
import SearchBar from "./oldSearch";
import axios from "axios";
import MuiCarousel from "./MuiCarousel";
import MusicPlayer from "./MusicPlayer";
import SearchResult from "./SearchResult";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Grid, Card, CardContent } from "@mui/material";
import SongItem from "./SongItem.jsx";

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
  const [selectedSong, setSelectedSong] = useState(null);
  const filteredExamples = filterExamples(songs, searchQuery);

  function extractTitleFromFilepath(filepath) {
    const startIndex = filepath.indexOf("samples\\") + 8; // 8 is the length of "samples/"
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
            background: "linear-gradient(to bottom, #e5eaf5, #d0bdf4, #8458b3)",
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
            <Typography variant="h5" sx={{ fontSize: "13px" }}>
              {extractTitleFromFilepath(song.filepath)}
            </Typography>
          </CardContent>
          <IconButton
            sx={{
              width: "25%",
              height: "25%",
              color: "black",
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
        </Card>
      </Grid>
    );
  });

  function handleItemClick(song) {
    setSelectedSong(song);
  }

  return (
    <div className={library_styles.library}>
      <div className={library_styles.carousel_container}>
        <MuiCarousel className={library_styles.carousel} />
      </div>
      <div className={library_styles.content_container}>
        <div>
          {/* <IconButton>
              <AddCircleOutlineIcon></AddCircleOutlineIcon>
            </IconButton> */}
          <div className={library_styles.add_playlist}>
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <Button
                    variant="contained"
                    {...bindTrigger(popupState)}
                    sx={{
                      backgroundColor: "#211F1F",
                      "&:hover": {
                        backgroundColor: "#211F1F",
                        // add any other styles you want to apply when hovering here
                      },
                    }}
                  >
                    Create Playlist
                  </Button>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        p: 2,
                        width: "300px",
                        height: "500px",
                        color: "white",
                        backgroundColor: "rgb(	90, 90, 90)",
                      }}
                    >
                      Playlists
                      <form>
                        <label sx={{ width: "300px", height: "50px" }}>
                          Current Playlists:
                          <input type="text" name="playlistName" />
                        </label>
                        <br />
                        <Button
                          variant="contained"
                          sx={{ mt: 2, backgroundColor: "#211F1F" }}
                        >
                          Create
                        </Button>
                      </form>
                    </Typography>
                  </Popover>
                </div>
              )}
            </PopupState>
          </div>
          <div className={library_styles.page_options}></div>
        </div>
        <div className={library_styles.search_options}>
          <SearchBar
            className={library_styles.searchbar}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div>
            {filteredExamples.map((song) => (
              <SongItem
                like_count={song.like_count}
                song_name={extractTitleFromFilepath(song.filepath)}
              />
            ))}
          </div>
        </div>
        <Box
          sx={{
            width: 800,
            height: 250,
            backgroundColor: "#211F1F",
            borderRadius: 1,
          }}
        >
          <Typography sx={{ fontSize: "30px", color: "white" }}>
            Your Top 3 Songs
            <Grid container spacing={2}>
              {songCards}
            </Grid>
          </Typography>
        </Box>
      </div>
      <div className={library_styles.playlist_box}>
        <Box
          sx={{
            width: 800,
            height: 250,
            backgroundColor: "#211F1F",
            borderRadius: 1,
          }}
        >
          <Typography sx={{ fontSize: "30px", color: "white" }}>
            Your Playlists
            <Grid container spacing={2}>
              {songCards}
            </Grid>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Library;
