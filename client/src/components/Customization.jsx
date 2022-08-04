import React, {useState, useEffect} from 'react'
import styled, { isStyledComponent } from 'styled-components'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase"
import CircularProgress from '@mui/material/CircularProgress';
import { updateStart, updateSuccess, updateFail } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 25px 35px;
`;
const Title = styled.h2`
  color: ${({theme}) => theme.text};
  font-weight: 400;
  font-size: 22px;
`;
const Header = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({theme}) => theme.navBorder};
`;
const Options = styled.div`
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 50px;
  cursor: pointer;
`;
const Option = styled.div`
  border-bottom: 3px solid ${(props) => props.active === true ? "#30A5E8" : "transparent"};
  color: ${(props) => props.active === true ? "#30A5E8" : ({theme}) => theme.textSoft};
  padding-bottom: 15px;
`;
const Actions = styled.div`
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  position: absolute;
  right: 35px;
  margin-bottom: 25px;
`;
const ViewChannel = styled.div`
  color: #30A5E8;
`;
const Cancel = styled.div`
  color: #30A5E8;
`;
const Publish = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 15px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  background-color: #30A5E8;
  color: #071A25;
`;
const Content = styled.div`

`;
const BrandingContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 700px;
`;
const BrandingTitle = styled.div`
  color: ${({theme}) => theme.text};
  font-size: 15px;
  font-weight: 500;
`;
const Branding = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 30px;
  margin-bottom: 15px;
`;
const Left = styled.div`
`;
const BrandImgWrapper = styled.div`
  width: 290px;
  height: 160px;
  background-color: ${({theme}) => theme.bgLighter};
`;
const BrandImg = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #999;
  margin: auto;
  display: block;
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`;
const BrandBanner = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #999;
`;
const Input = styled.input`
  display: none;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const RightText = styled.div`
  color: ${({theme}) => theme.textSoft};
  font-size: 12px;
  line-height: 1.8;

`;
const UploadText = styled.label`
  color: #30A5E8;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
const RemoveChange = styled.div`
  color: #30A5E8;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
const RemoveText = styled.div`
  color: #30A5E8;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
const BasicContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 750px;
  padding-top: 5px;
`;
const BasicInput = styled.input`
  border: 1px solid ${({theme}) => theme.soft};
  color: ${({theme}) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  margin: 15px 0 25px;
  font-size: 14px;
`;
const BasicDesc = styled.textarea`
  border: 1px solid ${({theme}) => theme.soft};
  color: ${({theme}) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  font-size: 14px;
  line-height: 1.8;
`;

export const Customization = () => {
  const [barndActive, setBrandActive] = useState(true)
  const [basicActive, setBasicActive] = useState(false)
  const currentUser = useSelector((state) => state.user.currentUser)
  const [img, setImg] = useState(null);
  const [banner, setBanner] = useState(null);
  const [inputs, setInputs] = useState(null);
  const navigate = useNavigate()
  const [imgUploaded, setImgUploaded] = useState(false);
  const [bannerUploaded, setBannerUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    setInputs(currentUser); 
  },[currentUser]);

  const handleSection = (section) => {
    if(section === "brand"){
        setBrandActive(true) 
        setBasicActive(false)
    }
    else{
        setBasicActive(true)
        setBrandActive(false)
    }
  }

  const uploadFile = (file, type) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress)
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
                    return {...prev, [type] : downloadURL}
                })
                type == "image" ? setImgUploaded(true) : setBannerUploaded(true)
            });
        }
    );
  }

  const handleChange = (e) => {
    setInputs((prev) => {
      return {...prev, [e.target.name] : e.target.value}
    })
  }

  const handleClick = async (e) => {
    e.preventDefault()
    setLoading(true)
    img ? uploadFile(img, "image") : setImgUploaded(true)
    banner ? uploadFile(banner, "banner") : setBannerUploaded(true)
  }

  useEffect(() => {
    if(imgUploaded && bannerUploaded){
      const updateUser = async () => {
        dispatch(updateStart())
        try{
          const res = await axios.put(`/users/${currentUser._id}`, {...inputs})
          dispatch(updateSuccess(res.data))
          res.status === 200 && navigate(`/channel/${currentUser._id}`)
        }
        catch(err){
          dispatch(updateFail())
          console.log(err)
        }
      }
      updateUser()
    } 
  },[imgUploaded, bannerUploaded]);

  const handleRemove = (type) => {
    type === "img" ? setImg(null) : setBanner(null)
  }

  const resetFields = () => {
    img && setImg(null)
    banner && setBanner(null)
    if(document.getElementById("name") != null)
    {
      document.getElementById("name").value = document.getElementById("name").defaultValue
      document.getElementById("desc").value = document.getElementById("desc").defaultValue
    } 
  }

  return (
    <Container>
      <Title>Channel customization</Title>
      <Header>
        <Options>
          <Option active={barndActive} onClick={() => handleSection("brand")}>Branding</Option>
          <Option active={basicActive} onClick={() => handleSection("basic")}>Basic info</Option>
        </Options>
        <Actions>
          <Link to={`/channel/${currentUser._id}`} style={{textDecoration:"none"}}>
            <ViewChannel>VIEW CHANNEL</ViewChannel>
          </Link>
          <Cancel onClick={() => resetFields()}>CANCEL</Cancel>
          {!loading 
          ? (
            <Publish type="submit" onClick={handleClick}>
              PUBLISH
            </Publish>
           )
          : (<CircularProgress style={{fontSize: "small", color: "grey", width:"20px" , height:"20px"}}/>)
          }
          
        </Actions>
      </Header>
      <Content id="content">
        {barndActive && (
          <BrandingContent>
            <BrandingTitle>Picture</BrandingTitle>
            <Branding>
              <Left>
                <BrandImgWrapper>
                  <BrandImg src={img ? URL.createObjectURL(img) : inputs?.image}/>
                </BrandImgWrapper>
                <Input id="uploadImg" type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} onClick={(e) => e.target.value = null}/>
              </Left>
              <Right>
                <RightText>
                  Your profile picture will appear where your channel is presented on CloneTube, like next to your videos and comments. It’s recommended to use a picture that’s at least 98 x 98 pixels and 4MB or less. Use a PNG or GIF (no animations) file. Make sure your picture follows the Community Guidelines.
                </RightText>
                {!img 
                ?  <UploadText htmlFor='uploadImg'>
                    UPLOAD
                  </UploadText>
                : <RemoveChange onClick={() => handleRemove("img")}>REMOVE</RemoveChange>  
                }
              </Right>
            </Branding>
            <BrandingTitle>Banner image</BrandingTitle>
            <Branding>
              <Left>
                <BrandImgWrapper>
                  <BrandBanner src={banner ? URL.createObjectURL(banner) : inputs?.banner}/>
                </BrandImgWrapper>
                <Input id="uploadBanner" type="file" accept="image/*" onChange={(e) => setBanner(e.target.files[0])} onClick={(e) => e.target.value = null}/>
              </Left>
              <Right>
                <RightText>
                  This image will appear across the top of your channel. For the best results on all devices, use an image that’s at least 2048 x 1152 pixels and 6MB or less.
                </RightText>
                {!banner 
                ? <UploadText htmlFor='uploadBanner'>
                    UPLOAD
                  </UploadText>
                : <RemoveChange onClick={() => handleRemove("banner")}>REMOVE</RemoveChange>  
                }
              </Right>
            </Branding>
          </BrandingContent>
        )}
        {basicActive && (
          <BasicContent>
            <BrandingTitle>Channel name and description</BrandingTitle>
            <RightText>
              Choose a channel name that represents you and your content.
            </RightText>
            <BasicInput id="name" type="text" name="name" defaultValue={currentUser.name} onChange={handleChange}/>
            <BasicDesc id="desc" rows={8} name="desc" defaultValue={currentUser.desc} 
            placeholder="Tell viewers about your channel. Your description will appear in the About section of your channel and search results, among other places." 
              onChange={handleChange}/>
          </BasicContent>
        )}
      </Content>
    </Container>
  )
}
