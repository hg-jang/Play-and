import React from "react";
import { useSelector } from "react-redux";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import styles from '../../styles/Chat.module.css'

const Chat = ({ chat, index }) => {
  const uid = useSelector((state) => state.user.currentUser?.uid)

  return (
    <>
    {chat.chatWriterUID === uid
    ? <Card key={index} sx={{ backgroundColor: '#f9ca24' }} className={styles.mine}>
        <CardContent>
          <Typography sx={{ fontSize: '12px', color: '#636e72' }}>내가 보낸 말</Typography>
          <Typography>{chat.content}</Typography>
          <Typography sx={{ fontSize: '12px', color: '#636e72' }}>
            {chat.date.slice(0, 4)}년
            {chat.date.slice(4, 6)}월
            {chat.date.slice(6, 8)}일
            {chat.date.slice(9, 11)}시
            {chat.date.slice(11, 13)}분
            {chat.date.slice(13)}초
          </Typography>
        </CardContent>
      </Card>
    : <Card key={index} className={styles.others}>
        <Avatar sx={{ width: 32, height: 32, marginRight: '4px', marginTop: '16px', marginLeft: '12px' }} alt="writer" src={chat.chatWriterPhotoURL} />
        <CardContent sx={{ paddingLeft: 0 }}>
          <Typography sx={{ fontSize: '12px', color: '#636e72' }}>{chat.chatWriterDisplayName}</Typography>
          <Typography>{chat.content}</Typography>
          <Typography sx={{ fontSize: '12px', color: '#636e72' }}>
            {chat.date.slice(0, 4)}년
            {chat.date.slice(4, 6)}월
            {chat.date.slice(6, 8)}일
            {chat.date.slice(9, 11)}시
            {chat.date.slice(11, 13)}분
            {chat.date.slice(13)}초
          </Typography>
        </CardContent>
      </Card>}
    </>
  )
}

export default Chat