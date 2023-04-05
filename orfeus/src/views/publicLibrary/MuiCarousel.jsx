import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import car_styles from "./MuiCarousel.module.css";
const baseURL = "http://127.0.0.1:4000/";

function extractTitleFromFilepath(filepath) {
  const startIndex = filepath.indexOf("samples\\") + 8; // 8 is the length of "samples/"
  const endIndex = filepath.lastIndexOf(".mp3");
  const title = filepath.substring(startIndex, endIndex);
  return title;
}

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

function MuiCarousel() {
  const songs = MusicDB();
  const [topSongs, setTopSongs] = useState([]);
  const [hoveredItemId, setHoveredItemId] = useState(null);
  function sortByDate(songs) {
    const sortedArr = songs.sort((a, b) => b.creation_date - a.creation_date);
    const top5Songs = sortedArr.slice(0, 5);
    return top5Songs;
  }
  const sortedByDateSongs = sortByDate(songs);

  useEffect(() => {
    async function fetchTopSongs() {
      const response = await fetch(baseURL + "/carouselfiles");
      const data = await response.json();
      setTopSongs(data);
    }
    fetchTopSongs();
  }, []);

  return (
    <Carousel
      NextIcon={<NavigateNextIcon />}
      PrevIcon={<NavigateBeforeIcon />}
      sx={{
        borderRadius: "0",
      }}
    >
      {sortedByDateSongs.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper className={car_styles.carousel_item}>
      <Typography> {extractTitleFromFilepath(props.item.filepath)} </Typography>
      <Typography></Typography>

      <div className={car_styles.chip_container}>
        <Chip label="Likes" icon={<FavoriteIcon />} />
        <Chip label="Comments" icon={<ModeCommentIcon />} />
      </div>
    </Paper>
  );
}

export default MuiCarousel;
