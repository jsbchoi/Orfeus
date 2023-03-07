import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = "http://127.0.0.1:5000/";

const SongList = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);

  function fetchData() {
    return axios
      .get(baseURL + "getFile", {})
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
  return (
    <body>
      <section>
        <h1>Songs</h1>
        <div>
          <table>
            <thead>
              <tr>
                <th>Song Name</th>
                <th>Genre</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={song.id}>
                  <td>{song.title}</td>
                  <td>{song.genre_id}</td>
                  <td>{song.user_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* {selectedsong && (
          <div>
            <h3>song Details</h3>
            <p>ID: {selectedsong.id}</p>
            <p>songname: {selectedsong.songname}</p>
            <p>Email: {selectedsong.email}</p>
            <p>Role: {selectedsong.role}</p>
            <p>Privacy Level: {selectedsong.privacy_level}</p>
            <p>Account Creation Date: {selectedsong.account_creation_date}</p>
          </div>
        )} */}
        </div>
      </section>
    </body>
  );
};

export default SongList;
