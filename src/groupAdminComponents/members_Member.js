import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  REMOVE_MEMBER_REQUEST,
  ADD_ADMIN_REQUEST,
} from '../../reducers/group';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';

import styles from '../../styles/admin_Members_Member.module.css';

const Members_Member = ({ member, index }) => {
  const router = useRouter()
  const { group } = router.query

  const dispatch = useDispatch()
  const { isAdminAdded } = useSelector((state) => state.group)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onClickRemove = useCallback(() => {
    dispatch({
      type: REMOVE_MEMBER_REQUEST,
      data: {
        group,
        uid: member.uid,
      }
    })
  }, [member])

  const handleAdmin = useCallback(() => {
    dispatch({
      type: ADD_ADMIN_REQUEST,
      data: {
        group,
        uid: member.uid,
        info: {
          displayName: member.displayName,
          uid: member.uid,
        }
      }
    })
  }, member)

  const onClickGiveBadge = useCallback(() => {
    alert('준비중입니다.')
  }, [member])

  useEffect(() => {
    if(isAdminAdded) {
      handleClose()
    }
  }, [isAdminAdded])
  return (
    <>
    <Card className={styles.member} key={index}>
      <Avatar sx={{ height: 68, width: 68 }} src={member.photoURL} alt="member" />
      <div className={styles.info}>
        <span>{member.displayName}</span>
        <span>{member.status}</span>
        <span>가입일 : {member.joinedDate}</span>
      </div>
      <ul>
        <li onClick={onClickRemove}>강퇴</li>
        <li onClick={handleOpen}>권한 부여</li>
        <li onClick={onClickGiveBadge}>뱃지 부여</li>
      </ul>
    </Card>

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          관리자 권한 부여
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        해당 멤버에게 관리자 권한을 부여하시겠습니까?
        </Typography>
        <div className={styles.buttons}>
          <Button variant="outlined" color="error" onClick={handleClose}>아니오</Button>
          <Button variant="contained" color="primary" onClick={handleAdmin}>네</Button>
        </div>
      </Box>
    </Modal>
    </>
  )
}

export default Members_Member