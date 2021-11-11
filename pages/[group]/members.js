import React, { useState } from 'react'
import useInput from '../../hooks/useInput'
import { useSelector } from 'react-redux'

import TextField from '@mui/material/TextField'

import styles from '../../styles/group.module.css'
import GroupLayout from '../../src/Layouts/groupLayout'
import MemberCard from '../../src/GroupComponents/memberCard'
import Aside from '../../src/GroupComponents/aside'

const members_page = () => {
  const [member, onChangeMember] = useInput('')

  const members = useSelector((state) => state.group.currentGroup?.members)
  const games = useSelector((state) => state.group.currentGroup?.games)

  return (
    <GroupLayout>
      <div className={styles.container_rk_li}>
        <div className={styles.contents}>
          <div className={styles.input_box}>
            <TextField value={member} label="Search Member..." onChange={onChangeMember} />
          </div>
          <div className={styles.member_list}>
            <div className={styles.members}>
              {members.map((m, index) => <MemberCard member={m} index={index} />)}
            </div>
          </div>
        </div>
        <Aside games={games} />
      </div>
    </GroupLayout>
  )
}

export default members_page