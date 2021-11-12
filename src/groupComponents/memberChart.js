import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Line } from 'react-chartjs-2';
import { fbFirestore } from '../fbase';
import { collection, getDocs } from 'firebase/firestore';
import { LOAD_MEMBER_GAMES_REQUEST } from '../../reducers/group'

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import styles from '../../styles/MemberDetail.module.css'

const MemberChart = ({ memberId }) => {
  const router = useRouter()
  const { group } = router.query

  const dispatch = useDispatch()
  const member = useSelector((state) => state.group.currentGroup?.members.find(m => m.uid === memberId))
  
  const [period, setPeriod] = useState('30')


  // userMatch에서 rating 가져오기
  const getRating = (date) => {
    const game = member.games.find(el => el.playedDate - date <= 0) ? member.games.find(el => el.playedDate - date <= 0) : 1500

    if(game === 1500) { return game }
    else if(game.winners.includes(member.displayName)) {
      return game.winnerRatingAfter[game.winners.indexOf(member.displayName)]
    } else if(game.losers.includes(member.displayName)) {
      return game.loserRatingAfter[game.losers.indexOf(member.displayName)]
    }
  }

  const getDateForm = (day) => {
    let year = day.getFullYear()
    let month = day.getMonth() + 1
    let date = day.getDate()

    month = month >= 10 ? month : `0${month}`
    date = date >= 10 ? date : `0${date}`

    return `${year}${month}${date}`
  }

  // 1월달에만 년도 출력하도록 변경하기
  const changeDateForm = (date) => {
    return `${date.slice(4, 6)}월 ${date.slice(6)}일`
  }
    
  const getToday = () => {
    const date = new Date()  

    return getDateForm(date)
  }

  const lastDays = (day) => {
    const date = new Date()
    const today = date.getDate()
    
    date.setDate(today - day)
    
    return getDateForm(date)
  }

  // period에 따라 labels array 생성
  const getDataLabels = (period) => {
    let dataLabels = []

    for(let i = 0; i < period; i++) {
      dataLabels.push(changeDateForm(lastDays(period - i)))
    }

    dataLabels.push(changeDateForm(getToday()))  

    return dataLabels
  }

  // period에 따라 datas 생성
  const getDatas = (period) => {
    let datas = []

    for(let i = 0; i < period; i ++) {
      datas.push(getRating(lastDays(period - i)))
    }
    datas.push(getRating(getToday()))

    return datas
  }

  useEffect(async () => {
    let memberGamesArr = []
    const memberGamesSnapshot = await getDocs(collection(fbFirestore, group, 'group data', 'members', memberId, 'games'))
    memberGamesSnapshot.forEach((doc) => {
      memberGamesArr = memberGamesArr.concat(doc.data().id)
    })

    dispatch({
      type: LOAD_MEMBER_GAMES_REQUEST,
      data: {
        group,
        memberId,
        memberGamesArr,
      }
    })
  }, [])

  return (
    <div className={styles.chart_form}>
      <ButtonGroup variant="outlined">
        <Button onClick={() => {setPeriod('10')}}>10일</Button>
        <Button onClick={() => {setPeriod('30')}}>30일</Button>
        <Button onClick={() => {setPeriod('60')}}>60일</Button>
      </ButtonGroup>
      {typeof member.games === 'undefined'
      ? <CircularProgress />
      : <Line
          data={{
            labels: getDataLabels(period),
            datasets: [{
              label: 'Rating',
              data: getDatas(period),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          }}
          options={{ maintainAspectRatio: false }}
        />}
    </div>
  )
}

export default MemberChart