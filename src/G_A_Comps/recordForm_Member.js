import React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';

import styles from '../../styles/admin_RecordForm.module.css'

const RecordForm_Member = ({ winner, loser, winners, setWinners, losers, setLosers, member }) => {
  
  const onClickCheck = () => {
    if(winners.length === 2 || losers.length === 2) {
      return alert('더 이상 추가할 수 없습니다.')
    } else {
      if(winner) {setWinners([...winners, member])}
      else if(loser) {setLosers([...losers, member])}
    }
  }

  return (
    <Card className={styles.member}>
      <CardHeader
       avatar={<Avatar src={member.photoURL} alt="member" />}
       title={member.displayName}
       subheader={member.rating}
       action={<CheckIcon onClick={onClickCheck} />}
      />
    </Card>
  )
}

export default RecordForm_Member