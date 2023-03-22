import React, { useState, useEffect } from "react";
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import car_styles from "./MuiCarousel.module.css";
const baseURL = "http://127.0.0.1:4000/";


function MuiCarousel()
{
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

    var items = [
        {
            name: "song1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "song2",
            description: "Hello World!"
        }
    ]

    return (
        <Carousel
            NextIcon={<NavigateNextIcon />}
            PrevIcon={<NavigateBeforeIcon />}
            sx={{
                borderRadius: "0"}
            }
        >
            {
               items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper className={car_styles.carousel_item}>
            <Typography>
                {props.item.name}
            </Typography>
            <Typography>
                {props.item.description}
            </Typography>

            <div className={car_styles.chip_container}>
                <Chip
                label="Likes"
                icon={<FavoriteIcon/>}
                />
                <Chip
                label="Comments"
                icon={<ModeCommentIcon/>}
                />
            </div>
           
        </Paper>
    )
}

export default MuiCarousel;