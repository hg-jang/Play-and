import React, { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput'
import { getDateWithTime } from '../../sagas/user'
import { v4 as uuidv4 } from 'uuid'
import {
  UPLOAD_POST_IMAGE_REQUEST, REMOVE_POST_IMAGE_REQUEST, ADD_POST_REQUEST, INIT_IMAGEURLS
} from '../../reducers/group';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SendIcon from '@mui/icons-material/Send';

import styles from '../../styles/PostForm.module.css'



const PostForm = () => {
  const router = useRouter()
  const { group } = router.query
  
  const dispatch = useDispatch()
  const [post, onChangePost, setPost] = useInput('')
  
  const { currentUser } = useSelector((state) => state.user)
  const { postImageURLs, isPostAdded } = useSelector((state) => state.group)

  const imageInputRef = useRef()
  const onChangeImageInput = useCallback((e) => {
    const file = e.target.files[0]
    const src = file.name

    return dispatch({
      type: UPLOAD_POST_IMAGE_REQUEST,
      data: {
        group,
        id: "new",
        src,
        file,
      }
    })
  }, [])

  const onClickUploadImage = useCallback(() => {
    imageInputRef.current.click()
  }, [])

  const onClickRemoveImage = useCallback((e) => {
    dispatch({
      type: REMOVE_POST_IMAGE_REQUEST,
      data: {
        imageRef: e.target.dataset.ref,
        id: "new",
      }
    })
  }, [])

  const onClickAddPost = useCallback(() => {
    const id = uuidv4()
    const postObj = {
      writerUID: currentUser.uid,
      writerPhotoURL: currentUser.photoURL,
      writerDisplayName: currentUser.displayName,
      content: post,
      imageURLs: postImageURLs.length !== 0 ? postImageURLs.find((v) => v.id === "new").imageURLs : [],
      date: getDateWithTime(),
      id: id,
    }

    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        group,
        id,
        postObj,
      }
    })
  }, [group, post, postImageURLs])

  useEffect(() => {
    if(isPostAdded) {
      // 포스트 인풋 초기화
      setPost('')
      // 이미지 경로 초기화
      dispatch({
        type: INIT_IMAGEURLS,
        data: "new",
      })
    }
  }, [isPostAdded])

  return (
    <Box component="form" id={styles.post_form}>
      <TextField fullWidth multiline maxRows={3} label="오늘의 테니스 라이프는?" value={post} onChange={onChangePost} />
      <div className={styles.post_buttons}>
        <input type="file" hidden ref={imageInputRef} onChange={onChangeImageInput} />
        <Button variant="contained" endIcon={<AddAPhotoIcon />} color="success" onClick={onClickUploadImage}>사진 추가</Button>
        <Button variant="contained" endIcon={<SendIcon />} onClick={onClickAddPost}>작성</Button>
      </div>
      {postImageURLs.length > 0 && postImageURLs.find((v) => v.id === "new") &&
      <div className={styles.images}>
        {postImageURLs.find((v) => v.id === "new").imageURLs.map((o, index) => (
          <div className={styles.img} key={index}>
            <img src={o.url} alt="image" />
            <Button variant="contained" size="small" color='error' data-ref={o.ref} onClick={onClickRemoveImage}>제거</Button>
          </div>
        ))}
      </div>}
    </Box>
  )
}

export default PostForm