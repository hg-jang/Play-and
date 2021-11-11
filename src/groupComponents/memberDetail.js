import React from 'react';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import styles from '../../styles/MemberDetail.module.css';
import GameRecord from './gameRecord';
import MemberWinningRate from './memberWinningRate';
import MemberRankingRate from './memberRankingRate';
import MemberChart from './memberChart';

const MemberDetail = ({ member }) => {
  const games = useSelector((state) => state.group.currentGroup?.games.filter((g) => g.winners.includes(member.displayName) || g.losers.includes(member.displayName)))

  return (
    <Card id={styles.detail_card}>
      <CardContent>
        <Avatar sx={{ width: 120, height: 120, mr: "32px" }} src={member.photoURL} alt="member" />
        <div>
          <Typography variant="h4" component="div">
            {member.displayName}
          </Typography>
          <Typography variant="h5">
            {member.status}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Rating : {member.rating}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {member.allGames}전 {member.winnedGames}승 {member.losedGames}패
          </Typography>
        </div>
        <div className={styles.circle_rate}>
          <MemberWinningRate member={member} />
          <MemberRankingRate member={member} />
        </div>
      </CardContent>
      <CardContent>
        <MemberChart memberId={memberId} />
        <div className={styles.records}>
          {games.map((game) => <GameRecord game={game} />)}
        </div>
      </CardContent>
    </Card>
  )
}

export default MemberDetail