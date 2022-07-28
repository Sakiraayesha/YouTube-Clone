import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { format } from "timeago.js"

const Container = styled.div`
    max-width: ${(props) => props.type !== "sm" && "360px"};
    margin: ${(props) => props.type !== "sm" && "0 auto 45px"};
    margin-bottom: ${(props) => props.type === "sm" && "15px"};
    cursor: pointer;
    display: ${(props) => props.type === "sm" && "flex"};
    gap: 10px;
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
    width: 100%;
    height: ${(props) => props.type === "sm" ? "110px" : "202px"};
    background-color: #999;
`;
const Details = styled.div`
    display: flex;
    margin-top: ${(props) => props.type !== "sm" && "16px"};
    gap: 12px;
    flex: 1;
`;
const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
    object-fit: cover;
    display: ${(props) => props.type === "sm" && "none"};
`;
const Texts = styled.div``;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({theme}) => theme.textSoft};
  margin: 9px 0;
`;
const Info = styled.div`
    font-size: 14px;
    color: ${({theme}) => theme.textSoft};
`;

export const Card = ({type, video}) => {
  const [channel, setChannel] = useState({})

  useEffect(() => {
    const getChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`)
      setChannel(res.data)
    }
    getChannel()
  },[video.userId])

  return (
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
        <Container type={type}>
            <ImageContainer>
              <Image type={type} src={video.imgUrl}/>
            </ImageContainer>
            <Details type={type}>
                <ChannelImage type={type} src={channel.image}/>
                <Texts>
                    <Title>{video.title}</Title>
                    <ChannelName>{channel.name}</ChannelName>
                    <Info>{video.views} views &bull; {format(video.createdAt)}</Info>
                </Texts>
            </Details>
        </Container>
    </Link>
  )
}
