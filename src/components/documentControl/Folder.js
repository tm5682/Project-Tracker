import React from 'react'

function Folder( { folder }) {
    console.log(folder.name)
  return (
    <div>
       Name of folder: {folder.name}
    </div>
  )
}

export default Folder