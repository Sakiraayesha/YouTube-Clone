import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { format } from 'timeago.js'
import axios from "axios"

const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0;
`;
const ImageConatiner = styled.div``;
const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
`;
const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: ${({theme}) => theme.text};
`;
const Name = styled.span`
   font-size: 13px;
   font-weight: 500;
`;
const Date = styled.span`
    font-size: 13px;
    font-weight: 300;
    margin-left: 5px;
    color: ${({theme}) => theme.textSoft};
`;
const Text = styled.span`
    font-size: 14px;
`;

export const Comment = ({comment}) => {
  const [user, setUser] = useState({})
  
  useEffect(() => {
    const fetchUser = async () => {
        const res = await axios.get(`/users/find/${comment.userId}`)
        setUser(res.data)
    } 
    fetchUser()
  },[comment.userId])

  return (
    <Container>
        <ImageConatiner>
              <Avatar src={user?.image}/>
            </ImageConatiner>
        <Details>
            <Name>
                {user?.name}
                <Date>{format(comment?.createdAt)}</Date>
            </Name>
            <Text>
                {comment?.comment}
            </Text>
        </Details>
    </Container>
  )
}
