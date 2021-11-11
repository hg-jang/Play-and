import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fbFirestore } from '../../src/fbase';
import {
  collection,
  getDocs,
} from 'firebase/firestore';
import {
  LOAD_GROUP_INFO_REQUEST,
  LOAD_MEMBERS_REQUEST,
  LOAD_AWAITORS_REQUEST,
} from '../../reducers/group';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import styles from '../../styles/admin.module.css'
import AdminLayout from '../../src/layouts/adminLayout';
import Dashboard from '../../src/groupAdminComponents/dashboard';
import Config from '../../src/groupAdminComponents/config'
import Recording from '../../src/groupAdminComponents/recording'
import Members from '../../src/groupAdminComponents/members'

const admin_page = () => {
  const router = useRouter()
  const { group } = router.query

  const dispatch = useDispatch()
  const { content, isGroupInfoLoaded, isMembersLoaded, isAwaitorsLoaded } = useSelector((state) => state.group)

  const loadGroupInfo = () => {
    dispatch({
      type: LOAD_GROUP_INFO_REQUEST,
      data: group,
    })
  }

  // 멤버 목록 가져오기
  const loadMembers = async () => {
    let membersArr = []
    const memberSnapshot = await getDocs(collection(fbFirestore, group, "group data", "members"))
    memberSnapshot.forEach((doc) => {
      membersArr = membersArr.concat(doc.data().uid)
    })

    dispatch({
      type: LOAD_MEMBERS_REQUEST,
      data: {
        group,
        membersArr,
      }
    })
  }

  // 가입 대기자 목록 가져오기
  const loadAwaitors = async () => {
    let awaitorsArr = []
    const awaitorSnapshot = await getDocs(collection(fbFirestore, group, "group data", "awaitors"))
    awaitorSnapshot.forEach((doc) => {
      awaitorsArr = awaitorsArr.concat(doc.data().uid)
    })
    
    dispatch({
      type: LOAD_AWAITORS_REQUEST,
      data: {
        group,
        awaitorsArr,
      }
    })
  }

  useEffect(() => {
    if(router.query.group) {
      loadGroupInfo()
      loadMembers()
      loadAwaitors()
    }
  }, [router])

  return (
    <AdminLayout>
      {isGroupInfoLoaded && isMembersLoaded && isAwaitorsLoaded
      ? <div className={styles.admin_container}>
         {content === 'admin-dashboard' && <Dashboard />}
         {content === 'admin-config' && <Config />}
         {content === 'admin-recording' && <Recording />}
         {content === 'admin-members' && <Members />}
       </div>
      : <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>}
    </AdminLayout>
  )
}

export default admin_page