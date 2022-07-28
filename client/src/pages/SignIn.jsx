import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { loginFail, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider } from '../firebase';
import  { signInWithPopup } from "firebase/auth"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 56px);
    color: ${({theme}) => theme.text};
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({theme}) => theme.bgLighter};
    border: 1px solid ${({theme}) => theme.soft};
    padding: 20px 50px;
    gap: 10px;    
`;
const Title = styled.h1`
    font-size: 24px;
`;
const SubTitle = styled.h2`
    font-size: 24px;
    font-weight: 300px;
`;
const Input = styled.input`
    border: 1px solid ${({theme}) => theme.soft};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
    width: 100%;
    color: ${({theme}) => theme.text};
`;
const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointr;
    background-color: ${({theme}) => theme.soft};
    color: ${({theme}) => theme.textSoft};
`;
const More = styled.div`
    display: flex;
    margin-top: 10px;
    font-size: 12px;
    color: ${({theme}) => theme.textSoft};
`;
const Links = styled.div`
    margin-left: 50px;
`;
const Link = styled.span`
    margin-left: 30px;
`;

export const SignIn = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignin = async (e) => {
    e.preventDefault()
    dispatch(loginStart())
    try{
        const res = await axios.post("/auth/signin", {name, password})
        dispatch(loginSuccess(res.data))
        navigate("/")
    }
    catch(err)
    {
        dispatch(loginFail())
    }
  }

  const signInWithGoogle = async () => {
    dispatch(loginStart())
    signInWithPopup(auth, provider)
    .then((result) => {
        axios.post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            image: result.user.photoURL
        })
        .then((res)=>{
            dispatch(loginSuccess(res.data))
            navigate("/")
        })
    }).catch((error) => {
        dispatch(loginFail())
    });    
  }

  return (
    <Container>
        <Wrapper>
            <Title>Sign in</Title>
            <SubTitle>to continue to CloneTube</SubTitle>
            <Input type="text" placeholder="Username" onChange={e=>setName(e.target.value)}/>
            <Input type="Password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
            <Button onClick={handleSignin}>Sign in</Button>
            <Title>or</Title>
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            <Title>or</Title>
            <Input type="text" placeholder="Username" onChange={e=>setName(e.target.value)}/>
            <Input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
            <Input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
            <Button>Sign up</Button>
        </Wrapper>
        <More>
            English(USA)
            <Links>
                <Link>Help</Link>
                <Link>Privacy</Link>
                <Link>Terms</Link>
            </Links>
        </More>
    </Container>
  )
}
