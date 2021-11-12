import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { 
  REMOVE_COMMENT_REQUEST,
 } from "../../reducers/group";

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import styles from '../../styles/Comment.module.css'

const Comment = ({ postId, comment }) => {
  const router = useRouter()
  const { group } = router.query

  const dispatch = useDispatch()
  const uid = useSelector((state) => state.user.currentUser?.uid)

  const onClickLikeComment = useCallback(() => {
    // const docRef = fbaseFirestore.collection(group).doc('group data').collection('posts').doc(postId).collection('comments').doc(comment.id)
    // let prevLike = []

    // docRef.get()
    // .then((doc) => {
    //   prevLike = [ ...doc.data().like ]
    // })
    // docRef.set({
    //   like: [...prevLike, uid]
    // }, { merge: true })
    // .then(() => {
    //   dispatch({
    //     type: LIKE_COMMENT,
    //     data: {
    //       postId: postId,
    //       commentId: comment.id,
    //       who: uid,
    //     }
    //   })
    // })
    // .catch((error) => {
    //   console.log(error);
    // })
  }, [postId, comment])

  const onClickDislikeComment = useCallback(() => {
    // const docRef = fbaseFirestore.collection(group).doc('group data').collection('posts').doc(postId).collection('comments').doc(comment.id)
    // let prevLike = []

    // docRef.get()
    // .then((doc) => {
    //   prevLike = [...doc.data().like]
    // })
    // docRef.set({
    //   like: prevLike.filter((like) => like !== uid)
    // }, { merge: true })
    // .then(() => {
    //   dispatch({
    //     type: DISLIKE_COMMENT,
    //     data: {
    //       postId: postId,
    //       commentId: comment.id,
    //       who: uid,
    //     }
    //   })
    // })
    // .catch((error) => {
    //   console.log(error);
    // })
  }, [])

  const onClickRemoveComment = useCallback(() => {
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      data: {
        group,
        postId: postId,
        commentId: comment.id,
      }
    })
  }, [comment])

  return (
    <div className={styles.comment}>
      <img src={comment.commentWriterPhotoURL} alt="writer image" />
      <div>
        <div className={styles.name_date}>
          <span className={styles.name}>{comment.commentWriterDisplayName}</span>
          <span className={styles.date}>{comment.date.substring(0, 4)}년 {comment.date.substring(4, 6)}월 {comment.date.substring(6, 8)}일 {comment.date.substring(9, 11)}시 {comment.date.substring(11, 13)}분</span>
        </div>
        <div className={styles.content}>
          {comment.content}
        </div>
        <div className={styles.buttons}>
          {comment.like.find((like) => like === uid)
          ? <IconButton>
              <FavoriteIcon sx={{ fontSize: '16px' }} color="error" onClick={onClickDislikeComment} />
            </IconButton>
          : <IconButton>
              <FavoriteBorderIcon sx={{ fontSize: '16px' }} color="primary" onClick={onClickLikeComment} />
            </IconButton>}
          {comment.commentWriterUID === uid &&
          <IconButton color="error" onClick={onClickRemoveComment}>
            <ClearIcon sx={{ fontSize: '16px' }} color="error" />
          </IconButton>}
        </div>
      </div>
    </div>
  )
}

export default Comment