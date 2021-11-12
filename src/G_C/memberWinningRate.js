import React, { useEffect, useRef } from 'react'

import styles from '../../styles/Rate.module.css'

// 각도 => 라디안 변환
export const degToRad = (degree) => {
  return degree * (Math.PI / 180)
}

// 기본 원 그리기
export const drawBase = (ctx, x, y, r, S_degree, E_degree, direction) => {
  ctx.beginPath()
  ctx.lineWidth = 4
  ctx.strokeStyle = '#ecf0f1'
  ctx.arc(x, y, r, S_degree, E_degree, direction)
  ctx.stroke()
}

// 승 부분 그리기
// 상위 퍼센티지 그래프에서는 반대로 걸어줘야함. ex) 상위 0.01 => 그 반대인 0.99 곱해야 함
// drawGreenCircle(ctx, x, y, r, degToRad(269), degToRad(270 - (360 * (1 - 0.01)) + 0.5), true)
export const drawGreenCircle = (ctx, x, y, r, S_degree, E_degree, direction) => {
  ctx.beginPath()
  ctx.lineWidth = 40
  ctx.strokeStyle = '#2EC4B6'
  ctx.arc(x, y, r, S_degree, E_degree, direction)
  ctx.stroke()
}

// 패 부분 그리기
export const drawRedCircle = (ctx, x, y, r, S_degree, E_degree, direction) => {
  ctx.beginPath()
  ctx.lineWidth = 40
  ctx.strokeStyle = '#e74c3c'
  ctx.arc(x, y, r, S_degree, E_degree, direction)
  ctx.stroke()
}

const MemberWinningRate = ({ member }) => {
  const canvasRef = useRef()
  
  // 승률 계산
  const getWinningRate = () => {
    if(member.allGames === 0) { return 1 }
    return member.winnedGames / member.allGames
  }  

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')  
    drawBase(ctx, 70, 70, 20, 0, Math.PI * 2, false)
    
    // 승/패 그리기
    if(getWinningRate() === 0) {        // 승이 0인 경우
      drawRedCircle(ctx, 70, 70, 46, degToRad(270), degToRad(-90), false)
    } else if(getWinningRate() === 1) { // 패가 0인 경우
      drawGreenCircle(ctx, 70, 70, 46, degToRad(270), degToRad(-90), true)
    } else {                            // 그 외 일반상황
      drawGreenCircle(ctx, 70, 70, 46, degToRad(270), degToRad(270 - 360 * getWinningRate()), true)
      drawRedCircle(ctx, 70, 70, 46, degToRad(270), degToRad(270 - 360 * getWinningRate()), false)
    }
  }, [])
  
  return (
    <div className={styles.circle_box}>
      <canvas width="140" height="140" ref={canvasRef} className="canvas"></canvas>
      <span className={styles.hover}>Hover me!</span>
      <div className={styles.hover_box}>
        <span className={styles.hover__left}>{member.winnedGames} 승</span>
        <span className={styles.hover__right}>{member.losedGames} 패</span>
      </div>
    </div>
  )
}

export default React.memo(MemberWinningRate)