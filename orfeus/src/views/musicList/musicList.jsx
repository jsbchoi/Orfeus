import music_styles from "./musicList.module.css";
import React, { useState, useEffect } from "react"
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const baseURL = "http://127.0.0.1:4000/"

function MusicList() {
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  const [uploadedSongs, setUploadedSongs] = useState([]);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  console.log(role)
  console.log(isLoading)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL + '/uploaded_songs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUploadedSongs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching uploaded Songs', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!token) {
      navigate('/Login');
    } else {
      const decodedToken = jwt_decode(token);
      setRole(decodedToken['role']);
      fetchData().catch(error => console.error(error));
    }
  }, [navigate, token]);
  return (
    <body className={music_styles.profile_body}>
      <section className={music_styles.music_class}>
        <h1 className={music_styles.music_h1}>List of your music</h1>
        <div className={music_styles.music_list}>
          <ul>
            <li>List of Music</li>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Uploaded date</th>
                </tr>
              </thead>
              <tbody></tbody>
              <tbody>
                {uploadedSongs.map(song => (
                  <tr key={song.id}>
                    <td>{song.id}</td>
                    <td>{song.title}</td>
                    <td>{song.uploaded_date}</td>
                    {/* <td>
                    <button onClick={() => handleDeleteUser(user.id, token)}>Delete</button>
                  </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </ul>
        </div>
      </section>
    </body>
  );
};

export default MusicList;


