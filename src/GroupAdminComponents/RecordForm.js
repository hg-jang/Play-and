import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { getDateWithTime } from '../../sagas/user';
import { ADD_GAME_REQUEST } from '../../reducers/group';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import styles from '../../styles/admin_RecordForm.module.css';
import RecordForm_Member from './recordForm_Member';
import RecordForm_Selected from './rrecordForm_Selected';

const getPercentage = (winnersAverage, losersAverage) => {
  return (1 / (1 + (Math.pow(10, (winnersAverage - losersAverage) / 400)))).toFixed(2)
}
const getRatingChange = (percentage) => {
  return Math.round(percentage * 48)
}

const RecordForm = () => {
  const router = useRouter()
  const { group } = router.query

  const dispatch = useDispatch()
  const { isGameAddedInMember } = useSelector((state) => state.group)
  const members = useSelector((state) => state.group.currentGroup.members)

  const [year, setYear] = useState('2021')
  const [month, setMonth] = useState('01')
  const [date, setDate] = useState('01')
  const onClickYear = (e) => {
    setYear(e.target.dataset.year)
  }
  const onClickMonth = (e) => {
    setMonth(e.target.dataset.month)
  }
  const onClickDate = (e) => {
    setDate(e.target.dataset.date)
  }

  // 추가된 승자 혹은 패자
  const [winners, setWinners] = useState([])
  const [losers, setLosers] = useState([])
  // 검색 대상
  const [memberList, setMemberList] = useState([])
  
  const [winner, onChangeWinner] = useInput('')
  const [loser, onChangeLoser] = useInput('')

  const onClickAddRecord = useCallback(() => {
    const playedDate = `${year}${month}${date}`
    const writtenDate = getDateWithTime()
    const gameId = writtenDate // 20211108-175636 (년월일-시분초)

    if(winners.length !== losers.length) {
      return alert('winners와 losers의 인원 수가 다릅니다.')
    }
    else if(winners.length === 1) { // 단식일 경우
      const percentage = getPercentage(winners[0].rating, losers[0].rating)
      const ratingChange = getRatingChange(percentage)

      const gameObj = {
        writtenDate: writtenDate,
        playedDate: playedDate,
        winners: [winners[0].displayName],
        losers: [losers[0].displayName],
        percentage: percentage,
        ratingChange: ratingChange,
        winnerRatingBefore: [winners[0].rating],
        loserRatingBefore: [losers[0].rating],
        winnerRatingAfter: [winners[0].rating + ratingChange],
        loserRatingAfter: [losers[0].rating - ratingChange],
        id: gameId,
      }

      dispatch({
        type: ADD_GAME_REQUEST,
        data: {
          group,
          gameId,
          gameObj,
          winners: [winners[0].uid],
          losers: [losers[0].uid]
        }
      })
    }
    else if(winners.length === 2) {  // 복식일 경우
      let winnersAverage, losersAverage

      // winners와 losers의 average 구하기
      if(winners[0].rating > winners[1].rating) {
        winnersAverage = (winners[0].rating + 2 * winners[1].rating) / 3
      } else {
        winnersAverage = (2 * winners[0].rating + winners[1].rating) / 3
      }

      if(losers[0].rating > losers[1].rating) {
        losersAverage = (losers[0].rating + 2 * losers[1].rating) / 3
      } else {
        losersAverage = (2 * losers[0].rating + losers[1].rating) / 3
      }

      // percentage와 ratingChange 구하기
      const percentage = getPercentage(winnersAverage, losersAverage)
      const ratingChange = getRatingChange(percentage)

      const gameObj = {
        writtenDate: writtenDate,
        playedDate: playedDate,
        winners: [winners[0].displayName, winners[1].displayName],
        losers: [losers[0].displayName, losers[1].displayName],
        percentage: percentage,
        ratingChange: ratingChange,
        winnerRatingBefore: [winners[0].rating],
        loserRatingBefore: [losers[0].rating],
        winnerRatingAfter: [winners[0].rating + ratingChange , winners[1].rating + ratingChange],
        loserRatingAfter: [losers[0].rating - ratingChange, losers[1].rating - ratingChange],
        id: gameId,
      }

      dispatch({
        type: ADD_GAME_REQUEST,
        data: {
          group,
          gameId,
          gameObj,
          winners: [winners[0].uid, winners[1].uid],
          losers: [losers[0].uid, losers[1].uid]
        }
      })
    }
  }, [winners, losers])

  const onClickInit = useCallback(() => {
    setWinners([])
    setLosers([])
  })

  useEffect(() => {
    if(winner) {setMemberList(members.filter(member => member.displayName.includes(winner)))}
    else if(loser) {setMemberList(members.filter(member => member.displayName.includes(loser)))}
    else {setMemberList([])}
  }, [winner, loser])

  useEffect(() => {
    if(isGameAddedInMember) {
      setWinners([])
      setLosers([])
    }
  }, [isGameAddedInMember])

  return (
    <>
      <div className={styles.title_box}>
        <h1>winner 찾기</h1>
        <h1>loser 찾기</h1>
      </div>
      <div className={styles.date_box}>
        <div className="dropdown">
          <div className="dropdown__selected">
            <span className="selected">{year}</span>
            <ArrowDropDownIcon />
          </div>
          <ul className="dropdown__list">
            <li className="dropdown__list__item" data-year="2020" onClick={onClickYear}>2020</li>
            <li className="dropdown__list__item" data-year="2021" onClick={onClickYear}>2021</li>
            <li className="dropdown__list__item" data-year="2021" onClick={onClickYear}>2021</li>
          </ul>
        </div>
        <div className="dropdown">
          <div className="dropdown__selected">
            <span className="selected">{month}</span>
            <ArrowDropDownIcon />
          </div>
          <ul className="dropdown__list">
            <li className="dropdown__list__item" data-month="01" onClick={onClickMonth}>01</li>
            <li className="dropdown__list__item" data-month="02" onClick={onClickMonth}>02</li>
            <li className="dropdown__list__item" data-month="03" onClick={onClickMonth}>03</li>
            <li className="dropdown__list__item" data-month="04" onClick={onClickMonth}>04</li>
            <li className="dropdown__list__item" data-month="05" onClick={onClickMonth}>05</li>
            <li className="dropdown__list__item" data-month="06" onClick={onClickMonth}>06</li>
            <li className="dropdown__list__item" data-month="07" onClick={onClickMonth}>07</li>
            <li className="dropdown__list__item" data-month="08" onClick={onClickMonth}>08</li>
            <li className="dropdown__list__item" data-month="09" onClick={onClickMonth}>09</li>
            <li className="dropdown__list__item" data-month="10" onClick={onClickMonth}>10</li>
            <li className="dropdown__list__item" data-month="11" onClick={onClickMonth}>11</li>
            <li className="dropdown__list__item" data-month="12" onClick={onClickMonth}>12</li>
          </ul>
        </div>
        <div className="dropdown">
          <div className="dropdown__selected">
            <span className="selected">{date}</span>
            <ArrowDropDownIcon />
          </div>
          <ul className="dropdown__list">
            <li className="dropdown__list__item" data-date="01" onClick={onClickDate}>01</li>
            <li className="dropdown__list__item" data-date="02" onClick={onClickDate}>02</li>
            <li className="dropdown__list__item" data-date="03" onClick={onClickDate}>03</li>
            <li className="dropdown__list__item" data-date="04" onClick={onClickDate}>04</li>
            <li className="dropdown__list__item" data-date="05" onClick={onClickDate}>05</li>
            <li className="dropdown__list__item" data-date="06" onClick={onClickDate}>06</li>
            <li className="dropdown__list__item" data-date="07" onClick={onClickDate}>07</li>
            <li className="dropdown__list__item" data-date="08" onClick={onClickDate}>08</li>
            <li className="dropdown__list__item" data-date="09" onClick={onClickDate}>09</li>
            <li className="dropdown__list__item" data-date="10" onClick={onClickDate}>10</li>
            <li className="dropdown__list__item" data-date="11" onClick={onClickDate}>11</li>
            <li className="dropdown__list__item" data-date="12" onClick={onClickDate}>12</li>
            <li className="dropdown__list__item" data-date="13" onClick={onClickDate}>13</li>
            <li className="dropdown__list__item" data-date="14" onClick={onClickDate}>14</li>
            <li className="dropdown__list__item" data-date="15" onClick={onClickDate}>15</li>
            <li className="dropdown__list__item" data-date="16" onClick={onClickDate}>16</li>
            <li className="dropdown__list__item" data-date="17" onClick={onClickDate}>17</li>
            <li className="dropdown__list__item" data-date="18" onClick={onClickDate}>18</li>
            <li className="dropdown__list__item" data-date="19" onClick={onClickDate}>19</li>
            <li className="dropdown__list__item" data-date="20" onClick={onClickDate}>20</li>
            <li className="dropdown__list__item" data-date="21" onClick={onClickDate}>21</li>
            <li className="dropdown__list__item" data-date="22" onClick={onClickDate}>22</li>
            <li className="dropdown__list__item" data-date="23" onClick={onClickDate}>23</li>
            <li className="dropdown__list__item" data-date="24" onClick={onClickDate}>24</li>
            <li className="dropdown__list__item" data-date="25" onClick={onClickDate}>25</li>
            <li className="dropdown__list__item" data-date="26" onClick={onClickDate}>26</li>
            <li className="dropdown__list__item" data-date="27" onClick={onClickDate}>27</li>
            <li className="dropdown__list__item" data-date="28" onClick={onClickDate}>28</li>
            <li className="dropdown__list__item" data-date="29" onClick={onClickDate}>29</li>
            <li className="dropdown__list__item" data-date="30" onClick={onClickDate}>30</li>
            <li className="dropdown__list__item" data-date="31" onClick={onClickDate}>31</li>
          </ul>
        </div>
      </div>
      <div className={styles.search_box}>
        {loser && <TextField disabled label="Search Winner" value={winner} onChange={onChangeWinner} />}
        {!loser && <TextField label="Search Winner" value={winner} onChange={onChangeWinner} />}
        {winner && <TextField disabled label="Search Loser" value={loser} onChange={onChangeLoser} />}
        {!winner && <TextField label="Search Loser" value={loser} onChange={onChangeLoser} />}
      </div>
      <div className={styles.selected_members}>
        <div>
          {winners && winners.map((m) => <RecordForm_Selected arr={winners} setArr={setWinners} member={m} />)}
        </div>
        <div>
          {losers && losers.map((m) => <RecordForm_Selected arr={losers} setArr={setLosers} member={m} />)}
        </div>
      </div>
      <div className={styles.buttons}>
        <Button variant="contained" color="success" onClick={onClickAddRecord}>경기 기록 추가하기</Button>
        <Button variant="outlined" color="error" onClick={onClickInit}>초기화하기</Button>
      </div>
      <div className={styles.members}>
        {memberList.map(m => <RecordForm_Member winner={winner} loser={loser} winners={winners} setWinners={setWinners} losers={losers} setLosers={setLosers} member={m} />)}
      </div>
    </>
  )
}

export default RecordForm