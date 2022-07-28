import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Video } from "./pages/Video";
import { SignIn } from "./pages/SignIn";
import { Search } from "./pages/Search";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Main = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  // flex: 8;
  width: calc(100% - 244px);
  padding: 22px;
  background-color: ${({theme}) => theme.bg};
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const currentUser = useSelector((state) => state.user.currentUser)

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Navbar/>
          <Main>
            <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trending" element={<Home type="trending" />} />
                  <Route path="subscriptions" element={<Home type="subscriptions" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="signin" element={!currentUser ? <SignIn/> : <Home/>} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
 