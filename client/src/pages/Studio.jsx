import React from 'react'
import styled from 'styled-components'
import DashboardIcon from '@mui/icons-material/Dashboard';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Link } from "react-router-dom"
import { Dashboard } from '../components/Dashboard';
import { Customization } from '../components/Customization';
import { Content } from '../components/Content';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Container = styled.div`
    width: 100%;
    position: absolute;
    top: 56px;
    left: 0;
    bottom: 0;
    background-color: ${({theme}) => theme.bg};
    z-index: 1;
    display: flex;
`;
const StudioMenu = styled.div`
    width: 260px;
    padding: 25px 0px;
    background-color: ${({theme}) => theme.bgLighter};
    border-right: 1px solid ${({theme}) => theme.navBorder};
`;
const StudioChannel = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    margin-top: 10px;
`;
const StudioChannelImgWrapper = styled.div`
    width: 112px;
    height: 112px;
`;
const StudioChannelImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
`;
const StudioChannelTextWrapper = styled.div`
    text-align: center
`;
const StudioChannelText = styled.div`
    width: 100%;
    color: ${({theme}) => theme.text};
    font-size: 14px;
    margin-bottom: 3px;
`;
const StudioChannelName = styled.span`
    width: 100%;
    color: ${({theme}) => theme.textSoft};
    font-size: 12px;
    font-weight: 400;
`;
const StudioMenuItem = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
    cursor: pointer;
    padding: 12px 26px;
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.active === false ? ({theme}) => theme.textSoft : "#cc1a00"};
    background-color: ${(props) => props.active === true ? ({theme}) => theme.bg : "transparent"};

    &:hover{
        background-color: ${({theme}) => theme.bg};
    }
`;
const StudioContent = styled.div`
    width: calc(100% - 260px);
    height: 100%;
    float: left;
`;

export const Studio = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const [dashboardActive, setDashboardActive] = useState(true)
  const [contentActive, setContentActive] = useState(false)
  const [cutomizeActive, setCustomizeActive] = useState(false)

  const handleStudioMenu = (section) => {
    if(section === "dashboard"){
        setDashboardActive(true) 
        setContentActive(false)
        setCustomizeActive(false)
    }
    else if(section === "content")
    {
        setContentActive(true)
        setDashboardActive(false)
        setCustomizeActive(false)
    }
    else{
        setCustomizeActive(true)
        setDashboardActive(false)
        setContentActive(false)
    }
  }

  return (
    <Container>
      <StudioMenu>
        <StudioChannel>
          <Link to={`/channel/${currentUser?._id}`} style={{textDecoration: "none"}}>
            <StudioChannelImgWrapper>
              <StudioChannelImg src={currentUser?.image}/>
            </StudioChannelImgWrapper>
          </Link>
          <StudioChannelTextWrapper>
            <StudioChannelText>Your channel</StudioChannelText>
            <StudioChannelName>{currentUser?.name}</StudioChannelName>
          </StudioChannelTextWrapper>
        </StudioChannel> 
        <StudioMenuItem active={dashboardActive} onClick={() => handleStudioMenu("dashboard")}>
          <DashboardIcon />
          Dashboard
        </StudioMenuItem>
        <StudioMenuItem active={contentActive} onClick={() => handleStudioMenu("content")}>
          <VideoLibraryIcon />
          Content
        </StudioMenuItem>
        <StudioMenuItem active={cutomizeActive} onClick={() => handleStudioMenu("customize")}>
          <AutoFixHighIcon />
          Customization
        </StudioMenuItem>
      </StudioMenu>
      <StudioContent>
        {dashboardActive && <Dashboard/> }
        {contentActive && <Content/> }
        {cutomizeActive && <Customization/> }
      </StudioContent>
    </Container>
  )
}
