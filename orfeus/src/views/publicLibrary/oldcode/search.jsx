// Search Bar Code: https://www.emgoto.com/react-search-bar/

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import search_styles from "./Search.module.css";

const data = ["22", "Party Rock", "Whistle", "Lazy Song", "Boom"];

const SearchBar = ({ setSearchQuery }) => (
  <form className={search_styles.search_form}>
    <TextField
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Enter a song name"
      variant="outlined"
      placeholder="Search for a song"
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form>
);

const filterData = (query, data) => {
  if (!query) {
    return data;
  } else {
    return data.filter((d) => d.toLowerCase().includes(query));
  }
};

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const dataFiltered = filterData(searchQuery, data);

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div style={{ padding: 3 }}>
        {dataFiltered.map((d) => (
          <div className="text" key={d.id}>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}
