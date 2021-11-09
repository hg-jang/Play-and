import React from 'react'

import styles from '../../styles/Aside.module.css'
import GameRecord from './GameRecord'
import Ad from './Ad'

const Aside = ({ games }) => {

  return (
    <div className={styles.asides}>
      <div className={styles.aside1}>
        {games.length !== 0
        ? <div className="games">
            {games.map((game, idx) => <GameRecord game={game} index={idx} />)}  
          </div>
        : <div className="no_game">경기 기록이 없습니다.</div>}
      </div>
      <div className={styles.aside2}>
        <Ad />
      </div>
    </div>
  )
}

export default Aside