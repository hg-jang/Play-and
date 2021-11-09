import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import {
  LOAD_AWAITING_GROUPS_REQUEST,
  LOAD_WHOLE_GROUPS_REQUEST,
  ADD_AWAITOR_REQUEST
} from '../reducers/group';
import { fbFirestore } from '../src/fbase';
import { collection, getDocs } from '@firebase/firestore';

import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import styles from '../styles/join.module.css'
import PublicLayout from '../src/Layouts/PublicLayout';

const WhiteTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    color: '#fff',
  },
  '& .MuiOutlinedInput-root': {
    color: '#fff',

    '& fieldset': {
      borderColor: '#fff',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
    },
  },
});

const join = () => {
  const [filteredGroups, setFilteredGroups] = useState([])

  const [group, onChangeGroup] = useInput('')

  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
  const { wholeGroups, joinedGroups, awaitingGroups } = useSelector((state) => state.group)
  
  const onClickJoin = useCallback((e) => {
    const group = e.target.dataset.group

    const isJoined = joinedGroups.find((g) => g.groupName === group)
    const isAwaiting = awaitingGroups.find((g) => g.groupName === group)

    if(isJoined) { return alert('이미 가입한 그룹입니다. :D') }
    else if(isAwaiting) { return alert('이미 신청한 그룹입니다. :D') }

    dispatch({
      type: ADD_AWAITOR_REQUEST,
      data: {
        group,
        memberId: currentUser.uid,
        info: {
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          uid: currentUser.uid 
        }
      },
    })
  }, [awaitingGroups, joinedGroups])

  useEffect(() => {
    if(group) {
      return setFilteredGroups(wholeGroups.filter(g => g.groupName.includes(group)))
    }
    return setFilteredGroups([])
  }, [group])

  useEffect( async () => {
    // 전체 그룹 목록 가져오기
    let groupsArr = []
    const wholeGroupsSnapshot = await getDocs(collection(fbFirestore, 'whole groups'))
    wholeGroupsSnapshot.forEach((doc) => {
      groupsArr = groupsArr.concat(doc.data().groupName)
    })

    // 가입 신청한(대기중인) 그룹 모록 가져오기
    let awaitingGroupsArr = []
    const awaitingGroupsSnapshot = await getDocs(collection(fbFirestore, 'whole users', currentUser.uid, 'awaiting groups'))
    awaitingGroupsSnapshot.forEach((doc) => {
      awaitingGroupsArr = awaitingGroupsArr.concat(doc.data().groupName)
    })

    dispatch({
      type: LOAD_WHOLE_GROUPS_REQUEST,
      data: groupsArr,
    })

    dispatch({
      type: LOAD_AWAITING_GROUPS_REQUEST,
      data: {
        arr: awaitingGroupsArr,
        memberId: currentUser.uid,
      }
    })

  }, [])

  return (
    <PublicLayout>
      <div className={styles.join_group}>
        <WhiteTextField label="원하는 그룹을 찾으세요." variant="outlined" onChange={onChangeGroup} value={group} />
        <div className={styles.groups}>
          {filteredGroups.map((el, index) => 
            <Card sx={{ minWidth: 232 }} key={index}>
              <CardContent>
                <Typography>{el.groupName}</Typography>
                <Typography color="text.secondary">{el.groupIntroduce}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" onClick={onClickJoin} data-group={el.groupName}>가입 신청</Button>
              </CardActions>
            </Card>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}

export default join