// Search Bar Code: https://www.emgoto.com/react-search-bar/

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import library_styles from './PublicLibrary.module.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const history = useNavigate();
  const onSubmit = (e) => {
    history.push(`?s=${searchQuery}`);
    e.preventDefault();
  };

  return (
    <form
      className={library_styles.searchbar_form}
      action="/"
      method="get"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <label htmlFor="header-search">
        <span className={library_styles.visually_hidden}>
          Search audio files
        </span>
      </label>
      <input
        className={library_styles.searchbar_input}
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
        type="text"
        id="header-search"
        placeholder="Search audio files"
        name="s"
      />
      <Link to="/musicFile">
        <button type="submit">Search</button>
      </Link>
    </form>
  );
};

export default SearchBar;
