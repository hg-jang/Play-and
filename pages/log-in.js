import React, { useEffect, useCallback } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { LOG_IN_REQUEST } from '../reducers/user'
import Router from 'next/router'

import styles from '../styles/logIn.module.css'
import PublicLayout from '../src/layouts/publicLayout'

const logIn = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, logInError } = useSelector((state) => state.user)

  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassword] = useInput('')

  const onClickLogin = useCallback(() => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password },
    })
  }, [email, password])

  useEffect(() => {
    if(isLoggedIn) {
      Router.replace('/')
    }
  }, [isLoggedIn])
  useEffect(() => {
    if(logInError) {
      alert(logInError)
    }
  }, [logInError])
  
  return (
    <PublicLayout>
      <div className={styles.login}>
        <h1>로그인</h1>
        <Box component="form">
          <TextField required label="user-email" variant="standard" value={email} onChange={onChangeEmail} />
          <TextField required label="user-password" type="password" variant="standard" value={password} onChange={onChangePassword} />
          <Button variant="contained" onClick={onClickLogin}>로그인</Button>
        </Box>
      </div>
    </PublicLayout>
  )
}

export default logIn