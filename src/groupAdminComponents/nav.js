import React, { useCallback } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { CHANGE_CONTENT } from "../../reducers/group";

import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';

import styles from '../../styles/admin_Nav.module.css';

const Nav = () => {
  const router = useRouter()
  const { group } = router.query

  const dispatch = useDispatch()

  const onClickList = useCallback((e) => {
    const content = e.target.dataset.content

    dispatch({
      type: CHANGE_CONTENT,
      content,
    })
  }, [])

  return (
    <div className={styles.nav}>
      <div>
        <h1>{group}</h1>
      </div>
      <ul>
        <li data-content="admin-dashboard" onClick={onClickList}><DashboardIcon />대쉬보드</li>
        {/* <li data-content="admin-config" onClick={onClickList}><SettingsIcon />설정</li> */}
        <li data-content="admin-recording" onClick={onClickList}><AssignmentIcon />경기 기록</li>
        <li data-content="admin-members" onClick={onClickList}><PeopleIcon />멤버 관리</li>
        <li><Link href="/my-groups"><a>뒤로 가기</a></Link></li>
      </ul>
    </div>
  )
}

export default Nav