import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { fbaseFirestore } from '../../src/fbase'
// import Ranking from "../../src/components/Ranking"
// import MemberList from "../../src/components/MemberList"
// import Community from "../../src/components/Community"
// import RecentGame from "../../src/components/RecentGame"
// import Ad from "../../src/public/component/Ad"
import styles from '../../src/css/group.module.css'
import { SET_GAMES, SET_MEMBERS } from '../../reducers/group'

const group_index = () => {
  const router = useRouter()
  const { group } = router.query
  
  const dispatch = useDispatch()
  const { content, currentGroup } = useSelector((state) => state.group)

  const getGames = () => {
    let gamesArr = []
    fbaseFirestore.collection(group).doc('group data').collection('games').get()
    .then((games) => {
      games.forEach((game) => {
        const gameObj = {
          winnerRatingAfter: game.data().winnerRatingAfter,
          loserRatingAfter: game.data().loserRatingAfter,
          winners: game.data().winners,
          losers: game.data().losers,
          ratingChange: game.data().ratingChange,
          percentage: game.data().percentage,
          date: game.data().date,
          time: game.data().writeTime,
          id: `${game.data().date}-${game.data().writeTime}`,
        }
        gamesArr = gamesArr.concat(gameObj)
      })
    })
    .then(() => {
      dispatch({
        type: SET_GAMES,
        data: gamesArr,
      })
    })
  }

  const getMembers = () => {
    let membersArr = []

    fbaseFirestore.collection(group).doc('group data').collection('members').get()
    .then((members) => {
      members.forEach((member) => {
        const memberObj = {
          displayName: member.data().displayName,
          photoURL: member.data().photoURL,
          joinedDate: member.data().joinedDate,
          rating: member.data().rating,
          start_rating: member.data().start_rating,
          allGames: member.data().allGames,
          winnedGames: member.data().winnedGames,
          losedGames: member.data().losedGames,
          status: member.data().status,
        }
        membersArr = membersArr.concat(memberObj)
      })
    })
    .then(() => {
      dispatch({
        type: SET_MEMBERS,
        data: membersArr,
      })
    })
  }


  useEffect(() => {
    if(router.query.group) {
      getGames()
      getMembers()
    }
  }, [router])

  useEffect(() => {
    console.log('가져온 그룹 정보 : ', currentGroup);
  }, [currentGroup])

  return (
    <>
      {/* <div className={styles.contents}>
        {content === 'community' && <Community />}
        {content === 'ranking' && <Ranking />}
        {content === 'member list' && <MemberList />}
      </div>
      {content !== 'community' &&
      <div className={styles.asides}>
        <div className={styles.aside1}>
          <RecentGame wholeGames={wholeGames} />
        </div>
        <div className={styles.aside2}>
          <Ad />
        </div>
      </div>
      } */}
    </>
  )
}

export default group_index