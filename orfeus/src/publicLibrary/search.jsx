import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const history = useNavigate();
    const onSubmit = (e) => {
        history.push(`?s=${searchQuery}`);
        e.preventDefault();
    };

    return (
        <form
            action="/"
            method="get"
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <label htmlFor="header-search">
                <span className="visually-hidden">
                    Search audio files
                </span>
            </label>
            <input
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}
                type="text"
                id="header-search"
                placeholder="Search audio files"
                name="s"
            />
            <Link to="/musicFile"><button type="submit">Search</button></Link>
        </form>
    );
};

export default SearchBar;