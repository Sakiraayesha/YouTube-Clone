import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios"
import app from "../firebase"

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000a7;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
`;
const Wrapper = styled.div`
    width: 600px;
    height: 600px;
    background-color: ${({theme}) => theme.bgLighter};
    color: ${({theme}) => theme.text};
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
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
const Label = styled.label`
    font-size: 14px;
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
    margin: auto;
`;

export const Upload = ({setOpen}) => {
  const [image, setImage] = useState(undefined)
  const [video, setVideo] = useState(undefined)
  const [imgPercentage, setImgPercentage] = useState(0)
  const [vidPercentage, setVidPercentage] = useState(0)
  const [inputs, setInputs] = useState({})
  const [tags, setTags] = useState([])
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
        return {...prev, [e.target.name] : e.target.value}
    })
  }

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            urlType === "imgUrl" ? setImgPercentage(Math.round(progress)) : setVidPercentage(Math.round(progress)) 
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            console.log(error)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setInputs((prev) => {
                    return {...prev, [urlType] : downloadURL}
                })
            });
        }
    );
  }

  useEffect(() => {
    video && uploadFile(video, "videoUrl")
  },[video])

  useEffect(() => {
    image && uploadFile(image, "imgUrl")
  },[image])

  const handleUpload = async (e) => {
    e.preventDefault()
    const res = await axios.post("/videos", {...inputs, tags})
    setOpen(false)
    res.status === 200 && navigate(`/video/${res.data._id}`)
    }

  return (
    <Container>
        <Wrapper>
            <Header>
                <Title>Upload Video</Title>
                <Close onClick={() => setOpen(false)}>X</Close>
            </Header>
            <Label>Video:</Label>
            {vidPercentage > 0 ? "Uploading: " + vidPercentage + "%"
            : (
                <Input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} placeholder="Upload Video"/>
            )}
            <Input type="text" placeholder="Title" name="title" onChange={handleChange}/>
            <Desc rows={8} placeholder="Description" name="desc" onChange={handleChange}/>
            <Input type="text" placeholder="Separate the tags with commas." name="tags"  onChange={handleTags}/>
            <Label>Thumbnail:</Label>
            {imgPercentage > 0 ? "Uploading: " + imgPercentage + "%"
            : (
                <Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
            )}
            <Button onClick={handleUpload}>UPLOAD</Button>
        </Wrapper>
    </Container>
  )
}
