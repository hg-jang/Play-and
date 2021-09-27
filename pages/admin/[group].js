import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminConfig from '../../src/components/AdminConfig'
import AdminRecording from '../../src/components/AdminRecording'
import AdminMembers from '../../src/components/AdminMembers'
import styles from '../../src/css/admin-group.module.css'
import { useRouter } from "next/router"
import { dbService } from '../../src/fbase'
// import styles from '../../src/admin/css/Admin.module.css'
import Header from '../../src/admin/component/Header';
import CreateUser from '../../src/admin/component/CreateUser'
import RegiMatch from '../../src/admin/component/RegiMatch'
import UserList from '../../src/admin/component/UserList'
import MatchList from '../../src/admin/component/MatchList'
import GroupJoinWant from '../../src/admin/component/GroupJoinWant'
import { CHANGE_CONTENT } from '../../reducers/group';

const admin_main = () => {
  const { content } = useSelector((state) => state.group)
  const dispatch = useDispatch()
  // const [allUsers, setAllUsers] = useState([]);
  // const [allGame, setAllGame] = useState([]);
  // const router = useRouter()
  // const { group } = router.query
  // const groupName = group

  // async function getWholeplayers() {
  //   const snapshot = await dbService.collection(group).doc("group_data").collection("players").orderBy("rating","desc").get();
  //   snapshot.forEach(doc => {
  //     const userObject = {
  //       name:doc.data().name,
  //       rating:doc.data().rating,
  //       start_rating: doc.data().start_rating,
  //       game_all:doc.data().game_all,
  //       game_win:doc.data().game_win,
  //       game_lose:doc.data().game_lose,
  //       studentid:doc.data().studentid,
  //       department:doc.data().department,
  //       status: doc.data().status,
  //       time:doc.data().time,
  //       attachmentUrl:doc.data().attachmentUrl
  //     }
  //     setAllUsers(allUsers => [...allUsers, userObject]);
  //   })
  // }
  // async function getWholeGames() {
  //   const snapshot = await  dbService.collection(group).doc("group_data").collection("games").orderBy("write_time","desc").limit(10).get();
  //   snapshot.forEach(doc => {
  //     const gameObject = {
  //       winners: doc.data().winners,
  //       losers: doc.data().losers,
  //       ratingChange: doc.data().ratingChange,
  //       percentage: doc.data().percentage,
  //       date: doc.data().date,
  //       time: doc.data().write_time,
  //       id: doc.data().date+'-'+doc.data().write_time,
  //       winnerRatingAfter: doc.data().winnerRatingAfter,
  //       loserRatingAfter: doc.data().loserRatingAfter
  //     }
  //     setAllGame(allGame => [...allGame, gameObject]);
  //   })
  // }
  // useEffect(() => {
  //   if(router.query.group){
  //     getWholeplayers();
  //     getWholeGames();
  //   }
  // }, [router])

  useEffect(() => {
    dispatch({
      type: CHANGE_CONTENT,
      data: 'admin-config',
    })
  }, [])
  return (
    // <div className={styles.AdminMain}>
    //   <Header group={groupName}/>
    //   <div className={styles.Content}>
    //     <CreateUser allUsers={allUsers} group={groupName}/>
    //     <RegiMatch allUsers={allUsers} group={groupName}/>
    //     <UserList allUsers={allUsers} group={groupName}/>
    //     <MatchList allGame={allGame} group={groupName}/>
    //     <GroupJoinWant group={groupName}/>
    //   </div>
    // </div>
    <div className={styles.admin_container}>
      {content === 'admin-config' && <AdminConfig />}
      {content === 'admin-recording' && <AdminRecording />}
      {content === 'admin-members' && <AdminMembers />}
    </div>
  )
};

export default admin_main