import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router';
import { SET_MEMBER } from '../../reducers/group';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'

import styles from '../../styles/MemberCard.module.css'

const MemberCard = ({ member, index }) => {
  const router = useRouter()
  const { group } = router.query

  const dispatch = useDispatch()

  const defaultURL = "https://images.unsplash.com/photo-1554147090-e1221a04a025?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1148&q=80"

  const onClickOpenDetail = useCallback(() => {
    dispatch({
      type: SET_MEMBER,
      data: member,
    })
    
    Router.push(`/${group}/${member.displayName}`)
  }, [member])
  
  return (
    <Card sx={{ display: 'flex', m: '8px' }} id={styles.member_card} key={index}>
      <CardMedia
        component="img"
        sx={{ width: 96, height: 96, mr: '8px' }}
        image={member.photoURL ? member.photoURL : defaultURL}
        alt="member"
      />
      <CardContent class={styles.info}>
        <Typography className={styles.name}>{member.displayName}</Typography>
        <Typography className={styles.status} color="text.secondary">{member.status}</Typography>
        <Button className={styles.button} size="small" variant="contained" onClick={onClickOpenDetail}>Look Detail</Button>
      </CardContent>
    </Card>
  )
}

export default MemberCard