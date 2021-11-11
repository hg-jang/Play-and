import React from 'react'
import { useSelector } from 'react-redux'

import Button from '@mui/material/Button'

import styles from '../../styles/group.module.css'
import GroupLayout from '../../src/Layouts/groupLayout'
import MemberDetail from '../../src/GroupComponents/memberDetail'
import Aside from '../../src/GroupComponents/aside'

const member_page = () => {
  const uid = useSelector((state) => state.group.detailedMember)
  const games = useSelector((state) => state.group.currentGroup?.games.slice(0, 5))

  return (
    <GroupLayout>
      <div className={styles.container_member_detail}>
        <div className={styles.detail}>
          <MemberDetail memberId={uid} />
          <Button variant="contained">Go Back</Button>
        </div>
        <Aside games={games} />
      </div>
    </GroupLayout>
  )
}

export default member_page