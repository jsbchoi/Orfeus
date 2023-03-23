//In the props, we are passing in the song name and the number of likes each song has.
import Typography from "@mui/material/Typography";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import songItem_style from "./SongItem.module.css";
//pass in the song name as an attribute.
const SongItem = (props) => {
  return (
    <div className={songItem_style.total_container}>
      <div className={songItem_style.leftside_container}>
        <IconButton>
          <PlayCircleIcon></PlayCircleIcon>
        </IconButton>
        <div className={songItem_style.likecount_container}>
          <IconButton>
            <FavoriteBorderIcon></FavoriteBorderIcon>
          </IconButton>
          <div className={songItem_style.iconlike_container}>
            <p>{props.like_count}</p>
          </div>
        </div>
      </div>
      <div className={songItem_style.rightside_container}>
        <Typography>{props.song_name}</Typography>
        <IconButton>
          <AddCircleOutlineIcon></AddCircleOutlineIcon>
        </IconButton>
      </div>
    </div>
  );
};

export default SongItem;
