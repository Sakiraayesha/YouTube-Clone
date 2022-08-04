import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 25px;
    height: calc(100% - 50px);
`;
const DashboardTitle = styled.h2`
    color: ${({theme}) => theme.text};
    font-weight: 400;
    font-size: 22px;
`;
const DashboardWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
`;
const Widget = styled.div`
    flex: 1;
    padding: 20px;
    border: 1px solid ${({theme}) => theme.navBorder};
    border-radius: 5px;
    max-width: 33%;
    background-color: ${({theme}) => theme.bgLighter};
`;
const WidgetTitle = styled.h3`
    color: ${({theme}) => theme.text};
    font-weight: 400;
    margin-bottom: 20px;
`;
const WidgetWrapper = styled.div``;
const UploadVideoWrapper = styled.div`
    margin-bottom: 20px;
`;
const UploadVideoFrame = styled.video`
    width: 100%;
    height: 150px;
    background-color: #999;
`;
const UploadTexts = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;
const UploadTextTitle = styled.div`
    color: ${({theme}) => theme.text};
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;
const UploadText = styled.div`
    display: flex;
    align-items: center;
    color: ${({theme}) => theme.textSoft};
    font-size: 14px;
`;
const UploadTextLeft = styled.div``;
const UploadTextRight = styled.div`
    margin-left: auto;
    margin-right: 10px;
`;
const SubscribedChannel = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 15px;
    padding: 20px 0 0;
`;
const SubChannelImgWrapper = styled.div`
    width: 120px;
    height: 120px;
`;
const SubsChannelImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
`;
const SubChannelDetails = styled.div`
`;
const SubsChannelName = styled.h3`
    width: 100%;
    color: ${({theme}) => theme.text};
    font-weight: 500;
    margin-bottom: 3px;
`;
const SubsChannelInfo = styled.span`
    width: 100%;
    color: ${({theme}) => theme.textSoft};
    font-size: 12px;
    font-weight: 400;
`;
const AnalyticsTop = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;
const AnalyticsTopTitle = styled.div`
    color: ${({theme}) => theme.textSoft};
    font-size: 14px;
    font-weight: 500;
`;
const AnalyticsTopText = styled.h3`
    color: ${({theme}) => theme.text};
`;
const Analytics = styled.div`
`;
const AnalyticsLeft = styled.span`
    color: ${(props) => props.up? "green" : "red"};
    font-size: 13px;
    margin-right: 5px;
`;
const AnalyticsRight = styled.span`
    color: ${({theme}) => theme.textSoft};
    font-size: 12px;
`;
const Hr = styled.hr`
    margin: 25px 0;
    border: 0.5px solid ${({theme}) => theme.soft};
`;
const AnalyticsBottom = styled.div``;
const AnalyticsBottomTitle = styled.div`
    color: ${({theme}) => theme.text};
    font-size: 14px;
    margin-bottom: 20px;
`;
const AnalyticsBottomWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const AnalyticsBottomText = styled.div`
    color: ${({theme}) => theme.textSoft};
    font-size: 13px;
    font-weight: 500;
`;
const DashboardFooter = styled.div`
    display: flex;
    align-items: center;
    gap: 40px;
    margin-top: auto;
`;
const DashboardFooterItem = styled.span`
    color: ${({theme}) => theme.textSoft};
    font-size: 12px;
    cursor: pointer;
`;

export const Dashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser) 
  const [latestVideo, setLatestVideo] = useState({})
  const [commentCount, setCommentCount] = useState(0)
  const [latestSubscription, setLatestSubscription] = useState({})
  const [topVideos, setTopVideos] = useState([])
  const [ currentNumber, setCurrentNumber ] = useState([])
  const [ inc, setInc ] = useState(false)

  useEffect(() => {
    const fetchLatestVideo = async () => {
        try{
            const res = await axios.get(`/videos/latest/${currentUser._id}`)
            setLatestVideo(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    fetchLatestVideo()
  },[currentUser._id])

  useEffect(() => {
    const fetchLatestVideoComment = async () => {
        try{
            const commentRes = await axios.get(`/comments/${latestVideo?._id}`)
            setCommentCount(commentRes.data.length)
        }
        catch(err){
            console.log(err)
        }
    }
    fetchLatestVideoComment()
  },[latestVideo?._id])

  useEffect(() => {
    const LastSubscribedChannel = currentUser.subscribedChannels.at(-1)
    const fetchLatestSubscription = async () => {
        try{
            const res = await axios.get(`/users/find/${LastSubscribedChannel}`)
            setLatestSubscription(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    fetchLatestSubscription()
  },[currentUser.subscribedChannels])

  useEffect(() => {
    const fetchTopVideos = async () => {
        try{
            const res = await axios.get(`/videos/top/${currentUser._id}`)
            setTopVideos(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    fetchTopVideos()
  },[currentUser._id])

  useEffect(() => {
    const getStats = async () => {
        try{
            const res = await axios.get(`/users/stats/${currentUser._id}`)
            setCurrentNumber(res.data)
            res.data > 0 && setInc(true) 
        }
        catch(err){
            console.log(err)
        }
    }
    getStats()
  },[currentUser._id])

  return (
    <Container>
        <DashboardTitle>Channel Dashboard</DashboardTitle>
        <DashboardWrapper>
            <Widget>
                <WidgetTitle>Latest upload</WidgetTitle>
                    <WidgetWrapper>
                        <UploadVideoWrapper>
                            <UploadVideoFrame src={latestVideo?.videoUrl} controls/>
                        </UploadVideoWrapper>
                        <UploadTexts>
                            <UploadTextTitle>{latestVideo?.title}</UploadTextTitle>
                            <UploadText>
                                <UploadTextLeft>Views</UploadTextLeft>
                                <UploadTextRight>{latestVideo?.views}</UploadTextRight>
                            </UploadText>
                            <UploadText>
                                <UploadTextLeft>Likes</UploadTextLeft>
                                <UploadTextRight>{latestVideo?.likes?.length}</UploadTextRight>
                            </UploadText>
                            <UploadText>
                                <UploadTextLeft>Dislikes</UploadTextLeft>
                                <UploadTextRight>{latestVideo?.dislikes?.length}</UploadTextRight>
                            </UploadText>
                            <UploadText>
                                <UploadTextLeft>Comments</UploadTextLeft>
                                <UploadTextRight>{commentCount}</UploadTextRight>
                            </UploadText>
                        </UploadTexts>
                    </WidgetWrapper>
            </Widget>
            <Widget>
                <WidgetTitle>Latest subscription</WidgetTitle>
                <WidgetWrapper>
                    <Link to={`/channel/${latestSubscription?._id}`} style={{textDecoration: "none"}}>
                        <SubscribedChannel>
                            <SubChannelImgWrapper>
                                <SubsChannelImg src={latestSubscription?.image}/>
                            </SubChannelImgWrapper>
                            <SubChannelDetails>
                                <SubsChannelName>{latestSubscription?.name}</SubsChannelName>
                                <SubsChannelInfo>{latestSubscription?.subrcribers} { latestSubscription?.subrcribers > 1 ? "subscribers" : "subscriber"}</SubsChannelInfo>
                            </SubChannelDetails>
                        </SubscribedChannel>
                    </Link> 
                </WidgetWrapper>
            </Widget>
            <Widget>
                <WidgetTitle>Channel analytics</WidgetTitle>
                <WidgetWrapper>
                    <AnalyticsTop>
                        <AnalyticsTopTitle>Current subscribers</AnalyticsTopTitle>
                        <AnalyticsTopText>{currentUser?.subrcribers}</AnalyticsTopText>
                        <Analytics>
                            <AnalyticsLeft up={inc}>{currentNumber > 0 ? "+" : inc < 0 ? "-" : ""}{currentNumber}</AnalyticsLeft>
                            <AnalyticsRight>{currentNumber > 1 ? "videos" : "video"} published in last 30 days</AnalyticsRight> 
                        </Analytics>
                    </AnalyticsTop>
                    <Hr/>
                    <AnalyticsBottom>
                        <AnalyticsBottomTitle>Top videos</AnalyticsBottomTitle>
                        <AnalyticsBottomWrapper>
                            {topVideos.map((video) => (
                                <AnalyticsBottomText key={video._id}>{video.title}</AnalyticsBottomText>
                            ))}
                        </AnalyticsBottomWrapper>
                    </AnalyticsBottom>
                </WidgetWrapper>
            </Widget>
        </DashboardWrapper>
        <DashboardFooter>
            <DashboardFooterItem>Terms of use</DashboardFooterItem>
            <DashboardFooterItem>Privacy policy</DashboardFooterItem>
            <DashboardFooterItem>Policies & Safety</DashboardFooterItem>
        </DashboardFooter>
    </Container>
  )
}
