import React from 'react';

import styles from '../../styles/admin_Recording.module.css';
import RecordForm from './RecordForm';

const Recording = () => {
  return (
    <div className={styles.admin_recording}>
      <div className={styles.record_form}>
        <RecordForm />
      </div>
    </div>
  )
}

export default Recording