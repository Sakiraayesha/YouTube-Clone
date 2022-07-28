import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Card } from '../components/Card'
import axios from "axios"

const Container = styled.div`
    // display: flex;
    // justify-content: space-between;
    // flex-wrap: wrap;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

export const Home = ({type}) => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const getVideos = async () => {
      const res = await axios.get(`/videos/${type}`)
      setVideos(res.data)
    }
    getVideos()
  },[type])

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  )
}
