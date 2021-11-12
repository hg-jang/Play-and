import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { LOG_IN_SUCCESS } from '../../reducers/user'
import { fbAuth } from '../fbase'
import { onAuthStateChanged } from '@firebase/auth'

import styles from '../../styles/GroupLayout.module.css'

const GroupLayout = ({ children }) => {
  const router = useRouter()
  const { group } = router.query
  
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(fbAuth, (user) => {
      if(user) {
        dispatch({
          type: LOG_IN_SUCCESS,
          data: user,
        })
      }
    })
  }, [])
  return (
    <div className={styles.group_grid}>
      <div className={styles.nav}>
        <ul>
          <li data-content="community">커뮤니티</li>
          <li data-content="ranking"><Link href={`/${group}/ranking`}><a>멤버 랭킹</a></Link></li>
          <li data-content="member list"><Link href={`/${group}/members`}><a>멤버 리스트</a></Link></li>
          <li data-content="game records"><Link href={`/${group}/games`}><a>경기 기록</a></Link></li>
          <li><Link href="/my-groups"><a>선택 화면으로</a></Link></li>
        </ul>
        <footer>
          <p className={styles.footer__top}>&copy; 2021, Built by</p>
          <p className={styles.footer__bot}>gilmujjang & Hyeon-Gwang</p>
        </footer>
      </div>
      { children }
    </div>
  )
}

export default GroupLayout