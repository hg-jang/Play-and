import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import useInput from "../../hooks/useInput";
import {
  ADD_PROFILE_IMAGE_REQUEST,
  EDIT_NAME_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_REQUEST,
} from '../../reducers/user';
import { fbAuth } from '../fbase';
import { onAuthStateChanged } from '@firebase/auth';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import Avatar from '@mui/material/Avatar';

import styles from '../../styles/PublicLayout.module.css'

const NameTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& label.Mui-focused': {
    color: '#3498db',
  },
  '& .MuiOutlinedInput-root': {
    color: '#3498db',

    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: '#3498db',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3498db',
    },
  },
});

const PublicLayout = ({ children }) => {
  const imageInputRef = useRef()
  const [isNameEditing, setIsNameEditing] = useState(false)
  const [text, onChangeText, setText] = useInput('')

  const dispatch = useDispatch()
  const { isLoggedIn, currentUser, isNameEdited, isSignedUp } = useSelector((state) => state.user)

  const onClickEditName = useCallback(() => {
    setIsNameEditing(true)
  }, [])

  const onClickCompleteEdit = useCallback(() => {
    if(!text) {
      return setIsNameEditing(false)
    }
    dispatch({
      type: EDIT_NAME_REQUEST,
      data: text,
    })
  }, [text])
  
  const onClickImageInput = useCallback(() => {
    imageInputRef.current.click()
  }, [])

  const onClickLogOut = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    })
  }, [])

  const onChangeImageInput = (e) => {
    const file = e.target.files[0]
    const src = file.name

    return dispatch({
      type: ADD_PROFILE_IMAGE_REQUEST,
      data: {
        src: src,
        file: file,
      },
    })
  }

  useEffect(() => {
    if(isNameEdited) {
      setText('')
      setIsNameEditing(false)
    }
  }, [isNameEdited])


  useEffect(() => {
    onAuthStateChanged(fbAuth, (user) => {
      if(user) {
        dispatch({
          type: LOG_IN_SUCCESS,
          data: user,
        })
      }
    })
  }, [])

  useEffect(() => {
    if(isSignedUp) {
      Router.replace('/')
    }
  }, [isSignedUp])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.container__header}>
          <h1 className={styles.logo}><Link href="/"><a>Play &</a></Link></h1>
          {
          isLoggedIn ?
          <ul className={styles.login_bar}>
            <li>
              {currentUser.photoURL
              ? <Avatar src={currentUser.photoURL} sx={{ width: 28, height: 28 }} />
              : <Avatar sx={{ width: 28, height: 28 }}>Hi</Avatar>}
              <EditIcon name="edit" onClick={onClickImageInput} />
              <input type="file" hidden ref={imageInputRef} onChange={onChangeImageInput} />
            </li>
            {isNameEditing ?
            <li className={styles.name_editing}>
              <NameTextField size="small" label="New Name" variant="outlined" value={text} onChange={onChangeText} />
              <Button variant="contained" onClick={onClickCompleteEdit}>Edit</Button>
            </li>
            :
            <li className={styles.name}>
              <span>{currentUser.displayName ? currentUser.displayName : '익명 '}님</span>
              <EditIcon onClick={onClickEditName} />
            </li>
            }
            <li><Button variant="contained" onClick={onClickLogOut}>Log Out</Button></li>
          </ul>
          :
          <ul className={styles.logout_bar}>
            <Button variant="contained"><Link href="/log-in"><a>Log In</a></Link></Button>
            <Button variant="contained"><Link href="/sign-up"><a>Sign Up</a></Link></Button>
          </ul>
          }
        </div>
      </div>
      { children }
      <div className={styles.footer}>&copy; 2021, Built by gilmujjang & Hyeon-Gwang with Next.js</div>
    </>
  )
}

export default PublicLayout