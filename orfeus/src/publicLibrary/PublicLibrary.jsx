import "./publicLibrary.css";
import Search from './search';
import React, { Component, useState} from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

const example = [
    { id: '1', name: 'username1' },
    { id: '2', name: 'audiofile name 394' },
    { id: '3', name: 'username28' },
    { id: '4', name: 'audio file' },
];

const filterPosts = (posts, query) => {
    if (!query) {
        return posts;
    }

    return posts.filter((post) => {
        const postName = post.name.toLowerCase();
        return postName.includes(query);
    });
};

const { search } = window.location;
const query = new URLSearchParams(search).get('s');
const [searchQuery, setSearchQuery] = useState(query || '');    
const filteredPosts = filterPosts(example, searchQuery);

export default class PublicLibrary extends Component{
    
    render(){
        return (
            <Router>
            <form>
                <h2>Library</h2>
                <Search 
                    searchQuery={searchQuery}                
                    setSearchQuery={setSearchQuery}
                />
                <ul>
                    {filteredPosts.map((example) => (                    
                        <li key={example.id}>{example.name}</li>
                    ))}
                </ul>




            </form>
            </Router>
        )
    }
}