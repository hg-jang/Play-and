import React from 'react'
import Link from 'next/link'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const GroupCard = ({ group, index }) => {

  return (
    <Card sx={{ minWidth: 275 }} key={index}>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          members: {group.numberOfMember}
        </Typography>
        <Typography variant="h5" component="div">
          {group.groupName}
        </Typography>
        <Typography variant="body2">
          {group.groupIntroduce}
        </Typography>
        <Typography sx={{ fontSize: 12, marginBottom: 0 }} color="text.secondary" gutterBottom>
          created: {group.createdDate.slice(0, 4)}년 {group.createdDate.slice(4, 6)}월 {group.createdDate.slice(6)}일
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          joined: {group.joinedDate.slice(0, 4)}년 {group.joinedDate.slice(4, 6)}월 {group.joinedDate.slice(6)}일
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small"><Link href={`/${group.groupName}`}><a>Into Group</a></Link></Button>
        {group.isAdmin && <Button variant="outlined" size="small" color="success"><Link href={`/${group.groupName}/admin`}><a>Into Admin</a></Link></Button>}
      </CardActions>
    </Card>
  )
}

export default GroupCard