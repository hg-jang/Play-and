import React from 'react';
import { useSelector } from 'react-redux';

import styles from '../../styles/group.module.css'
import GroupLayout from '../../src/Layouts/GroupLayout'
import GameRecordFilter from '../../src/GroupComponents/GameRecordFilter'
import GameRecord from '../../src/GroupComponents/GameRecord'

const games_page = () => {
  const games = useSelector((state) => state.group.currentGroup?.findedGames)

  return (
    <GroupLayout>
      <div className={styles.container_games}>
        <GameRecordFilter />
        <div className={styles.game_records}>
          {typeof games !== 'undefined' && games.map((g) => <GameRecord game={g} />)}
        </div>
      </div>
    </GroupLayout>
  )
}

export default games_page