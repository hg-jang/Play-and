import React, { useCallback } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import ClearIcon from '@mui/icons-material/Clear';

import styles from '../../styles/admin_RecordForm.module.css';

const RecordForm_Selected = ({ arr, setArr, member }) => {

  const onClickCancel = useCallback(() => {
    if(arr.length === 1) {
      setArr([])
    } else {
      setArr(arr.concat().filter(v => v.uid !== member.uid))
    }
  }, [arr, member])

  return (
    <Card className={styles.selected_member}>
      <CardHeader
       avatar={<Avatar src={member.photoURL} alt="member" />}
       title={member.displayName}
       subheader={member.rating}
       action={<ClearIcon onClick={onClickCancel} />}
      />
    </Card>
  )
}

export default RecordForm_Selected