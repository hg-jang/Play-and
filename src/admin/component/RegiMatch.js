import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css"
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'
import DatePicker from "react-datepicker";
import { dbService } from '../../fbase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import classNames from 'classnames';
import styles from '../css/Admin.module.css'

const RegiMatch = ({allUsers, group}) => {
  const increment = firebase.firestore.FieldValue.increment(1);
  const [searchWinner,setSearchWinner] = useState("");
  const [winnersRating, setWinnersRating] = useState([]);
  const [searchLoser,setSearchLoser] = useState("");
  const [losersRating, setLosersRating] = useState([]);
  const [gameUser, setGameUser] = useState("");
  const [winners, setWinners] = useState([]);
  const [losers, setLosers] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [allUserList, setAllUserList] = useState([])

  useEffect(() => {
    allUsers.map(user => {
      setAllUserList(allUserList => [...allUserList, user.name])
    })
  }, [allUsers])

  const stateInit = () => {
    setSearchWinner('');
    setSearchLoser('');
    setWinners([]);
    setLosers([]);
    setGameUser([]);
    setWinnersRating([]);
    setLosersRating([]);
  }

  const winnerChange = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if(winners.length>=2){
        alert('2명이하만')
        setSearchWinner('');
        return;
      } else {  //2명 이하이고
        if(allUserList.includes(searchWinner)){  //유저목록에 있으면
          if(gameUser.includes(searchWinner)){  //이면서 들어가있으면 안됨
            alert("이미 등록된 유저입니다")
            setSearchWinner('');
            return;
          } else {
            setWinners(winners.concat(searchWinner))
            setGameUser(gameUser.concat(searchWinner))
            dbService.collection(group).doc("group_data").collection("players").where("name","==",searchWinner).get().then((snapshot) => {
              snapshot.forEach((doc) => {
                setWinnersRating(winnersRating.concat(doc.data().rating));
              })
            })
            setSearchWinner('');  
          }  
            
        } else if(Number.isInteger(parseInt(searchWinner))){
          setWinners(winners.concat(searchWinner))
          setSearchWinner('');
          setWinnersRating(winnersRating.concat(Number(searchWinner)));  

        } else { //등록된 유저가 아니면
          alert('등록된 유저가 아닙니다')
          setSearchWinner('');
        }
      }
    } else { 
      setSearchWinner(e.target.value);
    }
  };

  const loserChange = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if(losers.length>=2){
        alert('2명이하만')
        setSearchLoser('');
        return;
      } else {  //2명 이하이고
        if(allUserList.includes(searchLoser)){  //유저목록에 있으면
          if(gameUser.includes(searchLoser)){
            alert("이미 등록된 유저입니다")
            setSearchLoser('');
            return;
          } else {
            setGameUser(gameUser.concat(searchLoser))
            setLosers(losers.concat(searchLoser))
            dbService.collection(group).doc("group_data").collection("players").where("name","==",searchLoser).get().then((snapshot) => {
              snapshot.forEach((doc) => {
                setLosersRating(losersRating.concat(doc.data().rating));
              })
            })
            setSearchLoser('');
          }

        } else if(Number.isInteger(parseInt(searchLoser))){
          setLosers(losers.concat(searchLoser))
          setSearchLoser('');
          setLosersRating(losersRating.concat(Number(searchLoser)));
        } else { //등록된 유저가 아니면
          alert('등록된 유저가 아닙니다')
          setSearchLoser('');
        }
      }
    } else { 
      setSearchLoser(e.target.value);
    }
  };

  const matchSubmit = async(e) => {
    e.preventDefault();
    let winnerAverageRating = winnersRating[0];
    let loserAverageRating = losersRating[0];
    if(winnersRating.length==2){
      winnerAverageRating = (Math.max(winnersRating[0],winnersRating[1])+2*Math.min(winnersRating[0],winnersRating[1]))/3
    }
    if(losersRating.length==2){
      loserAverageRating = (Math.max(losersRating[0],losersRating[1])+2*Math.min(losersRating[0],losersRating[1]))/3
    }
    const percentage = (1/(1+(Math.pow(10,(loserAverageRating-winnerAverageRating)/400)))).toFixed(2)
    const reversePercentage = (1-percentage).toFixed(2)
    let RatingChange=0
    if(winnersRating.length==2){
      RatingChange = Math.round(reversePercentage*16)
    } else {
      RatingChange = Math.round(reversePercentage*32)
    }
    if(winners.length===0){
      alert('승자를 입력하세요');
      return;
    }
    if(losers.length===0){
      alert('패자를 입력하세요');
      return;
    }
    if(winners.length !== losers.length){
      alert("인원을 맞추시오");
      return;
    }

    let now = new Date();   
    let year = now.getFullYear(); // 년도
    let month = now.getMonth() + 1;  // 월
    if(month<10){
      month = 0+''+month
    }
    let date = now.getDate();  // 날짜
    if(date<10){
      date = 0+''+date
    }
    let hours = now.getHours(); // 시
    if(hours<10){
      hours = 0+''+hours
    }
    let minutes = now.getMinutes();  // 분
    if(minutes<10){
      minutes = 0+''+minutes
    }
    let seconds = now.getSeconds();  // 초
    if(seconds<10){
      seconds = 0+''+seconds
    }
    const time = (year + '' + month + '' + date + '' + hours + '' + minutes + '' + seconds)

    year = startDate.getFullYear(); // 년도
    month = startDate.getMonth() + 1;  // 월
    if(month<10){
      month = 0+''+month
    }
    date = startDate.getDate();  // 날짜
    if(date<10){
      date = 0+''+date
    }
    const matchDate = (year + '' + month + '' + date)

    let winnerRatingAfter = winnersRating.map(winner => winner + RatingChange)
    let loserRatingAfter = losersRating.map(loser => loser - RatingChange)

    const match = {
      winners: winners,
      winnerRatingBefore: winnersRating,
      winnerRatingAfter: winnerRatingAfter,
      losers: losers,
      loserRatingBefore: losersRating,
      loserRatingAfter: loserRatingAfter,
      percentage: Math.round(percentage*100),
      ratingChange: RatingChange,
      date: matchDate,
      write_time: time
    }

    if(percentage==NaN){
      alert("percentage is never NaN");
      return;
    }

    await dbService.collection(group).doc("group_data").collection("games").doc(matchDate+'-'+time).set(match);
    
    await winners.map(winner => {
      dbService.collection(group).doc("group_data").collection("players").doc(winner).collection("game_record").doc(matchDate+'-'+time).set(match)
      dbService.collection(group).doc("group_data").collection("players").doc(winner).update({
        rating: winnersRating.shift() + RatingChange,
        game_all: increment,
        game_win: increment
      })
    })
    await losers.map(loser => {
      dbService.collection(group).doc("group_data").collection("players").doc(loser).collection("game_record").doc(matchDate+'-'+time).set(match)
      dbService.collection(group).doc("group_data").collection("players").doc(loser).update({
        rating: losersRating.shift() - RatingChange,
        game_all: increment,
        game_lose: increment
      })
    })
    stateInit();
  }


  const regiMatch = (
    <div className={styles.userMaker}>
      <div className={styles.matchResult}>
        <span>
          <div>승</div>
          <input className={styles.regimatchuser} type="text" name='win' value={searchWinner} onChange={winnerChange} onKeyPress={winnerChange}/>
          <div className={classNames({["users"]: true, ["playerView"]: true})}>
            {winners.map(i => (
              <span className={styles.targetUser}>{i}</span>
            ))}
          </div>
        </span>
        <span className={styles.versus}> VS </span>
        <span>
          <div>패</div>
          <input className={styles.regimatchuser} type="text" name='lose' value={searchLoser} onChange={loserChange} onKeyPress={loserChange}/>
          <div className={styles.users}>
            <div className={styles.flexWrap}>
              {losers.map(i => (
                <span className={styles.targetUser}>{i}</span>
              ))}
            </div>
          </div>
        </span>
      </div>
      <div className={styles.datepickerbox}>
        <span className={styles.needMargin}>시합일</span>
        <DatePicker className={styles.datepicker} selected={startDate} onChange={date => setStartDate(date)} />
      </div>
      <button className={styles.submitbtn} onClick={matchSubmit}>전송</button>
    </div>
  );

  return (
    <div className={styles.ShortBox}>
      {regiMatch}
    </div>
  );
};

export default RegiMatch;