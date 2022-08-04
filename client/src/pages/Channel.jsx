import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { Card } from "../components/Card"
import OutlinedFlagSharpIcon from '@mui/icons-material/OutlinedFlagSharp';
import { subscription } from '../redux/userSlice'

const Container = styled.div`
`;
const Top = styled.div`
    width: 100%;
    height: calc(13.5vw);
`;
const Banner = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const Mid = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${({theme}) => theme.bgLighter};
    padding: 20px 40px 0px;
`;
const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;
const ChannelInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;
const ChannelImgWrapper = styled.div`
    width: 80px;
    height: 80px;
`;
const ChannelImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
`;
const ChannelTextWrapper = styled.div``;
const ChannelName = styled.h2`
    color: ${({theme}) => theme.text};
    font-weight: 400;
`;
const ChannelSubscribers = styled.span`
    color: ${({theme}) => theme.textSoft};
    font-size: 14px;
`;
const CustomizeButton = styled.button`
    margin-left: auto;
    background-color: #30A5E8;
    color: #071A25;
    font-weight: 500;
    font-size: 15px;
    border: none;
    border-radius: 3px;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;
`;
const SubscribeButton = styled.button`
    margin-left: auto;
    background-color: ${(props) => props.subscribed ? ({theme}) => theme.navBorder : "#cc1a00"};
    color: ${(props) => props.subscribed ? ({theme}) => theme.textSoft : "#ffffff"};
    font-weight: 500;
    font-size: 15px;
    border: none;
    border-radius: 3px;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;
`;
const Sections = styled.div`
    width: 100%;
`;
const Section = styled.div`
    float: left;
    color: ${(props) => props.active === true ? ({theme}) => theme.text : ({theme}) => theme.textSoft};
    text-align: center;
    padding: 14px 16px;
    margin-right: 15px;
    font-size: 15px;
    cursor: pointer;
    font-weight: 500;
    border-bottom: 3px solid ${(props) => props.active === true ? ({theme}) => theme.textSoft : "transparent"};

    &:hover {
        color:  ${({theme}) => theme.text};
    }
`;
const Bottom = styled.div``;
const VideoSection = styled.div`
    padding: 22px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;
const SubscriptionSection = styled.div`
    padding: 40px 15px;
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
`;
const SubscribedChannel = styled.div`
    max-width: 200px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 10px;
`;
const SubChannelImgWrapper = styled.div`
    width: 105px;
    height: 105px;
`;
const SubsChannelImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
`;
const SubChannelDetails = styled.div`
`;
const SubsChannelName = styled.div`
    width: 100%;
    color: ${({theme}) => theme.text};
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 3px;
`;
const SubsChannelInfo = styled.span`
    width: 100%;
    color: ${({theme}) => theme.textSoft};
    font-size: 12px;
    font-weight: 400;
`;
const AboutSection = styled.div`
    padding: 40px;
    display: flex;
    align-items: center;
    gap: 30px;
`;
const Description = styled.div`
    flex:2;
`;
const AboutTitle = styled.h4`
    color: ${({theme}) => theme.text};
    font-weight: 400;
    margin-bottom: 20px;
`;
const AboutText = styled.div`
    color: ${({theme}) => theme.text};
    font-size: 14px;
`;
const Stats = styled.div`
    flex:1;
`;
const Hr = styled.hr`
    margin: 15px 0;
    border: 0.5px solid ${({theme}) => theme.soft};
`;

export const Channel = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const path = useLocation().pathname.split("/")[2]
  const [channel, setChannel] = useState({})
  const [videos, setVideos] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [vidActive, setVidActive] = useState(true)
  const [subsActive, setSubsActive] = useState(false)
  const [aboutActive, setAboutActive] = useState(false)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(path === currentUser._id){
        setChannel(currentUser)
    }
    else{
        const fetchChannel = async () => {
            try {
                const res = await axios.get(`/users/find/${path}`)
                setChannel(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchChannel()
    }
  },[path])

  useEffect(() => {
    const fetchData = async () => {
        try {
            const videosRes = await axios.get(`/videos/channel/${path}`)
            setVideos(videosRes.data)

            const subsRes = await axios.get(`/users/subscriptions/${path}`)
            setSubscriptions(subsRes.data)
        }
        catch(err){
            console.log(err)
        }
    }
    fetchData()
  },[path])


  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleSection = (section) => {
    if(section === "vid"){
        setVidActive(true) 
        setSubsActive(false)
        setAboutActive(false)
    }
    else if(section === "subs")
    {
        setSubsActive(true)
        setVidActive(false)
        setAboutActive(false)
    }
    else{
        setAboutActive(true)
        setVidActive(false)
        setSubsActive(false)
    }
  }

  const handleSubscribe = async () => {
    currentUser.subscribedChannels.includes(channel._id) 
    ? await axios.put(`/users/unsubscribe/${channel._id}`)
    : await axios.put(`/users/subscribe/${channel._id}`)

    dispatch(subscription(channel._id))
  }

  return (
    <Container>
        {channel?.banner &&  (
            <Top>
                <Banner src={channel?.banner} />
            </Top>
        )}
        <Mid>
            <Header>
                <ChannelInfo>
                    <ChannelImgWrapper>
                        <ChannelImg src={channel?.image}/>
                    </ChannelImgWrapper>
                    <ChannelTextWrapper>
                        <ChannelName>{channel?.name}</ChannelName>
                        <ChannelSubscribers>{channel?.subrcribers} {channel?.subrcribers > 1 ? "subscribers" : "subscriber"}</ChannelSubscribers>
                    </ChannelTextWrapper>
                </ChannelInfo>
                {channel._id === currentUser._id 
                    ? (<Link to={`/studio`} style={{textDecoration: "none", marginLeft: "auto"}}><CustomizeButton>CUSTOMIZE CHANNEL</CustomizeButton></Link>)
                    : (<SubscribeButton onClick={handleSubscribe} subscribed={currentUser && currentUser.subscribedChannels?.includes(channel?._id)}>
                        {currentUser && currentUser.subscribedChannels?.includes(channel?._id) ? 
                            "SUBSCRIBED"
                            :
                            "SUBSCRIBE"
                          }
                       </SubscribeButton>)
                }
            </Header>
            <Sections>
                <Section active={vidActive} onClick={() => handleSection("vid")}>VIDEOS</Section>
                <Section active={subsActive} onClick={() => handleSection("subs")}>SUBSCRIPTIONS</Section>
                <Section active={aboutActive} onClick={() => handleSection("about")}>ABOUT</Section>
            </Sections>
        </Mid>
        <Bottom>
            {vidActive && (
                <VideoSection>
                    {videos.map((video) => (
                        <Card key={video._id} video={video}/>
                    ))}
                </VideoSection>
            )}
            {subsActive && (
                <SubscriptionSection>
                    {subscriptions.map((subscription) => (
                        <Link to={`/channel/${subscription?._id}`} key={subscription?._id} style={{textDecoration: "none"}}>
                            <SubscribedChannel>
                                <SubChannelImgWrapper>
                                    <SubsChannelImg src={subscription?.image}/>
                                </SubChannelImgWrapper>
                                <SubChannelDetails>
                                    <SubsChannelName>{subscription?.name}</SubsChannelName>
                                    <SubsChannelInfo>{subscription?.subrcribers} {subscription?.subrcribers > 1 ? "subscribers" : "subscriber"}</SubsChannelInfo>
                                </SubChannelDetails>
                            </SubscribedChannel>
                        </Link> 
                    ))}
                </SubscriptionSection>
            )}
            {aboutActive && (
                <AboutSection>
                    <Description>
                        <AboutTitle>Description</AboutTitle>
                        <AboutText>{channel?.desc ? channel?.desc : "N/A"}</AboutText>
                    </Description>
                    <Stats>
                        <AboutTitle>Stats</AboutTitle>
                        <Hr/>
                        <AboutText>Joined {formatDate(channel?.createdAt)}</AboutText>
                        <Hr/>
                        {channel._id !== currentUser._id &&
                            (<AboutText>
                                <OutlinedFlagSharpIcon style={{cursor: "pointer"}}/>
                            </AboutText>)
                        }
                    </Stats>
                </AboutSection>
            )}
        </Bottom>
    </Container>
  )
}
