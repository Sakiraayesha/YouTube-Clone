import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: -56px;
    left: 0;
    background-color: #000000a7;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
`;
const Wrapper = styled.div`
    background-color: ${({theme}) => theme.bgLighter};
    color: ${({theme}) => theme.text};
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
`;
const Header = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${({theme}) => theme.navBorder};
    padding-bottom: 15px;
`;
const Title = styled.h2`
    font-size: 22px;
`;
const Close = styled.div`
    margin-left: auto;
    cursor: pointer
`;
const EditDetails = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    border-bottom: 1px solid ${({theme}) => theme.navBorder};
    padding-bottom: 10px;
`;
const VideoImageWrapper = styled.div`
    width: 300px;
    margin-top: 35px;
`;
const VideoFrame = styled.video`
   width: 100%;
   height: 170px;
   object-fit: contain;
   background-color: #999;
   border-top-right-radius: 5px;
   border-top-left-radius: 5px;
`;
const VideoLinkWrapper = styled.div`
   background-color: ${({theme}) => theme.bg};
   display: flex;
   flex-direction: column;
   padding: 20px 15px;
   gap: 10px;
   border-bottom-right-radius: 5px;
   border-bottom-left-radius: 5px;
`;
const VideoLinkText = styled.span`
    color: ${({theme}) => theme.textSoft};
    font-size: 12px;
`;
const VideoLink = styled.a`
    font-size: 14px;
    color: #2997D6;
`;
const EditInputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    width: 500px;
`;
const EditInputsTitle = styled.h2`
    font-size: 20px;
`;
const Input = styled.input`
    border: 1px solid ${({theme}) => theme.soft};
    color: ${({theme}) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
    z-index: 999
`;
const Desc = styled.textarea`
    border: 1px solid ${({theme}) => theme.soft};
    color: ${({theme}) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`;
const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    width: 100px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    background-color: #30A5E8;
    color: #071A25;
    margin: 10px auto 5px;
`;

export const Edit = ({setEditOpen, editVideo}) => {
    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        setInputs(editVideo); 
    },[editVideo])

    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name] : e.target.value}
        })
      }
    
    const handleTags = (e) => {
        setInputs((prev) => {
            return {...prev, "tags" : e.target.value.split(",")}
        })
    }
      
    const handleEdit = async (e) => {
        e.preventDefault()
        const res = await axios.put(`/videos/${editVideo._id}`, {...inputs})
        setEditOpen(false)
        res.status === 200 && navigate(`/video/${res.data._id}`)
    } 

    return (
        <Container>
            <Wrapper>
                <Header>
                    <Title>Edit Video</Title>
                    <Close onClick={() => setEditOpen(false)}>X</Close>
                </Header>
                <EditDetails>
                    <EditInputs>
                        <EditInputsTitle>Details</EditInputsTitle>
                        <Input type="text" defaultValue={editVideo.title} name="title" placeholder="Title" onChange={handleChange}/>
                        <Desc rows={8} defaultValue={editVideo.desc} name="desc" placeholder="Description" onChange={handleChange}/>
                        <Input type="text" defaultValue={editVideo.tags} name="tags" placeholder= "Separate the tags with commas." onChange={handleTags}/>
                    </EditInputs>
                    <VideoImageWrapper>
                        <VideoFrame src={editVideo.videoUrl} controls/>
                        <VideoLinkWrapper>
                            <VideoLinkText>Video link</VideoLinkText>
                            <VideoLink href={`/video/${editVideo._id}`}>{`/video/${editVideo._id}`}</VideoLink>
                        </VideoLinkWrapper>
                    </VideoImageWrapper>
                </EditDetails>
                <Button onClick={handleEdit}>SAVE</Button>
            </Wrapper>
        </Container>
    )
}
