import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOAD_JOINED_GROUPS_REQUEST } from '../reducers/group'
import Router from 'next/router';
import Link from 'next/link'
import { fbFirestore } from '../src/fbase';
import {
  collection,
  getDocs,
} from 'firebase/firestore';

import Button from '@mui/material/Button'

import styles from '../styles/my-groups.module.css'
import GroupCard from '../src/components/groupCard'
import PublicLayout from '../src/layouts/publicLayout'

const my_groups = () => {
  const dispatch = useDispatch()
  const uid = useSelector((state) => state.user.currentUser?.uid)
  const { joinedGroups } = useSelector((state) => state.group)

  // 유저가 속한 그룹 목록 불러오기
  useEffect(async () => {
    if(uid) {
      let groupArr = []
  
      const querySnapshot = await getDocs(collection(fbFirestore, "whole users", uid, "joining groups"))    
      querySnapshot.forEach((doc) => {
        groupArr = groupArr.concat(doc.data().groupName)
      })
  
      return dispatch({
        type: LOAD_JOINED_GROUPS_REQUEST,
        data: {
          uid,
          groupArr,
        }
      })
    }
    // uid 없으면
    Router.replace('/')
  }, [])

  return (
    <PublicLayout>
      <div className={styles.my_groups}>
        <div className={styles.joined_groups}>
          <div className={styles.container__joined_groups}>
            <h1>가입한 그룹</h1>
            <div>
              {joinedGroups && joinedGroups.map((g, idx) => <GroupCard group={g} index={idx} />)}
            </div>
          </div>
        </div>
        <div className={styles.new_group}>
          <div className={styles.container__new_group}>
            <Button variant="contained"><Link href="/create"><a>그룹 생성하기</a></Link></Button>
            <Button variant="contained"><Link href="/join"><a>그룹 가입하기</a></Link></Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}

export default my_groups