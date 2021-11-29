import React, { useCallback, useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { fbFirestore } from "../fbase";
import { getDocs, collection } from 'firebase/firestore'
import { 
  INIT_IMAGEURLS, REMOVE_POST_REQUEST, EDIT_POST_REQUEST, SET_POST_EDIT,
  UPLOAD_POST_IMAGE_REQUEST, REMOVE_POST_IMAGE_REQUEST,
  LOAD_COMMENTS_REQUEST,
} from "../../reducers/group";

import Avatar from '@mui/material/Avatar';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import styles from '../../styles/Post.module.css';
import CommentForm from "./commentForm";
import Comment from './comment'

const Post = ({ post, index }) => {
  const router = useRouter()
  const { group } = router.query

  const [newPost, onChangeNewPost, setNewPost] = useInput('')
  const [isEditing, setIsEditing] = useState(false)

  const dispatch = useDispatch()
  const uid = useSelector((state) => state.user.currentUser?.uid)
  const { postImageURLs, isPostEdited, isCommentsLoading, isCommentsLoaded } = useSelector((state) => state.group)
  
  const imageInputRef = useRef()
  const onClickUploadImage = useCallback(() => {
    imageInputRef.current.click()
  }, [])
  const onChangeImageInput = useCallback((e) => {
    const file = e.target.files[0]
    const src = file.name

    return dispatch({
      type: UPLOAD_POST_IMAGE_REQUEST,
      data: {
        group,
        src: src,
        file: file,
        id: post.id,
      }
    })
  }, [])
  const onClickRemoveImage = (e) => {
    dispatch({
      type: REMOVE_POST_IMAGE_REQUEST,
      data: {
        imageRef: e.target.dataset.ref,
        id: post.id,
      }
    })
  }

  const onClickEditPost = useCallback(() => {
    setNewPost(post.content)
    setIsEditing(true)
    dispatch({
      type: SET_POST_EDIT,
      postId: post.id,
    })
  }, [post])

  const onClickFinishEdit = useCallback(() => {
    const imageURLs =
    postImageURLs.find((v) => v.id === post.id)
    ? postImageURLs.find((v) => v.id === post.id).imageURLs
    : []

    dispatch({
      type: EDIT_POST_REQUEST,
      data: {
        group,
        postId: post.id,
        content: newPost,
        imageURLs,
      }
    })
  }, [post, newPost, postImageURLs])

  const onClickCancle = useCallback(() => {
    setNewPost('')
    dispatch({
      type: INIT_IMAGEURLS,
      data: post.id,
    })
    setIsEditing(false)
  }, [post])

  const onClickRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: {
        group,
        postId: post.id,
      }
    })
  }, [post])

  const loadComments = async () => {
    let commentsArr = []
    const commentSnapshot = await getDocs(collection(fbFirestore, group, 'group data', 'posts', post.id, 'comments'))
    commentSnapshot.forEach((comment) => {    
      commentsArr = commentsArr.concat(comment.data().id)
    })

    dispatch({
      type: LOAD_COMMENTS_REQUEST,
      data: {
        group,
        commentsArr: commentsArr,
        postId: post.id,
      }
    })
  }

  // post 편집 성공하면 초기화
  useEffect(() => {
    if(isPostEdited) {
      setIsEditing(false)
      setNewPost('')
      dispatch({
        type: INIT_IMAGEURLS,
        data: post.id,
      })
    }
  }, [isPostEdited])
  useEffect(() => {
    loadComments()
  }, [post.id])

  return (
    <div className={styles.post} key={index}>
      <div className={styles.post_writer}>
      <Avatar alt="writer" src={post.writerPhotoURL} sx={{ width: 36, height: 36, marginRight: '4px' }} />
        <div>
          <span>{post.writerDisplayName}</span>
          <span>{post.date.substring(0, 4)}년 {post.date.substring(4, 6)}월 {post.date.substring(6, 8)}일 {post.date.substring(9, 11)}시 {post.date.substring(11, 13)}분</span>
        </div>
      </div>
      {!isEditing ?
      <> 
      <div className={styles.post_content}>
        {uid === post.writerUID &&
        <ButtonGroup id={styles.edit_buttons} variant="text">
          <IconButton color="primary" onClick={onClickEditPost}>
            <ModeEditIcon />
          </IconButton>
          <IconButton color="error" onClick={onClickRemovePost}>
            <ClearIcon />
          </IconButton>
        </ButtonGroup>
        }
        <div className={styles.content}>
          {post.content}
        </div>
      </div>
      {post.imageURLs.length > 0 &&
      <div className={styles.post_images}>
        {post.imageURLs.map((v, index) => (
          <img src={v.url} key={index} alt="image" />
        ))}
      </div>}
      </>
      :
      <>
        <TextField fullWidth multiline maxRows={2} placeholder={post.content} value={newPost} onChange={onChangeNewPost} />
        <div className={styles.post_buttons}>
          <input type="file" hidden ref={imageInputRef} onChange={onChangeImageInput} />
          <Button variant="contained" endIcon={<AddAPhotoIcon />} color="success" size="small" onClick={onClickUploadImage}>사진 추가</Button>
          <ButtonGroup>
            <Button variant="outlined" size="small" color="error" onClick={onClickCancle}>취소</Button>
            <Button variant="outlined" size="small" onClick={onClickFinishEdit}>수정</Button>
          </ButtonGroup>
        </div>
        {postImageURLs.length !== 0 && postImageURLs.find((v) => v.id === post.id) &&
        <div className={styles.images}>
          {postImageURLs.find((v) => v.id === post.id).imageURLs.map((o, index) => (
            <div className={styles.img} key={index}>
              <img src={o.url} alt="image" />
              <Button variant="contained" size="small" color='error' data-ref={o.ref} onClick={onClickRemoveImage}>제거</Button>
            </div>
          ))}
        </div>}
      </>
      }
      <div className={styles.post_comments}>
        <CommentForm post={post} />
        {/* {!isCommentsLoaded && <Button variant="text" onClick={onClickLoadComments}>Load Comments</Button>} */}
        {post.comments
        ? post.comments.map((comment, index) => <Comment postId={post.id} comment={comment} index={index} />)
        : <div className={styles.no_comments}>No comments</div>}
      </div>
    </div>
  )
}

export default Post