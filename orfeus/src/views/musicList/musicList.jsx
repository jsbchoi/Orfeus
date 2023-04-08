import music_styles from './musicList.module.css';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
const baseURL = 'http://127.0.0.1:4000/';

function MusicList() {
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  const [uploadedSongs, setUploadedSongs] = useState([]);
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  console.log(role);
  console.log(isLoading);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL + '/uploaded_songs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      fetchData().catch((error) => console.error(error));
    }
  }, [navigate, token]);
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Title',
      width: 300,
    },
    {
      field: 'uploaded_date',
      headerName: 'Uploaded Date',
      width: 200,
    },
  ];
  return (
    <div className={music_styles.profile_body}>
      <h1 className={music_styles.music_h1}>List of your music</h1>
      <Box
        sx={{
          height: 400,
          width: '100%',
          backgroundColor: 'white',
          outlineColor: 'black',
        }}
      >
        <DataGrid
          rows={uploadedSongs}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection={{ color: 'white' }}
          disableRowSelectionOnClick
          sx={{
            color: 'black',
            outlineColor: 'black',
          }}
        />
      </Box>
    </div>
  );
}

export default MusicList;
