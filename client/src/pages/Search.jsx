import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import { Card } from "../components/Card"

const Container = styled.div`
    padding: 22px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

export const Search = () => {
  const [videos, setVideos] = useState([])
  const searchQuery = useLocation().search

  useEffect(() => {
    const searchVideos = async () => {
        try{
            const res = await axios.get(`/videos/search${searchQuery}`)
            setVideos(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    searchVideos()
  },[searchQuery])

  return (
    <Container>
        {videos.map((video) => (
            <Card key={video._id} video={video}/>
        ))}
    </Container>
  )
}
