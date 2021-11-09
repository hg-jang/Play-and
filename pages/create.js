import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { getDate } from '../sagas/user'
import { LOAD_WHOLE_GROUPS_REQUEST, CREATE_GROUP_REQUEST } from '../reducers/group';
import { fbFirestore } from '../src/fbase';
import { collection, getDocs } from '@firebase/firestore';

import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import styles from "../styles/create.module.css";
import PublicLayout from '../src/layouts/PublicLayout';
import useInput from '../hooks/useInput';

const WhiteTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    color: '#fff',
  },
  '& .MuiInputBase-root': {
    color: '#fff',    // 인풋 폰트
  },
  '& .MuiInputBase-root:before': {
    color: '#fff',    // 인풋 폰트
    borderColor: '#fff'
  },
})

const create = () => {
  const router = useRouter()

  const dispatch = useDispatch()

  const { currentUser } = useSelector((state) => state.user)
  const { wholeGroups, isGroupCreated } = useSelector((state) => state.group)

  const [groupName, onChangeGroupName] = useInput('')
  const [introduce, onChangeIntroduce] = useInput('')

  const onClickCreate = () => {
    if(groupName.length === 0) { return alert('그룹 이름을 입력 해주세요.') }
    if(introduce.length === 0) { return alert('그룹 소개를 입력 해주세요.') }
    
    const isExisting = wholeGroups.find((g) => g.groupName === groupName)
    if(isExisting) { return alert('존재하는 그룹 이름입니다.') }

    dispatch({
      type: CREATE_GROUP_REQUEST,
      data: {
        groupName: groupName,
        groupIntroduce: introduce,
        date: getDate(),
        memberInfo: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }
      }
    })
  }

  useEffect(() => {
    if(!currentUser) { router.replace('/') }
    if(isGroupCreated) {
      alert('그룹 생성을 완료하였습니다')
      router.replace('/')
    }
  }, [currentUser, isGroupCreated])

  useEffect(async () => {
    if(!wholeGroups) {
      // 전체 그룹 목록 가져오기
      let groupsArr = []
      const wholeGroupsSnapshot = await getDocs(collection(fbFirestore, 'whole groups'))
      wholeGroupsSnapshot.forEach((doc) => {
        groupsArr = groupsArr.concat(doc.data().groupName)
      })

      dispatch({
        type: LOAD_WHOLE_GROUPS_REQUEST,
        data: groupsArr,
      })
    }
  }, [])

  return (
    <PublicLayout>
      <div className={styles.create_group}>
        <h1>그룹 생성하기</h1>
        <div className={styles.container}>
          <div className={styles.name}>
            <WhiteTextField fullWidth variant="standard" label="Group Name" value={groupName} onChange={onChangeGroupName}  />
          </div>
          <div className={styles.introduce}>
            <WhiteTextField fullWidth variant="standard" label="Introduce your group" value={introduce} onChange={onChangeIntroduce} />
          </div>
        </div>
        <Button variant="contained" onClick={onClickCreate}>생성하기</Button>
      </div>
    </PublicLayout>
  )
}

export default create