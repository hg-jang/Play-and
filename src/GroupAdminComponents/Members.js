import React from 'react'
import { useSelector } from 'react-redux';

import styles from '../../styles/admin_Members.module.css'
import Members_Member from './Members_Member'
import Members_Awaitor from './Members_Awaitor'

const Members = () => {
  const members = useSelector((state) => state.group.currentGroup?.members)
  const awaitors = useSelector((state) => state.group.currentGroup?.awaitors)

  return (
    <div className={styles.admin_members}>
      <div>
        <div className={styles.members_box}>
          <h1>전체 멤버 목록</h1>
          <div>
            {members.map((member, idx) => (
              <Members_Member member={member} index={idx} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className={styles.awaitors_box}>
          <h1>가입 대기자 목록</h1>
          {awaitors
          ? <div className={styles.awaitors}>
              {awaitors.map((awaitor, idx) => (
                <Members_Awaitor awaitor={awaitor} index={idx} />
              ))}
            </div>
          : <div className={styles.no_awaitors}>가입 대기자가 없습니다.</div>}
        </div>
      </div>
    </div>
  )
}

export default Members