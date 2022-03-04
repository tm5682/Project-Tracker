
import React from 'react'
import './DocumentControl.css'

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

const RecentFileCard = ({folder}) => {
  return (
    <div className='fileCard'>
    <div className="fileCard--top">
        <InsertDriveFileIcon color="primary" style={{ fontSize: 80 }} />
    </div>

    <div className="fileCard--bottom">
        <p>{folder.name}</p>
    </div>
</div>
  )
}

export default RecentFileCard