import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { degToRad, drawBase, drawGreenCircle, drawRedCircle } from './MemberWinningRate'

import styles from '../../styles/Rate.module.css'

const MemberRankingRate = ({ member }) => {
  const canvasRef = useRef()
  const members = useSelector((state) => state.group.currentGroup?.members.concat().sort((a, b) => b.rating - a.rating))

  // 레이팅으로 user 랭킹 상위퍼센티지 구하기
  const getRankingRate = () => {
    // member의 rating 랭킹
    const ranking = members.indexOf(member[0]) + 1
    // 본인 순위 / 전체 인원
    const percentage = ranking / members.length

    return Math.round(percentage * 100)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // 상위 퍼센티지
    drawBase(ctx, 70, 70, 20, 0, Math.PI * 2, false)
    if(getRankingRate() === 0) {
      drawGreenCircle(ctx, 70, 70, 46, degToRad(270), degToRad(-90), true)
    } else if(getRankingRate() === 100) {
      drawRedCircle(ctx, 70, 70, 46, degToRad(270), degToRad(-90), false)
    } else {
      drawGreenCircle(ctx, 70, 70, 46, degToRad(270), degToRad(270 - (360 * (1 - getRankingRate()))), true)
      drawRedCircle(ctx, 70, 70, 46, degToRad(270), degToRad(270 - (360 * (1 - getRankingRate()))), false)
    }
  }, [])

  return (
    <div className={styles.circle_box}>
      <canvas width="140" height="140" ref={canvasRef} className="canvas"></canvas>
      <span className={styles.hover}>Hover me!</span>
      <div className={styles.hover_box}>
        <span className={styles.hover__left}>상위</span>
        <span className={styles.hover__right}>{getRankingRate()} %</span>
      </div>
    </div>
  )
}

export default React.memo(MemberRankingRate)