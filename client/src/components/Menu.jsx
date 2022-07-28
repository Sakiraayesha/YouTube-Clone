import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useDispatch, useSelector } from "react-redux";
import { logOut } from '../redux/userSlice';

const Container = styled.div`
    // flex: 1.5;
    width: 200px;
    background-color: ${({theme}) => theme.bgLighter};
    color: ${({theme}) => theme.text};
    font-size: 14px;
    position: sticky;
    overflow-y: scroll;
    top: 56px;
    height: calc(100vh - 56px);

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
const Wrapper = styled.div`
    padding: 18px 26px;
`;
const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 7.5px 0;

    &:hover{
        background-color: ${({theme}) => theme.soft};;
    }
`;
const Hr = styled.hr`
    margin: 15px 0;
    border: 0.5px solid ${({theme}) => theme.soft};
`;
const Login = styled.div``;
const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`;
const Title = styled.h2`
    font-size: 14px;
    font-weight: 500;
    color: #aaaaaa;
    margin-bottom: 20px;
`;

const Menu = ({darkMode, setDarkMode}) => {
    const currentUser = useSelector((state) => state.user.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logOut())
        navigate("/")
    }

    return(
        <Container>
            <Wrapper>
                <Link to ="/" style={{textDecoration:"none", color: "inherit"}}>
                    <Item>
                        <HomeIcon/>
                        Home
                    </Item>
                </Link>
                <Link to ="trending" style={{textDecoration:"none", color: "inherit"}}>
                    <Item>
                        <ExploreOutlinedIcon/>
                        Explore
                    </Item>
                </Link>
                <Link to ="subscriptions" style={{textDecoration:"none", color: "inherit"}}>
                    <Item>
                        <SubscriptionsOutlinedIcon/>
                        Subscriptions
                    </Item>
                </Link>
                <Hr/>
                <Item>
                    <VideoLibraryOutlinedIcon/>
                    Library
                </Item>
                <Item>
                    <HistoryOutlinedIcon/>
                    History
                </Item>
                <Hr/>
                {!currentUser &&
                    (
                        <>
                        <Login>
                            Sign in to like videos, comment and subscribe.
                            <Link to="/signin" style={{textDecoration:"none"}}>
                                <Button><AccountCircleOutlinedIcon/>SIGN IN</Button>
                            </Link>
                        </Login>
                        <Hr/>
                        </>
                    )
                }
                <Title>BEST OF CLONETUBE</Title>
                <Item>
                    <LibraryMusicOutlinedIcon/>
                    Music
                </Item>
                <Item>
                    <SportsBasketballOutlinedIcon/>
                    Sports
                </Item>
                <Item>
                    <SportsEsportsOutlinedIcon/>
                    Gaming
                </Item>
                <Item>
                    <MovieCreationOutlinedIcon/>
                    Movies
                </Item>
                <Item>
                    <ArticleOutlinedIcon/>
                    News
                </Item>
                <Item>
                    <LiveTvOutlinedIcon/>
                    Live
                </Item>
                <Hr/>
                <Item>
                    <SettingsOutlinedIcon/>
                    Settings
                </Item>
                <Item>
                    <OutlinedFlagIcon/>
                    Report
                </Item>
                <Item>
                    <HelpOutlineOutlinedIcon/>
                    Help
                </Item>
                <Item onClick={() => setDarkMode(!darkMode)}>
                    <SettingsBrightnessOutlinedIcon/>
                    {darkMode ? "Light" : "Dark"} Mode
                </Item>
                {currentUser &&
                    (
                        <Item onClick={handleLogout}>
                            <LogoutOutlinedIcon/>
                            Log Out
                        </Item>
                    )
                }
            </Wrapper>
        </Container>
    ) 
}

export default Menu;