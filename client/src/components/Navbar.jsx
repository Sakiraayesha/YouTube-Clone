import styled from "styled-components";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from "react-router-dom";
import YoutubeLogo from "../img/logo.png"
import { useSelector } from "react-redux";
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { useState } from "react";
import { Upload } from "./Upload";

const Container = styled.div`
    position: sticky;
    top: 0;
    background-color: ${({theme}) => theme.bgLighter};
    height: 56px;
`;
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    padding: 0 20px;
    position: relative;
    border-bottom: 1px solid ${({theme}) => theme.navBorder};
`;
const LogoWrapper = styled.div`
   margin-right: auto;
`;
const Logo = styled.h3`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    color: ${({theme}) => theme.text};
`;
const Img = styled.img`
    height: 25px;
`;
const Search = styled.div`
    width: 40%;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    color: ${({theme}) => theme.text}
`;
const Input = styled.input`
    border: none;
    background-color: transparent;
    outline: none;
    width: calc(100% - 34px);
    color: ${({theme}) => theme.text}
`;
const User = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    color: ${({theme}) => theme.text};
`;
const Avatar = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #999;
    object-fit: cover;
`;
const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const Navbar = () => {
    const currentUser = useSelector((state) => state.user.currentUser)
    const [searchQuery, setSearchQuery] = useState("")
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    return(
        <>
            <Container>
                <Wrapper>
                    <LogoWrapper>
                        <Link to="/" style={{textDecoration:"none"}}>
                            <Logo>
                                <Img src={YoutubeLogo}/>
                                CloneTube
                            </Logo>
                        </Link>
                    </LogoWrapper>
                    <Search>
                        <Input placeholder="Search"
                            onChange={(e)=>setSearchQuery(e.target.value)} />
                        <SearchOutlinedIcon onClick={()=>navigate(`/search?search=${searchQuery}`)}/>
                    </Search>
                    {currentUser ? 
                    (
                        <User>
                            <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
                            <Avatar src={currentUser.image}/>
                            {currentUser.name}
                        </User>
                    )
                    : 
                    (
                        <Link to="/signin" style={{textDecoration:"none"}}>
                            <Button><AccountCircleOutlinedIcon/>SIGN IN</Button>
                        </Link>
                    ) 
                    }
                </Wrapper>
            </Container>
            {open && <Upload setOpen={setOpen} />}
        </>
        
    )
}

export default Navbar;