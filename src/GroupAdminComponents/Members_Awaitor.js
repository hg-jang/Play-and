import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getDate } from '../../sagas/user';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_JOINED_GROUP_REQUEST,
  ADD_MEMBER_REQUEST,
  REMOVE_AWAITOR_REQUEST,
} from '../../reducers/group';

import Avatar from '@mui/material/Avatar';

import styles from '../../styles/admin_Members_Awaitor.module.css'

const Members_Awaitor = ({awaitor, index}) => {
  const router = useRouter()
  const { group } = router.query

  const dispatch = useDispatch()
  const { isGroupInfoEdited } = useSelector((state) => state.group)
  const createdDate = useSelector((state) => state.group.currentGroup?.createdDate)
  const groupIntroduce = useSelector((state) => state.group.currentGroup?.groupIntroduce)
  const numberOfMember = useSelector((state) => state.group.currentGroup?.numberOfMember)

  const onClickAdmit = useCallback(() => {
    const awaitorInfo = {
      displayName: awaitor.displayName,
      uid: awaitor.uid,
      photoURL: awaitor.photoURL,
      joinedDate: getDate(),
      status: '새로운 멤버',
      rating: 1500,
      allGames: 0,
      winnedGames: 0,
      losedGames: 0,
    }

    dispatch({
      type: ADD_MEMBER_REQUEST,
      data: {
        group,
        uid: awaitor.uid,
        info: awaitorInfo,
      }
    })
  }, [awaitor])

  const onClickDeny = useCallback(() => {
    dispatch({
      type: REMOVE_AWAITOR_REQUEST,
      data: {
        group,
        uid: awaitor.uid,
      }
    })
  }, [awaitor])

  // 가입 승인을 했을 때,
  // 그룹 인포가 업데이트 된 뒤에 유저의 가입 그룹 목록 업데이트 리퀘스트 하기
  useEffect(() => {
    if(isGroupInfoEdited) {
      const groupInfo = {
        createdDate: createdDate,
        groupIntroduce: groupIntroduce,
        groupName: group,
        isAdmin: false,
        joinedDate: getDate(),
        numberOfMember: numberOfMember,
      }
      dispatch({
        type: ADD_JOINED_GROUP_REQUEST,
        data: {
          group,
          uid: awaitor.uid,
          groupInfo,
        }
      })
    }
  }, [isGroupInfoEdited])

  return (
    <div className={styles.awaitor} key={index}>
      <Avatar sx={{ width: 68, height: 68 }} src={awaitor.photoURL} alt="awaitor"/>
      <div>
        <div>{awaitor.displayName}</div>
        <span data-uid={awaitor.uid} onClick={onClickAdmit}>승인</span>
        <span data-uid={awaitor.uid} onClick={onClickDeny}>거절</span>
      </div>
    </div>
  )
}

export default Members_Awaitor