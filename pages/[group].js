import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import {
  LOAD_POSTS_REQUEST,
  LOAD_MEMBERS_REQUEST,
  LOAD_GAMES_REQUEST,
  LOAD_CHAT_REQUEST,
} from '../reducers/group';
import { fbFirestore } from '../src/fbase';
import {
  collection,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';

import styles from '../styles/group.module.css';
import GroupLayout from '../src/Layouts/GroupLayout';
import PostForm from '../src/GroupComponents/PostForm';
import Post from '../src/GroupComponents/Post'
import ChatForm from '../src/GroupComponents/ChatForm';
import Chat from '../src/GroupComponents/Chat'

const group_index = () => {
  const router = useRouter()
  const { group } = router.query
  
  const dispatch = useDispatch()
  const uid = useSelector((state) => state.user.currentUser?.uid)
  const { isPostsLoaded, isMembersLoaded, isGamesLoaded } = useSelector((state) => state.group)
  const posts = useSelector((state) => state.group.currentGroup?.posts)
  const chats = useSelector((state) => state.group.currentGroup?.chats)

  useEffect(async () => {
    if(!uid) {
      return Router.replace('/')
    }

    // 포스트 목록 가져오기
    let postsArr = []
    const postSnapshot = await getDocs(collection(fbFirestore, group, "group data", "posts"))
    postSnapshot.forEach((doc) => {
      postsArr = postsArr.concat(doc.data().id)
    })

    // 멤버 목록 가져오기
    let membersArr = []
    const memberSnapshot = await getDocs(collection(fbFirestore, group, "group data", "members"))
    memberSnapshot.forEach((doc) => {
      membersArr = membersArr.concat(doc.data().uid)
    })

    // 게임 기록 가져오기
    let gamesArr = []
    const gameSnapshot = await getDocs(collection(fbFirestore, group, "group data", "games"))
    gameSnapshot.forEach((doc) => {
      gamesArr = gamesArr.concat(doc.data().id)
    })

    dispatch({
      type: LOAD_POSTS_REQUEST,
      data: {
        group,
        postsArr,
      }
    })

    dispatch({
      type: LOAD_MEMBERS_REQUEST,
      data: {
        group,
        membersArr,
      }
    })
    
    dispatch({
      type: LOAD_GAMES_REQUEST,
      data: {
        group,
        gamesArr,
      }
    })
  }, [])

  // 채팅 업데이트 실시간 대기
  const loadChatsRealtime = () => {
    let chatObj = {}
    const col = collection(fbFirestore, group, 'group data', 'chats')
    onSnapshot(col, (querySnapshot) => {
      
      querySnapshot.docChanges().forEach((change) => {
        chatObj = {}
        if(change.type === 'added') {
          chatObj = {
            ...chatObj,
            id: change.doc.data().id,
            date: change.doc.data().date,
            content: change.doc.data().content,
            chatWriterUID: change.doc.data().chatWriterUID,
            chatWriterDisplayName: change.doc.data().chatWriterDisplayName,
            chatWriterPhotoURL: change.doc.data().chatWriterPhotoURL,
          }
        }

        dispatch({
          type: LOAD_CHAT_REQUEST,
          chatObj,
        })
      })
    })
  }
  useEffect(() => {
    if(isPostsLoaded) { loadChatsRealtime() }
  }, [isPostsLoaded])

  return (
    <GroupLayout>
      {isPostsLoaded && isMembersLoaded && isGamesLoaded && 
      <div className={styles.container_cm}>
        <div className={styles.post_container}>
          <PostForm />
          <div className={styles.posts}>
            {posts && posts.map((post, index) => <Post post={post} index={index}/>)}
          </div>
        </div>
        <div className={styles.chat_container}>
          <div className={styles.chats}>
            {chats && chats.map((chat, index) => <Chat chat={chat} index={index} />)}
          </div>
          <ChatForm />
        </div>
      </div>}
    </GroupLayout>
  )
}

export default group_index