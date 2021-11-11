import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useInput from '../../hooks/useInput'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TextField from '@mui/material/TextField';

import styles from '../../styles/group.module.css'
import GroupLayout from '../../src/Layouts/groupLayout'
import RankingCard from '../../src/GroupComponents/rankingCard';
import Aside from '../../src/GroupComponents/aside';

const ranking_page = () => {
  const games = useSelector((state) => state.group.currentGroup?.games.slice(0, 5))
  const members = useSelector((state) => state.group.currentGroup?.members.sort((a, b) => b.rating - a.rating))
  
  const [member, onChangeMember] = useInput('')
  const [MEMBERS, setMEMBERS] = useState(members)
  
  useEffect(() => {
    if(member) { return setMEMBERS(members.filter((m) => m.displayName.includes(member))) }
    return setMEMBERS(members)
  }, [member])

  return (
    <GroupLayout>
      <div className={styles.container_rk_li}>
        <div className={styles.contents}>
          <div className={styles.ranking_filter}>
            <div className="dropdown">
              <div className="dropdown__selected">
                <span className="selected">Not yet..</span>
                <ArrowDropDownIcon size="large" />
              </div>
              <ul className="dropdown__list">
                <li className="dropdown__list__item" data-type="전체">Not yet..</li>
              </ul>
            </div>
            <TextField label="Search Member..." value={member} onChange={onChangeMember} />
          </div>
          <div className={styles.ranking}>
            {MEMBERS && MEMBERS.map((m, idx) => <RankingCard member={m} index={idx} />)}
          </div>
        </div>
        <Aside games={games} />
      </div>
    </GroupLayout>
  )
}

export default ranking_page