import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined'
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined'
import { Comments } from '../components/Comments'
import { Recommendation } from '../components/Recommendation'
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from 'react-router-dom'
import { fetchSuccess, like, dislike, fetchFail } from '../redux/videoSlice'
import { subscription } from '../redux/userSlice'
import axios from "axios"
import { format } from "timeago.js"

const Container = styled.div`
  display: flex;
  gap: 35px;
  padding: 10px;
`;
const Content = styled.div`
  flex:4.5;
`;
const VideoWrapper = styled.div`
`;
const VideoFrame = styled.video`
  max-height: 450px;
  width: 100%;
  object-fit: contain;
`;
const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({theme}) => theme.text};
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.span`
  color: ${({theme}) => theme.textSoft};
`;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({theme}) => theme.text};
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer
`;
const Hr = styled.hr`
    margin: 15px 0;
    border: 0.5px solid ${({theme}) => theme.soft};
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const ImageConatiner = styled.div``;
const ChannelImage = styled.img`
  width: 50px!important;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;
const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({theme}) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  font-size: 12px;
  color: ${({theme}) => theme.textSoft};;
`;
const VideoDesc = styled.p`
  font-size: 14px;
`;
const Subscribe = styled.button`
  background-color: #cc1a00;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

export const Video = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const currentVideo = useSelector((state) => state.video.currentVideo)
  const [ channel, setChannel ] = useState({})
  const dispatch = useDispatch()
  const path = useLocation().pathname.split("/")[2]

  useEffect(() => {
    const getVideo = async () => {
      try{
        const videoData = await axios.get(`/videos/find/${path}`)
        const channelData = await axios.get(`/users/find/${videoData.data.userId}`)
        dispatch(fetchSuccess(videoData.data))
        setChannel(channelData.data)
      }
      catch(err){
        dispatch(fetchFail())
      }
    }
    getVideo()
  },[path, dispatch])

  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`)
    dispatch(like(currentUser._id))
  }

  const handleDislike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id))
  }

  const handleSubscribe = async () => {
    currentUser.subscribedChannels.includes(channel._id) 
    ? await axios.put(`/users/unsubscribe/${channel._id}`)
    : await axios.put(`/users/subscribe/${channel._id}`)

    dispatch(subscription(channel._id))
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame
              src={currentVideo?.videoUrl}
              controls/>
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} views &bull; {format(currentVideo?.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentUser && currentVideo?.likes.includes(currentUser?._id) ? 
              (<ThumbUpIcon />)
              :
              (<ThumbUpOutlinedIcon />)
              } 
              {currentVideo?.likes.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentUser && currentVideo?.dislikes.includes(currentUser?._id) ? 
              (<ThumbDownIcon />)
              :
              (<ThumbDownAltOutlinedIcon />) 
              }
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <PlaylistAddOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr/>
        <Channel>
          <ChannelInfo>
            <ImageConatiner>
              <ChannelImage src={channel?.image}/>
            </ImageConatiner>
            <ChannelDetails>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>{channel?.subrcribers} subscribers</ChannelCounter>
              <VideoDesc>
                {currentVideo?.desc}
              </VideoDesc>
            </ChannelDetails>
          </ChannelInfo>
          <Subscribe onClick={handleSubscribe}>
            {currentUser && currentUser.subscribedChannels?.includes(channel?._id) ? 
              "SUBSCRIBED"
              :
              "SUBSCRIBE"
            }
          </Subscribe>
        </Channel>
        <Hr/>
        <Comments videoId={currentVideo?._id}/>
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  )
}
