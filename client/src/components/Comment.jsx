import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { format } from 'timeago.js'
import axios from "axios"
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';

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
const CommentBox = styled.div`
    display: flex;
    align-items: center;
    width: calc(100% - 60px);
`;
const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: ${({theme}) => theme.text};
    width: calc(100% - 25px)
`;
const Name = styled.span`
   font-size: 13px;
   font-weight: 500;
`;
const Date = styled.span`
    font-size: 13px;
    font-weight: 300;
    margin-left: 6px;
    color: ${({theme}) => theme.textSoft};
`;
const Text = styled.span`
    font-size: 14px;
`;
const Delete = styled.div`
    margin-left: auto;
    color: ${({theme}) => theme.textSoft};
`;

export const Comment = ({comment}) => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const [isComment, setIsComment] = useState(true)
  const [user, setUser] = useState({})
  
  useEffect(() => {
    const fetchUser = async () => {
        const res = await axios.get(`/users/find/${comment.userId}`)
        setUser(res.data)
    } 
    fetchUser()
  },[comment.userId])

  const handleDelete = (id) => {
    const deleteComment = async () => {
      try {
          await axios.delete(`/comments/${id}`)
          setIsComment(false)
      }
      catch(err){
          console.log(err)
      }
    }
     deleteComment()
  }

  return (
    isComment &&
    <Container>
        <ImageConatiner>
              <Avatar src={user?.image}/>
        </ImageConatiner>
        <CommentBox>
            <Details>
                <Name>
                    {user?.name}
                    <Date>{format(comment?.createdAt)}</Date>
                </Name>
                <Text>
                    {comment?.comment}
                </Text>
            </Details>
            {comment.userId === currentUser._id &&
                <Delete>
                    <DeleteIcon fontSize="small" cursor="pointer" onClick={() => handleDelete(comment?._id)}/>
                </Delete>
            }
        </CommentBox>
    </Container>
  )
}
