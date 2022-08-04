import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Comment } from './Comment';

const Container = styled.div`
    position: relative;
`;
const NewComment = styled.form`
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
    font-size: 14px;
`;
const CommentActions = styled.div`
    position: absolute;
    right: 0;
    display: flex;
    gap: 30px;
    align-items: center;
`;
const Cancel = styled.div`
    float: left;
    color: ${({theme}) => theme.textSoft};
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
`;
const Post = styled.button`
    float: left;
    border-radius: 3px;
    border: none;
    padding: 10px 15px;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    background-color: #30A5E8;
    color: #071A25;
`;
const CommentsWrapper = styled.div`
   padding-top: 20px;
`;

export const Comments = ({videoId}) => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState(null)
  const [commentPosted, setCommentPosted] = useState(0)

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
  },[videoId, commentPosted])

  const postComment = async () => {
    const postComment = {videoId: videoId, comment: newComment}
    try{
        await axios.post("/comments", postComment)
        setCommentPosted(commentPosted + 1)
        resetComment()
    }
    catch(err){
        console.log(err)
    }
  }

  const resetComment = () => {
    document.getElementById("commentForm").reset()
  }

  return (
    <Container>
        <NewComment id="commentForm">
            <Avatar src={currentUser?.image}/>
            <Input placeholder="Add a comment..." onChange={(e) => setNewComment(e.target.value)}/>
        </NewComment>
        <CommentActions>
            <Cancel onClick={resetComment}>CANCEL</Cancel>
            <Post onClick={postComment}>COMMENT</Post>
        </CommentActions>
        <CommentsWrapper>
            {comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
            ))}
        </CommentsWrapper>
    </Container>
  )
}
