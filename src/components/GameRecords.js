import React, { useMemo } from 'react';
import { Icon } from 'semantic-ui-react'

const getGameRecordForm = (arr) => {
  return arr.slice(0, 5).map((el, index) => (
    <div className="game" key={index}>
      <div className="top">{el.date.slice(0, 4)}년 {el.date.slice(4, 6)}월 {el.date.slice(6)}일</div>
      <div className="bot">
        {el.winners.length === 2 ?
          <>
          <div className="winner">
            <span>Winner! ^^</span>
            <div className="winnerInfo">
              <div className="winnerNames">
                <span className="winner__name">{el.winners[0]}</span>
                <span className="winner__name">{el.winners[1]}</span>
              </div>
              <div className="winnerRatings">
                <span className="winner__rating>">{el.ratingChange}<Icon name="caret up" className="icon__win" /></span>
                <span className="winner__rating>">{el.ratingChange}<Icon name="caret up" className="icon__win" /></span>
              </div>
            </div>
          </div>
          <div className="loser">
            <span>loser! ㅠㅠ</span>
            <div className="loserInfo">
              <div className="loserNames">
                <span className="loser__name">{el.losers[0]}</span>
                <span className="loser__name">{el.losers[1]}</span>
              </div>
              <div className="loserRatings">
                <span className="loser__rating>">{el.ratingChange}<Icon name="caret down" className="icon__lose" /></span>
                <span className="loser__rating>">{el.ratingChange}<Icon name="caret down" className="icon__lose" /></span>
              </div>
            </div>
          </div>
          </>
        :
          <>
          <div className="winner">
            <span>Winner! ^^</span>
            <div className="winnerInfo">
              <div className="winnerNames">
                <span className="winner__name">{el.winners[0]}</span>
              </div>
              <div className="winnerRatings">
                <span className="winner__rating>">{el.ratingChange}<Icon name="caret up" className="icon__win" /></span>
              </div>
            </div>
          </div>
          <div className="loser">
              <span>loser! ㅠㅠ</span>
              <div className="loserInfo">
                <div className="loserNames">
                  <span className="loser__name">{el.losers[0]}</span>
                </div>
                <div className="loserRatings">
                  <span className="loser__rating>">{el.ratingChange}<Icon name="caret down" className="icon__lose" /></span>
                </div>
              </div>
          </div>
          </>
        }
      </div>
    </div>
  ))
}

const GameRecords = ({ games }) => {
  const gameRecords = useMemo(() => getGameRecordForm(games), [games])
  
  return (
    <>
      {
      games.length > 0 ?
        <div className="games">
          {gameRecords}
        </div>
      :
      <div className="no_game">
        <span>경기 기록이 없습니다.</span>
      </div>
      }
    </>
  )
}

export default GameRecords