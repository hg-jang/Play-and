import React from 'react';
import Avatar from '@mui/material/Avatar';

import styles from '../../styles/RankingCard.module.css'

const RankingCard = ({ member, index }) => {

  return (
    <div className={styles.ranking_card} key={index}>
      <div className={styles.left}>
        <div className={styles.profile_img}>
          <Avatar sx={{ width: 100, height: 100 }} src={member.photoURL} alt="member" />
        </div>
        <div className={styles.name}>
          {member.displayName}
        </div>
      </div>
      <div className={styles.mid}>
        <span className={styles.rating}>
          <span>{member.rating} pt.</span>  
          <span>Rating</span>
        </span>
        <div className={styles.score}>
          <span className={styles.win}>
            <span>{member.winnedGames}</span>
            <span>승</span>
          </span>
          <span className={styles.lose}>
            <span>{member.losedGames}</span>
            <span>패</span>
          </span>
        </div>
      </div>
      <div className={styles.right}>
        <span className={styles.ranking}>{index + 1}</span>
        <span>Ranking</span>
      </div>
    </div>
  )
}

export default RankingCard