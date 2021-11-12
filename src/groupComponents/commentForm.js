import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid'
import { ADD_COMMENT_REQUEST } from "../../reducers/group";
import { getDateWithTime } from "../../sagas/user";
import useInput from "../../hooks/useInput";

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

import styles from '../../styles/Comment.module.css'

const CommentForm = ({ post }) => {
  const router = useRouter()
  const { group } = router.query

  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
  const { isCommentAdded } = useSelector((state) => state.group)
  const [comment, onChangeComment, setComment] = useInput('')
  

  const onClickCancel = useCallback(() => {
    setComment('')
  }, [])

  const onClickAddComment = useCallback(() => {
    const id = uuidv4()
    const commentObj = {
      commentWriterUID: currentUser.uid,
      commentWriterPhotoURL: currentUser.photoURL,
      commentWriterDisplayName: currentUser.displayName,
      content: comment,
      id: id,
      date: getDateWithTime(),
      like: [],
    }

    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        group,
        commentObj: commentObj,
        postId: post.id,
        commentId: id,
      }
    })
  }, [post, comment])

  useEffect(() => {
    if(isCommentAdded) { setComment('') }
  }, [isCommentAdded])

  return (
    <div className={styles.comment_form}>
      <TextField sx={{ maxWidth: 'calc(100% - 130px)' }} variant="standard" fullWidth label="댓글을 적어주세요" value={comment} onChange={onChangeComment} />
      <ButtonGroup sx={{ width: 123, height: 36 }}>
        <Button variant="outlined" size="small" onClick={onClickCancel}>취소</Button>
        <Button variant="contained" size="small" onClick={onClickAddComment}>댓글 작성</Button>
      </ButtonGroup>
    </div>
  )
}

export default CommentForm