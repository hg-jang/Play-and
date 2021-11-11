import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { SIGN_UP_REQUEST } from '../reducers/user'
import { Button, Box, TextField } from '@mui/material'
import Router from 'next/router'

import styles from '../styles/signUp.module.css'
import PublicLayout from '../src/layouts/publicLayout'

const signUp = () => {
  const dispatch = useDispatch()
  // const { signUpError, isSignedUp } = useSelector((state) => state.user)

  // useEffect(() => {
  //   if(isSignedUp) {
  //     Router.replace('/')
  //   }
  // }, [isSignedUp])
  // useEffect(() => {
  //   if(signUpError) {
  //     alert(signUpError)
  //   }
  // }, [signUpError])

  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassword] = useInput('')
  
  const [passwordCheck, setPasswordCheck] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value)
    setPasswordError(e.target.value !== password)
  }, [password, passwordCheck])

  const [term, setTerm] = useState(false)
  const [termError, setTermError] = useState(false)
  const onClickCheckbox = useCallback((e) => {
    setTerm(e.target.checked)
    if(e.target.checked) {
      setTermError(false)
    }
  }, [])

  const onSubmit = useCallback(() => {
    if(password !== passwordCheck) {
      return setPasswordError(true)
    }
    if(!term) {
      return setTermError(true)
    }
    console.log(email, password)
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password },
    })
  }, [email, password, passwordCheck, term])

  return (
    <PublicLayout>
      <div className={styles.signup}>
        <h1>회원가입</h1>
        <Box component="form">
          <TextField required label="user-email" variant="standard" value={email} onChange={onChangeEmail} />
          <TextField required label="user-password" type="password" variant="standard" value={password} onChange={onChangePassword} />
          <TextField required label="user-password-check" type="password" variant="standard" value={passwordCheck} onChange={onChangePasswordCheck} />
          {passwordError && <span>비밀번호가 일치하지 않습니다.</span>}
          <div className={styles.term}>
            <div>
              <input type="checkbox" onClick={onClickCheckbox} />
              <label>주인님의 말에 복종할것은 맹세합니다.</label>
            </div>
            {termError && <span>복종 서약에 동의하십시오.</span>}
          </div>
          <Button variant="contained" onClick={onSubmit}>회원가입</Button>
        </Box>
      </div>
    </PublicLayout>
  )
}

export default signUp