import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LOG_IN_SUCCESS } from '../../reducers/user';
import { fbAuth } from '../fbase';
import { onAuthStateChanged } from '@firebase/auth';

import styles from '../../styles/AdminLayout.module.css';
import Nav from "../groupAdminComponents/nav";

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(fbAuth, (user) => {
      if(user) {
        dispatch({
          type: LOG_IN_SUCCESS,
          data: user,
        })
      }
    })
  }, [])

  return (
    <div className={styles.admin_group_grid}>
      <Nav />
      { children }
    </div>
  )
}

export default AdminLayout