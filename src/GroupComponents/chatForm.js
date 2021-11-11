import React, { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import useInput from '../../hooks/useInput'
import { v4 as uuidv4 } from 'uuid'
import { getDateWithTime } from '../../sagas/user'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_CHAT_REQUEST } from '../../reducers/group'

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

import styles from '../../styles/Chat.module.css'

const ChatForm = () => {
  const router = useRouter()
  const { group } = router.query

  const dispatch = useDispatch()
  const [chat, onChangeChat, setChat] = useInput('')
  const { currentUser } = useSelector((state) => state.user)
  const { isCommentAdded } = useSelector((state) => state.group)

  const onClickSendChat = useCallback(() => {
    if(!chat) { return ; }
    const id = uuidv4()

    const chatObj = {
      id: id,
      date: getDateWithTime(),
      content: chat,
      chatWriterUID: currentUser.uid,
      chatWriterDisplayName: currentUser.displayName,
      chatWriterPhotoURL: currentUser.photoURL,
    }

    dispatch({
      type: ADD_CHAT_REQUEST,
      data: {
        group,
        chatObj,
        chatId: id,
      }
    })
  }, [chat])

  useEffect(() => {
    if(isCommentAdded) { setChat('') }
  }, [isCommentAdded])

  return (
    <div className={styles.chat_form}>
      <TextField fullWidth variant="outlined" label="Add Chat" value={chat} onChange={onChangeChat} />
      <IconButton sx={{ marginLeft: '4px' }} color="primary"  onClick={onClickSendChat}>
        <SendIcon fontSize="large" />
      </IconButton>
    </div>
  )
}

export default ChatForm