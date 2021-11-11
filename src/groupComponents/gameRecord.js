import React from 'react';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const GameRecord = ({ game, index }) => {
  
  return (
    <div className="game" key={index}>
      <div className="top">{game.playedDate.slice(0, 4)}년 {game.playedDate.slice(4, 6)}월 {game.playedDate.slice(6)}일</div>
      <div className="bot">
        {game.winners.length === 2
        ? <>
            <div className="winner">
              <span>Winner! ^^</span>
              <div className="winner_info">
                <div className="names">
                  <span>{game.winners[0]}</span>
                  <span>{game.winners[1]}</span>
                </div>
                <div className="change">
                  <span>{game.ratingChange}<ArrowDropUpIcon size="small" color="success" /></span>
                  <span>{game.ratingChange}<ArrowDropUpIcon size="small" color="success" /></span>
                </div>
              </div>
            </div>
            <div className="loser">
              <span>loser! ㅠㅠ</span>
              <div className="loser_info">
                <div className="names">
                  <span>{game.losers[0]}</span>
                  <span>{game.losers[1]}</span>
                </div>
                <div className="change">
                  <span>{game.ratingChange}<ArrowDropDownIcon size="small" color="error" /></span>
                  <span>{game.ratingChange}<ArrowDropDownIcon size="small" color="error" /></span>
                </div>
              </div>
            </div>
          </>
        : <>
            <div className="winner">
              <span>Winner! ^^</span>
              <div className="winner_info">
                <div className="names">
                  <span>{game.winners[0]}</span>
                </div>
                <div className="change">
                  <span>{game.ratingChange}<ArrowDropUpIcon size="small" color="success" /></span>
                </div>
              </div>
            </div>
            <div className="loser">
                <span>loser! ㅠㅠ</span>
                <div className="loser_info">
                  <div className="names">
                    <span>{game.losers[0]}</span>
                  </div>
                  <div className="change">
                    <span>{game.ratingChange}<ArrowDropDownIcon size="small" color="error" /></span>
                  </div>
                </div>
            </div>
          </>}
      </div>
    </div>
  )
}

export default GameRecord