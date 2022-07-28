import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Card } from "./Card"
import { useSelector } from 'react-redux';

const Container = styled.div`
  flex:2;
`;

export const Recommendation = ({tags}) => {
  const [videos, setVideos] = useState([]) 
  const currentVideo = useSelector((state) => state.video.currentVideo)

  useEffect(() => {
    const fetchVideos = async () => {
        try{
            const res = await axios.get(`/videos/tags?tags=${tags}`)
            setVideos(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    fetchVideos()
  },[tags])  

  return (
    <Container>
        {videos.map((video) => (
            (video._id !== currentVideo._id) &&
            <Card key={video._id} type="sm" video={video}/>
        ))}
    </Container>
  )
}
