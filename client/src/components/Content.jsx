import React, { useEffect, useState }  from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import EditIcon from '@mui/icons-material/Edit';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from './Edit';

const Container = styled.div`
    padding: 25px;
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
const ContentTitle = styled.div`
  color: ${({theme}) => theme.text};
  font-weight: 400;
  font-size: 22px;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({theme}) => theme.textSoft};
  overflow-y: scroll;

  &::-webkit-scrollbar{
    width: 8px;
  }
  &::-webkit-scrollbar-track{
      background-color: transparent;
  }
  &::-webkit-scrollbar-thumb{
      border-radius: 5px;
      background-color: transparent;
  }
  &:hover{
      &::-webkit-scrollbar-thumb{
          background-color: #A9A9A9;
      }
  }
`;
const TableHeader = styled.div`
  border-top: 1px solid ${({theme}) => theme.navBorder};
  border-bottom: 1px solid ${({theme}) => theme.navBorder};
  padding: 15px 10px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
`;
const VideoTitle = styled.div`
  min-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 20%;
`;
const VideoDate = styled.div`
  min-width: 80px;
`;
const VideoViews = styled.div`
  min-width: 80px;
`;
const VideoComments = styled.div`
  min-width: 80px;
`;
const VideoLikes = styled.div`
  min-width: 120px;
`;
const VideoAction = styled.div`
  min-width: 120px;
`;
const TableRows = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 400;
`;
const TableRow = styled.div`
  border-bottom: 1px solid ${({theme}) => theme.navBorder};
  padding: 15px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover{
    background-color: ${({theme}) => theme.bgLighter};
  }
`;
const VideoTitleRow = styled.div`
  min-width: 200px;
  max-width: 20%;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const VideoThumbnail = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  background-color: #999;
`;
const VideoTitleText = styled.div`
  max-width: calc(100% - 40px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const VideoLikesRow = styled.div`
  min-width: 120px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const VideoActionRow = styled.div`
  min-width: 120px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Content = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const [videos, setVideos] = useState([])
  const [comments, setComments] = useState({})
  const [videoCounter, setVideoCounter] = useState(0)
  const [EditOpen, setEditOpen] = useState(false)
  const [editVideo, setEditVideo] = useState({})


  useEffect(() => {
    const fetchData = async () => {
        try {
            const videosRes = await axios.get(`/videos/channel/${currentUser._id}`)
            setVideos(videosRes.data)
            setVideoCounter(videosRes.data.length)
        }
        catch(err){
            console.log(err)
        }
    }
    fetchData()
  },[currentUser._id, videoCounter])

  useEffect(() => {
    const fetchComments = () => {
        try {
            videos.map(async (video) => {
              const commentRes = await axios.get(`/comments/${video._id}`)
              setComments((prev) => {
                return {...prev, [video._id] : commentRes.data.length}
              })
            })
        }
        catch(err){
            console.log(err)
        }
    }
    fetchComments()
  },[videos])
  
  const handleDelete = (id) => {
    const deleteVideo = async () => {
      try {
          await axios.delete(`/videos/${id}`)
          setVideoCounter(videoCounter - 1)
      }
      catch(err){
          console.log(err)
      }
    }
    deleteVideo()
  }

  const handleEdit = (video) => {
    setEditOpen(true)
    setEditVideo(video)
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <>
      <Container>
        <ContentTitle>
          Channel content
        </ContentTitle>
        <ContentWrapper>
          <TableHeader>
            <VideoTitle>Video</VideoTitle>
            <VideoDate>Date</VideoDate>
            <VideoViews>Views</VideoViews>
            <VideoComments>Comments</VideoComments>
            <VideoLikes>Likes(vs. dislikes)</VideoLikes>
            <VideoAction>Actions</VideoAction>
          </TableHeader>
          <TableRows>
            {videos && comments && videos.map((video) => (
              <TableRow key={video._id}>
                <VideoTitleRow>
                  <VideoThumbnail src={video.imgUrl}/>
                  <VideoTitleText>{video.title}</VideoTitleText>
                </VideoTitleRow>
                <VideoDate>{formatDate(video.createdAt)}</VideoDate>
                <VideoViews>{video.views}</VideoViews>
                <VideoComments>{comments[video._id]}</VideoComments>
                <VideoLikesRow>
                  <ThumbUpIcon fontSize="small"/>
                  {video.likes.length} 
                  <ThumbDownIcon fontSize="small"/>
                  {video.dislikes.length}
                </VideoLikesRow>
                <VideoActionRow>
                  <EditIcon fontSize="small" cursor="pointer" onClick={() => handleEdit(video)} />
                  <Link to = {`/video/${video._id}`} style={{textDecoration: "none", color: "inherit"}}>
                    <SmartDisplayIcon fontSize="small" cursor="pointer"  />
                  </Link>
                  <DeleteIcon fontSize="small" cursor="pointer" onClick={() => handleDelete(video._id)}/>
                </VideoActionRow>
              </TableRow>
            ))}
          </TableRows>
        </ContentWrapper>
      </Container>
      {EditOpen && <Edit setEditOpen = {setEditOpen} editVideo = {editVideo}/>}
    </>
  )
}
