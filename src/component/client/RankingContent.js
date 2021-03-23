import React, { useEffect, useRef, useState } from 'react';

const RankingContent = ({allUsers}) => {
    
    const onScrollTarget = useRef();
    const onScrollAction = (e) => {
        const rankingContainer = e.target
        if(
            rankingContainer.scrollTop + rankingContainer.clientHeight
            >= rankingContainer.scrollHeight) {
        }
    }

    const userRankingList = allUsers.map((user,index) => (
          <div className="ranking" key={index}>
            <div className="item--left grade">{index+1}</div>
            <div>{user.attachmentUrl
              ? <img className="userImage" src={user.attachmentUrl}/>
              : <img className="userImage" src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg"/>
              }</div>
            <div className="item--right">
              <span className="rating">{user.rating}</span>
              <div className="">
                <span className="studentName">{user.name}</span>
                <span className="studentId">{user.studentId}</span>
                <span className="department">{user.department}</span>
              </div>
            </div>
          </div>
      ))
    

    return (
        <div className="rankingContainer" ref={onScrollTarget} onScroll={onScrollAction}>
          {userRankingList}
        </div>
    )
};

export default RankingContent;