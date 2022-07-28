import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Comment } from './Comment';

const Container = styled.div``;
const NewComment = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
`;
const Input = styled.input`
    border: none;
    border-bottom: 1px solid ${({theme}) => theme.soft};
    color: ${({theme}) => theme.text};
    background-color: transparent;
    padding: 5px;
    width: 100%;
    outline: none;
`;

export const Comments = ({videoId}) => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
        try{
            const res = await axios.get(`/comments/${videoId}`)
            setComments(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    fetchComments()
  },[videoId])

  return (
    <Container>
        <NewComment>
            <Avatar src={currentUser?.image}/>
            <Input placeholder="Add a comment..."/>
        </NewComment>
        {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
        ))}
    </Container>
  )
}
